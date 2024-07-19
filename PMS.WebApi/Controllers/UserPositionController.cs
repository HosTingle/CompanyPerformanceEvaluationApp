using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Entity.Concrete;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPositionController : ControllerBase
    {
       IUserPositionService _userPositionService;

        public UserPositionController(IUserPositionService userPositionService)
        {
            _userPositionService = userPositionService;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userPositionService.GetAll();
            if (result.Success)
            {
                Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _userPositionService.GetById(id);
            if (result.Success)
            {
                Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("add")]
        public IActionResult Add(UserPosition userPosition)
        {
            var result = _userPositionService.Add(userPosition);
            if (result.Success)
            {
                Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("update")]
        public IActionResult Update(UserPosition userPosition)
        {
            var result = _userPositionService.Update(userPosition);
            if (result.Success)
            {
                Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("delete")]
        public IActionResult Delete(UserPosition userPosition)
        {
            var result = _userPositionService.Delete(userPosition);
            if (result.Success)
            {
                Ok(result);
            }
            return BadRequest(result);
        }
    }
}
