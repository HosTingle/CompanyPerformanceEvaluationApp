using PMS.Core.DataAccess;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.Abstract
{
    public interface IEvaluateDal:IEntityRepository<Evaluate>
    {
        void AddRange(IEnumerable<Evaluate> evaluates);
        Task<List<GetEvaluateDetailsDto>> GetEvaluateDetailsList(int userid);
        Task<List<GetEvaluateDetailsDto>> GetEvaluateDetailsListt(int userid);
    }
}
