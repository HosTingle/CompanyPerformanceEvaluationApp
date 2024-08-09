using Microsoft.EntityFrameworkCore;
using PMS.Core.Entities.Concrete;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.EntityFramework.Context
{
    public class OracleDbContext:DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.UseOracle("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=213.128.70.105)(PORT=1554)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)));User Id=STJ;Password=STJ1234;");
        }

        public DbSet<Address> ADDRESS { get; set; }
        public DbSet<ClaimUser> CLAIM { get; set; } 
        public DbSet<Evaluate> EVALUATE { get; set; }
        public DbSet<EvaluateQuestion> EVALUATE_QUESTION { get; set; } 
        public DbSet<Position> POSITION { get; set; } 
        public DbSet<PositionClaim> POSITION_CLAIM { get; set; } 
        public DbSet<UserTask> USER_TASK { get; set; } 
        public DbSet<UserAuth> USER_AUTH { get; set; } 
        public DbSet<UserInfo> USERS_INFO { get; set; }  
        public DbSet<UserPosition> USER_POSITION { get; set; } 
    }
}
