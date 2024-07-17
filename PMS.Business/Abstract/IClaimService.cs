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
        IResult Add(Claim claim);
        IResult Delete(Claim claim);

        IResult Update(Claim claim);

        Task<IDataResult<Claim>> GetById(int id); 

        Task<IDataResult<List<Claim>>> GetAll();
    }
}
