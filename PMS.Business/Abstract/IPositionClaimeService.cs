using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IPositionClaimeService
    { 
        IResult Add(PositionClaim positionClaim);
        IResult Delete(PositionClaim positionClaim);
        IResult Update(PositionClaim positionClaim);

        Task<IDataResult<List<PositionClaim>>> GetAll();
        Task<IDataResult<PositionClaim>> GetById(int id);

    }
}
