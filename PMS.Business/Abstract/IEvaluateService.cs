using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IEvaluateService
    {
        IResult Add(Evaluate evaluate);
        IResult Delete(Evaluate evaluate);
        IResult Update(Evaluate evaluate);
        IResult AddRange(List<Evaluate> evaluates);
        Task<IDataResult<List<Evaluate>>>GetAll();
        Task<IDataResult<Evaluate>> GetById(int id);
        Task<IDataResult<List<GetEvaluateDetailsDto>>> GetAllEvaluateeDetail(int id);

        Task<IDataResult<List<GetEvaluateDetailsDto>>> GetAllEvaluateeDetaill(int id); 
    }
}
