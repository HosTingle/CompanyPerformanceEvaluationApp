using Azure.Core;
using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.Core.Utilities.Security;
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
    public class UserAuthManager : IUserAuthService
    {
        IUserAuthDal _userAuthDal; 
        IUserPerformanceService _userPerformanceService; 
        IUserPositionDal _userPositionDal;
        IPositionService _positionService; 

        public UserAuthManager(IUserAuthDal userAuthDal, IUserPerformanceService userPerformanceService,IPositionService positionService, IUserPositionDal userPositionDal) 
        {
            _userAuthDal = userAuthDal;
            _userPerformanceService = userPerformanceService;
            _positionService = positionService;
            _userPositionDal = userPositionDal; 
        }

        public IResult Add(UserAuth userAuth)
        {
            _userAuthDal.Add(userAuth);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(UserAuth userAuth)
        {
            _userAuthDal.Delete(userAuth);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserAuth>>> GetAll()
        {
            return new SuccessDataResult<List<UserAuth>>(await _userAuthDal.GetAll());
        }

        public async Task<IDataResult<UserAuth>> GetById(int id)
        {
            return new SuccessDataResult<UserAuth>(await _userAuthDal.Get(x=>x.USERAUTHID == id));
        }

        public IResult Update(UserAuth userAuth)
        {
            _userAuthDal.Update(userAuth);
            return new SuccessResult("Güncellendi");
        }
        public async Task<IDataResult<TokenResponseViewModel>> CreateAccessToken(UserAuth userAuth,UserPositionDetailDto userPositionDetailDto )
        {
            var sa = new Authandpositionmix
            {
                PASSWORDHASH = userAuth.PASSWORDHASH,
                PASSWORDSALT = userAuth.PASSWORDSALT,
                POSITIONLEVEL=userPositionDetailDto.POSITIONLEVEL,
                USERAUTHID = userAuth.USERAUTHID,
                POSITIONNAME=userPositionDetailDto.POSITIONNAME,
                USERNAME=userAuth.USERNAME,
                USERID=userAuth.USERID,
                USERPOSITIONID = userPositionDetailDto.USERPOSITIONID
            };
           var accessToken = JwtTokenGenerator.GenerateToken(sa);
            return new SuccessDataResult<TokenResponseViewModel>(accessToken, "Token Üretildi");
        }
        public IResult Register(UserRegisterDto userRegisterDto) 
        {
            byte[] passwordHash, passwordSalt;
            var user = new UserPerformance
            {
                NAME= userRegisterDto.Name,
                BIRTHDATE=userRegisterDto.BirthDate,
                EMAIL=userRegisterDto.Email,
                PHONE=userRegisterDto.Phone,
            };

            _userPerformanceService.Add(user);
            var sa= _userPerformanceService.GetByEmail(userRegisterDto.Email);
            HashingHelper.CreatePasswordHash(userRegisterDto.Password, out passwordHash, out passwordSalt);
            var usera = new UserAuth
            {
                USERID= sa.Result.Data.USERID,
                PASSWORDHASH=passwordHash,
                PASSWORDSALT=passwordSalt,
                USERNAME=userRegisterDto.UserName,
              
            };
            var result=Add(usera);
            var position = new UserPosition
            {
                POSITIONID=_positionService.GetByName("user").Result.Data.POSITIONID,
                USERID= sa.Result.Data.USERID,
            };
            _userPositionDal.Add(position); 
            if (result.Success)
            {
                return new SuccessResult("User oluşturuldu");
            }
            else
            {
                return new ErrorResult("User oluşturulamadı"); 
            }
        }
        public async Task<IDataResult<UserAuth>> Login(UserLoginDto userForLoginDto)
        {
            var check=await _userAuthDal.Get(x => x.USERNAME == userForLoginDto.Username);

            if (check == null)
            {
                return new ErrorDataResult<UserAuth>("Username bulunamadı"); 
            }
            if (!HashingHelper.VerifyPasswordHash(userForLoginDto.Password, check.PASSWORDHASH,check.PASSWORDSALT))
            {
                return new ErrorDataResult<UserAuth>("Sifre doğru değil");
            }
            return new SuccessDataResult<UserAuth>(check, "Giris Basarili");
        }
    }
}
