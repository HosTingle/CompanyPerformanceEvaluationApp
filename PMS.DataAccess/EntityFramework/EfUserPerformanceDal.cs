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
    public class EfUserPerformanceDal : EfEntityRepositoryBase<UserInfo, OracleDbContext>, IUserPerformanceDal
    {
         private IQueryable<UserPerformanceDetailDto> GetUserPerformanceQuery(OracleDbContext context,int userId)  
        {
            return from e in context.USERS_INFO
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
                      IMAGEURL=e.IMAGEURL,
                      TEAMNAME=e.TEAMNAME,
                      STATUS=e.STATUS,

                      
                   };
        }
        private IQueryable<UserPerformanceDetailAllDto> GetUserPerformanceQueryList(OracleDbContext context, int userId) 
        {
            return from e in context.USERS_INFO
                   join ad in context.ADDRESS on e.USERID equals ad.USERID
                   join au in context.USER_AUTH on ad.USERID equals au.USERID
                   join up in context.USER_POSITION on au.USERID equals up.USERID
                   join p in context.POSITION on up.POSITIONID equals p.POSITIONID
                   where e.USERID != userId // Kendi kullanıcınızı filtreleyin
                   select new UserPerformanceDetailAllDto
                   {
                       USERID = e.USERID,
                       NAME = e.NAME,
                       EMAIL = au.EMAIL,
                       BIRTHDATE = e.BIRTHDATE,
                       PHONE = e.PHONE,
                       CITY = ad.CITY,
                       COUNTRY = ad.COUNTRY,
                       ROLE = p.POSITIONNAME,
                       IMAGEURL = e.IMAGEURL,
                       TEAMNAME = e.TEAMNAME,
                       ROLELEVEL=p.POSITIONLEVEL,
                       STATUS= e.STATUS,
                       
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
        public async Task<List<UserPerformanceDetailAllDto>> GetUserPerformanceDetailsList(int userid) 
        {
            using (OracleDbContext context = new OracleDbContext())
            {
                var result = GetUserPerformanceQueryList(context,userid);
                return await result.ToListAsync();
            }
        }
        private async Task<List<string>> GetCityListQuery(OracleDbContext context)
        {
            return await context.USERS_INFO
            .Select(a => a.TEAMNAME)
            .Distinct()
            .ToListAsync();
        }
        public async Task<List<string>> GetCityList()
        {
            using (OracleDbContext context = new OracleDbContext())
            {
                var result = await GetCityListQuery(context);
                return result;
            }
        }


    }
}
