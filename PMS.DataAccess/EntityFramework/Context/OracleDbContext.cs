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
            dbContextOptionsBuilder.UseOracle("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orclpdb)));User Id=system;Password=tiger;");
        }

        public DbSet<Address> ADDRESS { get; set; }
        public DbSet<ClaimUser> CLAIM { get; set; } 
        public DbSet<Evaluate> EVALUATE { get; set; }
        public DbSet<EvaluateQuestion> EVALUATE_QUESTION { get; set; } 
        public DbSet<Position> POSITION { get; set; } 
        public DbSet<PositionClaim> POSITION_CLAIM { get; set; } 
        public DbSet<UserTask> USERTASK { get; set; }
        public DbSet<UserAuth> USER_AUTH { get; set; } 
        public DbSet<UserPerformance> USER_PERFORMANCE { get; set; } 
        public DbSet<UserPosition> USER_POSITION { get; set; } 
    }
}
