using Microsoft.EntityFrameworkCore;
using PMS.Core.DataAccess.EntityFramework;
using PMS.Core.Entities.Concrete;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework.Context;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.EntityFramework
{
    public class EfAddressDal : EfEntityRepositoryBase<Address, OracleDbContext>, IAddressDal
    {
        private async Task<List<string>> GetCityListQuery(OracleDbContext context)
        {
            return await context.ADDRESS
    .Select(a => a.CITY)
    .Distinct()
    .ToListAsync(); // Asenkron olarak listeye çeviriyoruz
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
