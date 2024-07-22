﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
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
        [HttpPost("delete")]
        public IActionResult Delete(UserPerformance userPerformance)
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
        [HttpGet("getbyemail")]
        public async Task<IActionResult> GetByEmail(string email)  
        {
            var result = await _userPerformanceService.GetByEmail(email); 
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
