using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Position
    {
        [Key]
        public int PositionId { get; set; }

        public string PositionName {  get; set; }

        public string PositionLevel {  get; set; }   
    }
}
