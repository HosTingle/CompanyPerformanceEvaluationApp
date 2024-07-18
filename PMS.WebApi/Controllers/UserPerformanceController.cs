using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Entity.Concrete;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPerformanceController : ControllerBase
    {
        IUserPerformanceService _userPerformanceService;

        public UserPerformanceController(IUserPerformanceService userPerformanceService)
        {
            _userPerformanceService = userPerformanceService;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result=await _userPerformanceService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("add")]
        public async Task<IActionResult> Add(UserPerformance userPerformance) 
        {
            
            var result = _userPerformanceService.Add(userPerformance);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update(UserPerformance userPerformance) 
        {

            var result = _userPerformanceService.Update(userPerformance);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(UserPerformance userPerformance)
        {

            var result = _userPerformanceService.Delete(userPerformance); 
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result=await _userPerformanceService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
