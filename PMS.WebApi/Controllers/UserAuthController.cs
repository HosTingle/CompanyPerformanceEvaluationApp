using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        IUserAuthService _userAuthService;
        IUserPositionService _userpositionService;
        public UserAuthController(IUserAuthService userAuthService, IUserPositionService userpositionService) 
        {
            _userAuthService = userAuthService;
            _userpositionService = userpositionService; 
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
           
            var res=await _userAuthService.CreateAccessToken(result.Data,data2.Result.Data);
            if (result.Success)
            {
                return Ok(res);
            }
            return Ok(res);
        }
      

    }
}
