using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Claim : IEntity
    {
        [Key]
        public int CLAIMID { get; set; }

        public string CLAIMNAME { get; set; }

    }
}
