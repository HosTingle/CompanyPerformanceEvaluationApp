using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class PositionClaim
    {
        [Key]
        public int PositionClaimId { get; set; }

        public int PositionId { get; set; } 

        public int ClaimId { get; set; }
    }
}
