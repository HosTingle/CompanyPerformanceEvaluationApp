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

            var adres=_addressDal.Get(x => x.USERID == userUpdateDto.userid).Result; 
            var ass = new Address
            {
                ADDRESSDETAIL=adres.ADDRESSDETAIL,
                USERID= userUpdateDto.userid,
                ADDRESSID=adres.ADDRESSID,
                CITY= userUpdateDto.City,
                COUNTRY= userUpdateDto.Country,
                STATE=adres.STATE,
                
            };
            var resb=_addressService.Update(ass);
            if (resb is SuccessResult)
            {
                var sa = new UserPerformance
                {
        
                    BIRTHDATE =  userUpdateDto.Birthdate,
                    NAME = userUpdateDto.Name,
                    PHONE = userUpdateDto.Phone,
                    USERID=userUpdateDto.userid,
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
        public async Task<IDataResult<List<UserPerformanceDetailAllDto>>> GetAllPerformanceDetail() 
        {
            return new SuccessDataResult<List<UserPerformanceDetailAllDto>>( await _userPerformanceDal.GetUserPerformanceDetailsList(), "Veriler Getirildi");
        }
        public async Task<IDataResult<UserPerformance>> GetById(int id)
        {
            return new SuccessDataResult<UserPerformance>(await _userPerformanceDal.Get(x=>x.USERID==id)); 
        }
  
        public async Task<IDataResult<UserPerformance>> GetByEmail(string phone)    
        {
            return new SuccessDataResult<UserPerformance>(await _userPerformanceDal.Get(x => x.PHONE == phone));
        }
        public async Task<IDataResult<GetByIdUserPerformanceDetailDto>> GetByIdDetail(int id) 
        {
            var result = await _userPerformanceDal.GetUserPerformanceDetails(id);
            var sa = new GetByIdUserPerformanceDetailDto
            {
                BIRTHDATE=DateOnly.FromDateTime(result.BIRTHDATE),
                CITY=result.CITY,
                COUNTRY=result.COUNTRY,
                EMAIL=result.EMAIL,
                NAME=result.NAME,
                PHONE=result.PHONE,
                USERID=result.USERID,
            };

            return new SuccessDataResult<GetByIdUserPerformanceDetailDto>(sa, "Userperformans detaylı bilgileri getirildi.");
        }

        public IResult Update(UserPerformance userPerformance)
        {
            _userPerformanceDal.Update(userPerformance);
            return new SuccessResult("Güncellendi");
        }
       
    }
}
