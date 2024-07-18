using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IEvaluateQuestionService
    {
        IResult Add(EvaluateQuestion evaluateQuestion);
        IResult Delete(EvaluateQuestion evaluateQuestion);
        IResult Update(EvaluateQuestion evaluateQuestion);
        Task<IDataResult<List<EvaluateQuestion>>> GetAll();
        Task<IDataResult<EvaluateQuestion>> GetById(int id); 
    }
}
