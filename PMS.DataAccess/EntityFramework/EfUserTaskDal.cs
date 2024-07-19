using PMS.Core.DataAccess;
using PMS.Core.DataAccess.EntityFramework;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework.Context;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.EntityFramework
{
    public class EfUserTaskDal:EfEntityRepositoryBase<UserTask,OracleDbContext>,IUserTaskDal
    {
    }
}
