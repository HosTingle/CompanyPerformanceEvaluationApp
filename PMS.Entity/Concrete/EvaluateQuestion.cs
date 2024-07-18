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
        public int EVALQUESTIONID { get; set; }

        public string QUESTION {  get; set; }

        public string QUESTIONDESCRIPTION { get; set; }  
    }
}
