using Microsoft.EntityFrameworkCore;
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
    public class EfUserPositionDal:EfEntityRepositoryBase<UserPosition,OracleDbContext>,IUserPositionDal
    {
        private IQueryable<UserPositionDetailDto> GetUserPositionQuery(OracleDbContext context,int userId) 
        {
            return from e in context.USER_POSITION
                   join u in context.USERS_INFO on e.USERID equals u.USERID
                   join au in context.USER_AUTH on u.USERID equals au.USERID 
                   join a in context.POSITION on e.POSITIONID equals a.POSITIONID
                   where e.USERID ==userId
                   select new UserPositionDetailDto
                   {
                      
                       USERPOSITIONID = e.USERPOSITIONID,
                       USERID = u.USERID,
                       POSITIONLEVEL= a.POSITIONLEVEL,
                       POSITIONNAME= a.POSITIONNAME,
                       USERNAME = au.USERNAME,
                       USERAUTHID=au.USERAUTHID,
                       TEAMNAME=u.TEAMNAME,
                       
                      
                   };
        }
        public async Task<UserPositionDetailDto> GetUserPositionDetails(int userid)
        {
            using (OracleDbContext context = new OracleDbContext())
            {
                var result = await GetUserPositionQuery(context,userid).FirstOrDefaultAsync();
                return  result;
            }
        }
    }
}
