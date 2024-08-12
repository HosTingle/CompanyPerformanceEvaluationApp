using PMS.Core.DataAccess;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.Abstract
{
    public interface IUserTaskDal:IEntityRepository<UserTask> 
    {
        Task<List<UserTask>> GetUserTaskById(int userid);
    }
}
