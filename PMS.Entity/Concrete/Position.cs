using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Position : IEntity
    {
        [Key]
        public int POSITIONID { get; set; }

        public string POSITIONNAME {  get; set; }

        public int POSITIONLEVEL {  get; set; }    
    }
}
