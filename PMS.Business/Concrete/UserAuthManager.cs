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

        public UserAuthManager(IUserAuthDal userAuthDal, IUserPerformanceService userPerformanceService) 
        {
            _userAuthDal = userAuthDal;
            _userPerformanceService = userPerformanceService;
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
        public async Task<IDataResult<TokenResponseViewModel>> CreateAccessToken(UserAuth userAuth)
        {

            var accessToken = JwtTokenGenerator.GenerateToken(userAuth);
            return new SuccessDataResult<TokenResponseViewModel>(accessToken, "Token Üretildi");
        }
        public IDataResult<UserAuth> Register(UserRegisterDto userRegisterDto) 
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
            if (result.Success)
            {
                return new SuccessDataResult<UserAuth>(usera, "User oluşturuldu");
            }
            else
            {
                return new ErrorDataResult<UserAuth>(usera, "User oluşturulamadı"); 
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
                return new ErrorDataResult<UserAuth>("Şifre doğru değil");
            }
            return new SuccessDataResult<UserAuth>(check, "Giris Basarili");
        }
    }
}
