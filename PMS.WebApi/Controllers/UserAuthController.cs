using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.ForgetPass;
using PMS.Core.Utilities.Results;
using PMS.Core.Utilities.Security;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {

        IUserAuthService _userAuthService;
        IUserPositionService _userpositionService;
        IEmailService _emailService;
        public UserAuthController(IUserAuthService userAuthService, IUserPositionService userpositionService,IEmailService emailService) 
        {
            _userAuthService = userAuthService;
            _userpositionService = userpositionService; 
            _emailService = emailService;
        }



        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userAuthService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _userAuthService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("add")]
        public IActionResult Add(UserAuth userAuth)
        {
            var result = _userAuthService.Add(userAuth);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("delete")]
        public IActionResult Delete(UserAuth userAuth)
        {
            var result = _userAuthService.Delete(userAuth);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("update")]
        public IActionResult Update(UserAuth userAuth)
        {
            var result = _userAuthService.Update(userAuth);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("register")] 
        public IActionResult Register(UserRegisterDto userRegisterDto) 
        {
            
            var result = _userAuthService.Register(userRegisterDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
     
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto) 
        {

            var result = await _userAuthService.Login(userLoginDto);
            if (!result.Success)
            {
                return Ok(result);
            } 
            var data2= _userpositionService.GetUserPositionDetails(result.Data.USERID);
            var res=await _userAuthService.CreateAccessToken(data2.Result.Data,1);
            var newAccesToken=res.Data.Token; 
            var newRefreshToken = _userAuthService.GenerateRefreshToken();
            result.Data.REFRESHTOKEN=newRefreshToken;
            result.Data.REFRESHTOKENEXPIRETIME=DateTime.Now.AddDays(5);
            _userAuthService.Update(result.Data);
            var sa = new TokenApiDto()
            {
                AccessToken = newAccesToken,
                RefreshToken = newRefreshToken
            };
        
            if (result.Success)
            {
                return Ok(new SuccessDataResult<TokenApiDto>(sa, "Giris Basarili"));
            }
            return Ok(new ErrorDataResult<TokenApiDto>(sa, "Giris Basarili"));
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Invalid Client Request");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = _userAuthService.GetPrincipleFromExpiredToken(accessToken);
            var username = principal.Identity?.Name;
                var users = _userAuthService.GetAll().Result.Data;
            var user =  users.FirstOrDefault(u => u.USERNAME == username);
            if (user is null || user.REFRESHTOKEN != refreshToken || user.REFRESHTOKENEXPIRETIME <= DateTime.Now)
                return BadRequest("Invalid Request");
            var data2 = _userpositionService.GetUserPositionDetails(user.USERID);
            var newAccessToken = _userAuthService.CreateAccessToken(data2.Result.Data,1).Result.Data.Token; 
            var newRefreshToken = _userAuthService.GenerateRefreshToken();
            user.REFRESHTOKEN = newRefreshToken;

            _userAuthService.Update(user);
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }
        [HttpPost("send-rest-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var result =await _emailService.SendToMail(email);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("rest-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var result = await _emailService.ResetPassword(resetPasswordDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);

        }
    }
    }

