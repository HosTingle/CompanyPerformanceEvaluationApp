using Microsoft.EntityFrameworkCore;
using PMS.Core.DataAccess;
using PMS.Core.DataAccess.EntityFramework;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework.Context;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.EntityFramework
{
    public class EfUserTaskDal:EfEntityRepositoryBase<UserTask,OracleDbContext>,IUserTaskDal
    {
        private IQueryable<UserTask> GetUserTaskQuery(OracleDbContext context, int userId)
        {
            return from e in context.USER_TASK 
                   where e.USERID == userId
                   select new UserTask
                   {

                       DESCRIPTION = e.DESCRIPTION,
                       USERID= e.USERID,
                       DUEDATE = e.DUEDATE,
                       STATUS = e.STATUS,
                       TASKID = e.TASKID,
                       TASKNAME = e.TASKNAME,
                       ISCOMPLETED=e.ISCOMPLETED,

                   };
        }
        public async Task<List<UserTask>> GetUserTaskById(int userid) 
        {
            using (OracleDbContext context = new OracleDbContext())
            {
                var result = await GetUserTaskQuery(context, userid).ToListAsync();
                return result;
                 
            }
        }
    }
}
