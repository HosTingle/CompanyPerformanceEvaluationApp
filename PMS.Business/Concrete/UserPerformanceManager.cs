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
        IPositionService _positionService;
        IUserPositionService _userPositionService;
        IUserAuthService _userAuthService; 
        public UserPerformanceManager(IUserPerformanceDal userPerformanceDal,IAddressService addressService,IAddressDal addressDal,IPositionService positionService,IUserPositionService userPositionService,IUserAuthService userAuthService)
        {
            _userPerformanceDal = userPerformanceDal;
            _addressService = addressService;
            _addressDal=addressDal;
            _positionService = positionService;
            _userPositionService= userPositionService;
            _userAuthService= userAuthService;

        }

        public IResult Add(UserInfo userPerformance)
        {
            _userPerformanceDal.Add(userPerformance);
            return new SuccessResult("Eklendi");
        }
        public IResult DeleteAllUserPerformance(UserUpdateDto userUpdateDto)
        {

            var adres = _addressDal.Get(x => x.USERID == userUpdateDto.userid).Result;
            var addressresult =_addressService.Delete(adres);
            if (addressresult.Success)
            {
                var resauth=_userAuthService.GetByUserId(userUpdateDto.userid).Result.Data;
                var resultauths=_userAuthService.Delete(resauth);
                if (resultauths.Success)
                {
                    var posuser = _userPositionService.GetByUserId(userUpdateDto.userid).Result.Data;
                    var posuserd=_userPositionService.Delete(posuser);
                    if (posuserd.Success)
                    {
                        return new SuccessResult("Silindi"); 
                    }
                    else
                    {
                        return new ErrorResult("Güncelleme gerçekleşmedi Userposition eklenemedi");
                    }
                    
                }
                else
                {
                    return new ErrorResult("Güncelleme gerçekleşmedi Userposition eklenemedi");
                }
            }
            else
            {
                return new ErrorResult("Güncelleme gerçekleşmedi Userposition eklenemedi");
            }
        
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
                var sa = new UserInfo
                {
        
                    BIRTHDATE =  userUpdateDto.Birthdate,
                    NAME = userUpdateDto.Name,
                    PHONE = userUpdateDto.Phone,
                    USERID=userUpdateDto.userid,
                    IMAGEURL = userUpdateDto.Imageurl,
                    TEAMNAME=userUpdateDto.Teamname,
                    STATUS=userUpdateDto.Status,
                };

                var res = Update(sa);
                if (res is SuccessResult)
                {

                    var reso = _positionService.GetByName(userUpdateDto.Role).Result.Data;
                    var resos = _userPositionService.GetByUserId(userUpdateDto.userid).Result.Data; 
                    var sas = new UserPosition
                    {
                      USERID= userUpdateDto.userid,
                      POSITIONID= reso.POSITIONID,
                      USERPOSITIONID= resos.USERPOSITIONID
                    };
                    var las=_userPositionService.Update(sas);
                    if (res.Success)
                    {
                        return new SuccessResult("Güncelleme gerçekleşti");
                    }
                    else
                    {
                        return new ErrorResult("Güncelleme gerçekleşmedi Userposition eklenemedi");
                    }
                  
                }
                else
                {
                    return new ErrorResult("Güncelleme gerçekleşmediş User Bilgiler eklenemedi");
                }
            }
            else
            {
                return new ErrorResult("Güncelleme gerçekleşmedi Adress eklenemedi");
            }
        }
        public IResult Delete(UserInfo userPerformance)
        {
            _userPerformanceDal.Delete(userPerformance); 
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserInfo>>> GetAll()
        {
            return new SuccessDataResult<List<UserInfo>>(await _userPerformanceDal.GetAll(),"Veriler Getirildi"); 
        }
        public async Task<IDataResult<List<UserPerformanceDetailAllDto>>> GetAllPerformanceDetail(int userid) 
        {
            return new SuccessDataResult<List<UserPerformanceDetailAllDto>>( await _userPerformanceDal.GetUserPerformanceDetailsList(userid), "Veriler Getirildi");
        }
        public async Task<IDataResult<UserInfo>> GetById(int id)
        {
            return new SuccessDataResult<UserInfo>(await _userPerformanceDal.Get(x=>x.USERID==id)); 
        }
  
        public async Task<IDataResult<UserInfo>> GetByEmail(string phone)    
        {
            return new SuccessDataResult<UserInfo>(await _userPerformanceDal.Get(x => x.PHONE == phone));
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
                IMAGEURL = result.IMAGEURL,
                TEAMNAME=result.TEAMNAME,
                STATUS=result.STATUS,
                
                
            };

            return new SuccessDataResult<GetByIdUserPerformanceDetailDto>(sa, "Userperformans detaylı bilgileri getirildi.");
        }

        public IResult Update(UserInfo userPerformance)
        {
            _userPerformanceDal.Update(userPerformance);
            return new SuccessResult("Güncellendi");
        }
        public async Task<IDataResult<List<string>>> GetAllAddress()
        {
            var result = await _userPerformanceDal.GetCityList();
            return new SuccessDataResult<List<string>>(result, "Veriler getirildi");
        }
    }
}
