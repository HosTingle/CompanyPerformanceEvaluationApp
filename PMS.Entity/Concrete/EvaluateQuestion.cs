using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class EvaluateQuestion : IEntity
    {
        [Key]
        public int EVALUATEQUESTIONID { get; set; } 

        public string EVALUATEQUESTION {  get; set; } 

        public string EVALUATEQUESTIONDESCRIPTION { get; set; }   
    }
}
