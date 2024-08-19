using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Business.Concrete;
using PMS.Entity.Concrete;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluateController : ControllerBase
    {
        IEvaluateService _evaluateService;

        public EvaluateController(IEvaluateService evaluateService)
        {
            _evaluateService = evaluateService;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result=await _evaluateService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id) 
        {
            var result = await _evaluateService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("add")] 
        public IActionResult Add(Evaluate evaluate) 
        {
            var result =  _evaluateService.Add(evaluate);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("delete")]
        public IActionResult Delete(Evaluate evaluate) 
        {
            var result = _evaluateService.Delete(evaluate);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("update")]
        public IActionResult Update(Evaluate evaluate) 
        {
            var result = _evaluateService.Update(evaluate); 
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("addRange")]
        public IActionResult AddRange(List<Evaluate> evaluates)
        {
            var result = _evaluateService.AddRange(evaluates);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("EvaluateDetail")]
        public async Task<IActionResult> EvaluateDetailById(int userid) 
        {
            var result =await  _evaluateService.GetAllEvaluateeDetail(userid);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("EvaluatorDetail")]
        public async Task<IActionResult> EvaluateDetailByIdd(int userid) 
        {
            var result = await _evaluateService.GetAllEvaluateeDetaill(userid);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
