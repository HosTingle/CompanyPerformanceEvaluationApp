using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.Business.Abstract;
using PMS.Entity.Concrete;

namespace PMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluateQuestionController : ControllerBase
    {
        IEvaluateQuestionService _evaluateQuestionService;

        public EvaluateQuestionController(IEvaluateQuestionService evaluateQuestionService)
        {
            _evaluateQuestionService = evaluateQuestionService;
        }
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result=await _evaluateQuestionService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result=await _evaluateQuestionService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("add")]
        public  IActionResult Add(EvaluateQuestion evaluateQuestion)
        {
            var result=_evaluateQuestionService.Add(evaluateQuestion);
            if (result.Success) {
            return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("delete")]
        public IActionResult Delete(EvaluateQuestion evaluateQuestion) 
        {
            var result = _evaluateQuestionService.Delete(evaluateQuestion);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("update")]
        public IActionResult Update(EvaluateQuestion evaluateQuestion)
        {
            var result = _evaluateQuestionService.Update(evaluateQuestion);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
