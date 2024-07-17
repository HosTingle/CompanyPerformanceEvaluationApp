using Microsoft.EntityFrameworkCore;
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
        public DbSet<Address> Addressses { get; set; }
        public DbSet<Claim> Claims { get; set; } 
        public DbSet<Evaluate> Evaluates { get; set; } 
        public DbSet<EvaluateQuestion> EvaluateQuestions { get; set; } 
        public DbSet<Position> Positions { get; set; }
        public DbSet<PositionClaim> PositionClaims { get; set; }   
        public DbSet<UserTask> UserTasks { get; set; }  
        public DbSet<UserAuth> UserAuths { get; set; }  
        public DbSet<UserPerformance> UserPerformances { get; set; } 
        public DbSet<UserPosition> UserPositions { get; set; } 
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.UseOracle("Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orclpdb)));User Id=system;Password=tiger;");
        }
    }
}
