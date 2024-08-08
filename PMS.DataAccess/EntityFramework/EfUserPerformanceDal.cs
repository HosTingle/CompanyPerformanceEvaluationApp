using Microsoft.EntityFrameworkCore;
using PMS.Core.DataAccess.EntityFramework;
using PMS.Core.Entities.Concrete;
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
    public class EfUserPerformanceDal : EfEntityRepositoryBase<UserPerformance, OracleDbContext>, IUserPerformanceDal
    {
         private IQueryable<UserPerformanceDetailDto> GetUserPerformanceQuery(OracleDbContext context,int userId)  
        {
            return from e in context.USER_PERFORMANCE
                   join ad in context.ADDRESS on e.USERID equals ad.USERID 
                   join au in context.USER_AUTH on ad.USERID equals au.USERID
                   where e.USERID ==userId

                   select new UserPerformanceDetailDto
                   {
                    USERID=e.USERID,
                      NAME=e.NAME,
                      EMAIL=au.EMAIL,
                      BIRTHDATE=e.BIRTHDATE,
                      PHONE=e.PHONE,
                      CITY=ad.CITY,
                      COUNTRY=ad.COUNTRY,
                      
                      
                   };
        }
        private IQueryable<UserPerformanceDetailAllDto> GetUserPerformanceQueryList(OracleDbContext context) 
        {
            return from e in context.USER_PERFORMANCE
                   join ad in context.ADDRESS on e.USERID equals ad.USERID
                   join au in context.USER_AUTH on ad.USERID equals au.USERID
                   join up in context.USER_POSITION on au.USERID equals up.USERID
                   join p in context.POSITION on up.POSITIONID equals p.POSITIONID
                   select new UserPerformanceDetailAllDto
                   {
                       USERID = e.USERID,
                       NAME = e.NAME,
                       EMAIL = au.EMAIL,
                       BIRTHDATE = e.BIRTHDATE,
                       PHONE = e.PHONE,
                       CITY = ad.CITY,
                       COUNTRY = ad.COUNTRY,
                       ROLE=p.POSITIONNAME,


                   };
        }
        public async Task<UserPerformanceDetailDto> GetUserPerformanceDetails(int userid) 
        {
            using (OracleDbContext context = new OracleDbContext())
            {
                var result = await GetUserPerformanceQuery(context,userid).FirstOrDefaultAsync();
                return  result;
            }
        }
        public async Task<List<UserPerformanceDetailAllDto>> GetUserPerformanceDetailsList() 
        {
            using (OracleDbContext context = new OracleDbContext())
            {
                var result = GetUserPerformanceQueryList(context);
                return await result.ToListAsync();
            }
        }



    }
}
