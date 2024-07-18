using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class PositionClaim : IEntity
    {
        [Key]
        public int POSITIONCLAIMID { get; set; }

        public int POSITIONID { get; set; } 

        public int CLAIMID { get; set; } 
    }
}
