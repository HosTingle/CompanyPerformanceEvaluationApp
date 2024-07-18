using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
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

        Task<IDataResult<List<Evaluate>>>GetAll();
        Task<IDataResult<Evaluate>> GetById(int id); 

    }
}
