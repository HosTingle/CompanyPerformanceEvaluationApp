using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Claim
    {
        [Key]
        public int ClaimId { get; set; }

        public string ClaimName { get; set; }

    }
}
