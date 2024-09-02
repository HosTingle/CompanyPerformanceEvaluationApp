using PMS.Business.Abstract;
using PMS.Core.Utilities.Results;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Concrete
{
    public class EvaluateManager : IEvaluateService
    {
        IEvaluateDal _evaluateDal;

        public EvaluateManager(IEvaluateDal evaluateDal)
        {
            _evaluateDal = evaluateDal;
        }

        public IResult Add(Evaluate evaluate)
        {
            _evaluateDal.Add(evaluate);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(Evaluate evaluate)
        {
            _evaluateDal.Delete(evaluate);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<Evaluate>>> GetAll()
        {
            return new SuccessDataResult<List<Evaluate>>(await _evaluateDal.GetAll(), "Verileri Getirildi");
        }

        public async Task<IDataResult<Evaluate>> GetById(int id)
        {
            return new SuccessDataResult<Evaluate>(await _evaluateDal.Get(x=>x.EVALUATEID==id),"Veri Getirildi");
        }
        public async Task<IDataResult<List<GetEvaluateDetailsDto>>> GetAllEvaluateeDetail(int id)  
        {
            return new SuccessDataResult<List<GetEvaluateDetailsDto>>(await _evaluateDal.GetEvaluateDetailsList(id), "Veri Getirildi"); 
        }
        public async Task<IDataResult<List<GetEvaluateDetailsDto>>> GetAllEvaluateeDetaill(int id)
        {
            return new SuccessDataResult<List<GetEvaluateDetailsDto>>(await _evaluateDal.GetEvaluateDetailsListt(id), "Veri Getirildi");
        }
        public IResult Update(Evaluate evaluate)
        {
            _evaluateDal.Update(evaluate);
            return new SuccessResult("Güncellendi");
        }
        public IResult AddRange(List<Evaluate> evaluates)
        {
            _evaluateDal.AddRange(evaluates);
            return new SuccessResult("Veriler topluca eklendi");
        }
    }
}
