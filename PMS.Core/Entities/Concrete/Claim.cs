using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Entities.Concrete
{
    public class ClaimUser : IEntity  
    {
        [Key]
        public int CLAIMID { get; set; }

        public string CLAIMNAME { get; set; }

    }
}
