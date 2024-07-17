using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserPosition
    {
        [Key]
        public int UserPositionId { get; set; }

        public int UserId { get; set; }

        public int PositionId { get; set; }


    }
}
