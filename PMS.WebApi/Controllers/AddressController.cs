﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Entity.Concrete;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _addressService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("add")]
        public async Task<IActionResult> Add(Address address) 
        {
            var result = _addressService.Add(address); 
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(Address address) 
        {
            var result = _addressService.Delete(address);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update(Address address)
        {
            var result = _addressService.Update(address);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id) 
        {
            var result = await _addressService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }

}
