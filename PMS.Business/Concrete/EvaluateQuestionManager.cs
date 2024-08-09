using PMS.Business.Abstract;
using PMS.Core.Utilities.Results;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Concrete
{
    public class EvaluateQuestionManager : IEvaluateQuestionService
    {
        IEvaluateQuestionDal _evaluateQuestionDal;

        public EvaluateQuestionManager(IEvaluateQuestionDal evaluateQuestionDal)
        {
            _evaluateQuestionDal = evaluateQuestionDal; 
        }

        public IResult Add(EvaluateQuestion evaluateQuestion)
        {
            _evaluateQuestionDal.Add(evaluateQuestion);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(EvaluateQuestion evaluateQuestion)
        {
            _evaluateQuestionDal.Delete(evaluateQuestion);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<EvaluateQuestion>>> GetAll()
        {
            return new SuccessDataResult<List<EvaluateQuestion>>(await _evaluateQuestionDal.GetAll(),"Veriler Getirildi");
        }

        public async Task<IDataResult<EvaluateQuestion>> GetById(int id)
        {
            return new SuccessDataResult<EvaluateQuestion>(await _evaluateQuestionDal.Get(x => x.EVALUATEQUESTIONID == id),"Veri Getirildi");
        }

        public IResult Update(EvaluateQuestion evaluateQuestion)
        {
            _evaluateQuestionDal.Update(evaluateQuestion);
            return new SuccessResult("Güncellendi");
        }
    }
}
