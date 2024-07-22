using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IClaimService
    {
        IResult Add(ClaimUser claim);
        IResult Delete(ClaimUser claim);

        IResult Update(ClaimUser claim);

        Task<IDataResult<ClaimUser>> GetById(int id); 

        Task<IDataResult<List<ClaimUser>>> GetAll();
    }
}
