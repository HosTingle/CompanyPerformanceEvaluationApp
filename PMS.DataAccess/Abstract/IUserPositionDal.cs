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
    public interface IUserPositionDal: IEntityRepository<UserPosition>
    {
        Task<UserPositionDetailDto> GetUserPositionDetails(int userid);  
    }
}
