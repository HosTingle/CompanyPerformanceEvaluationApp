using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.Core.Utilities.Security;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Concrete
{
    public class UserAuthManager : IUserAuthService
    {
        IUserAuthDal _userAuthDal; 
        IUserPerformanceDal _userPerformanceDal;  
        IUserPositionDal _userPositionDal;
        IPositionService _positionService; 
        IAddressService _addressService; 
        public UserAuthManager(IUserAuthDal userAuthDal, IUserPerformanceDal userPerformanceDal,IPositionService positionService, IUserPositionDal userPositionDal, IAddressService addressService)  
        {
            _userAuthDal = userAuthDal;
            _userPerformanceDal = userPerformanceDal;
            _positionService = positionService;
            _userPositionDal = userPositionDal; 
            _addressService = addressService;
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
        public async Task<IDataResult<UserAuth>> GetByUserId(int id)
        {
            return new SuccessDataResult<UserAuth>(await _userAuthDal.Get(x => x.USERID == id)); 
        }

        public IResult Update(UserAuth userAuth)
        {
            _userAuthDal.Update(userAuth);
            return new SuccessResult("Güncellendi");
        }

        public async Task<IDataResult<TokenResponseViewModel>> CreateAccessToken(UserPositionDetailDto userPositionDetailDto,int a)
        {
            var sa = new Authandpositionmix
            {
                POSITIONLEVEL=userPositionDetailDto.POSITIONLEVEL,
                POSITIONNAME=userPositionDetailDto.POSITIONNAME,
                USERNAME= userPositionDetailDto.USERNAME,
                USERID= userPositionDetailDto.USERID,
                USERPOSITIONID = userPositionDetailDto.USERPOSITIONID,
                USERAUTHID= userPositionDetailDto.USERAUTHID,
                TEAMNAME=userPositionDetailDto.TEAMNAME,
                
            };
           var accessToken = JwtTokenGenerator.GenerateToken(sa,a);
            return new SuccessDataResult<TokenResponseViewModel>(accessToken, "Token Üretildi");
        }
        public IResult Register(UserRegisterDto userRegisterDto) 
        {
            byte[] passwordHash, passwordSalt;
            // Belirli bir aralık tanımla
            int minValue = 80;
            int maxValue = 100000;
            Random random = new Random();
            int randomNumberr = random.Next(minValue, maxValue);
            var user = new UserInfo
            {
                NAME = userRegisterDto.Name,
                BIRTHDATE = userRegisterDto.BirthDate,
                PHONE = userRegisterDto.Phone,
                IMAGEURL = "https://st4.depositphotos.com/15648834/23779/v/950/depositphotos_237795810-stock-illustration-unknown-person-silhouette-profile-picture.jpg",
                TEAMNAME=userRegisterDto.teamid,
                STATUS="T",
                USERID= randomNumberr
            };

            _userPerformanceDal.Add(user);
            var sa= _userPerformanceDal.Get(x=>x.PHONE== userRegisterDto.Phone).Result;
            HashingHelper.CreatePasswordHash(userRegisterDto.Password, out passwordHash, out passwordSalt);
         

         

            // Rastgele bir sayı üret (minValue dahil, maxValue hariç)
            int randomNumber = random.Next(minValue, maxValue);
            var usera = new UserAuth
            {
                USERID= sa.USERID,
                PASSWORDHASH=passwordHash,
                PASSWORDSALT=passwordSalt,
                EMAIL=userRegisterDto.Email,    
                USERNAME=userRegisterDto.Username,
                USERAUTHID= randomNumber

            };
            var result=Add(usera);
            var position = new UserPosition
            {
                POSITIONID=_positionService.GetByName("Kullanıcı").Result.Data.POSITIONID,
                USERID= sa.USERID,
            };
            _userPositionDal.Add(position); 
            if (result.Success)
            {
                var adres = new Address
                {
                    ADDRESSDETAIL=userRegisterDto.AddressDetail,
                    CITY=userRegisterDto.City, 
                    COUNTRY=userRegisterDto.Country,
                    STATE=userRegisterDto.State,
                    USERID = sa.USERID,
                };
                var res=_addressService.Add(adres);
                if (res.Success)
                {
                    return new SuccessResult("User oluşturuldu");
                }
                else
                {
                    return new ErrorResult("User oluşturulamadı,Adress eklenemdi");
                }
                
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
        public string GenerateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = GetAll().Result.Data.
            Any(x => x.REFRESHTOKEN == refreshToken);
            if (tokenInUser)
            {
                return GenerateRefreshToken();
            }
            return refreshToken;
        }

         public ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtTokenDefaults.key));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is Invalid Token");
            return principal;

        }

    }
}
