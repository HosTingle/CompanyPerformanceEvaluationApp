using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Concrete
{
    public class UserPerformanceManager : IUserPerformanceService
    {
        IUserPerformanceDal _userPerformanceDal;
        IAddressService _addressService;
        IAddressDal _addressDal; 
        public UserPerformanceManager(IUserPerformanceDal userPerformanceDal,IAddressService addressService,IAddressDal addressDal)
        {
            _userPerformanceDal = userPerformanceDal;
            _addressService = addressService;
            _addressDal=addressDal;

        }

        public IResult Add(UserPerformance userPerformance)
        {
            _userPerformanceDal.Add(userPerformance);
            return new SuccessResult("Eklendi");
        }
        public IResult UpdateUserInfo(UserUpdateDto userUpdateDto)
        {
            var result=GetByEmail(userUpdateDto.Phone).Result.Data;
            var adres=_addressDal.Get(x => x.USERID == result.USERID).Result; 
            var ass = new Address
            {
                ADDRESSDETAIL=adres.ADDRESSDETAIL,
                USERID= adres.USERID,
                ADDRESSID=adres.ADDRESSID,
                CITY= adres.CITY,
                COUNTRY= adres.COUNTRY,
                STATE=adres.STATE,
                
            };
            var resb=_addressService.Update(ass);
            if (resb is SuccessResult)
            {
                var sa = new UserPerformance
                {
                    USERID = result.USERID,
                    BIRTHDATE = result.BIRTHDATE,
                    NAME = result.NAME,
                    PHONE = result.PHONE,
                };

                var res = Update(sa); 
                if (res is SuccessResult)
                {
                    return new SuccessResult("Güncelleme gerçekleşti");
                }
                else
                {
                    return new ErrorResult("Güncelleme gerçekleşmediş-");
                }
            }
            else
            {
                return new ErrorResult("Güncelleme gerçekleşmedi");
            }
        }
        public IResult Delete(UserPerformance userPerformance)
        {
            _userPerformanceDal.Delete(userPerformance); 
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserPerformance>>> GetAll()
        {
            return new SuccessDataResult<List<UserPerformance>>(await _userPerformanceDal.GetAll(),"Veriler Getirildi"); 
        }

        public async Task<IDataResult<UserPerformance>> GetById(int id)
        {
            return new SuccessDataResult<UserPerformance>(await _userPerformanceDal.Get(x=>x.USERID==id)); 
        }
        public async Task<IDataResult<UserPerformance>> GetByEmail(string phone)    
        {
            return new SuccessDataResult<UserPerformance>(await _userPerformanceDal.Get(x => x.PHONE == phone));
        }
        public async Task<IDataResult<UserPerformanceDetailDto>> GetByIdDetail(int id) 
        {
            return new SuccessDataResult<UserPerformanceDetailDto>(await _userPerformanceDal.GetUserPerformanceDetails(id), "Userperformans detaylı bilgileri getirildi.");
        }

        public IResult Update(UserPerformance userPerformance)
        {
            _userPerformanceDal.Update(userPerformance);
            return new SuccessResult("Güncellendi");
        }
    }
}
