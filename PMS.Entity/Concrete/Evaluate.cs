using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Evaluate : IEntity
    {
        [Key]
        public int EVALUATEID { get; set; }  

        public int EVALUATORID { get; set; }

        public int EVALUATEEID { get; set; }

        public int EVALQUESTIONID { get; set; }
        public int TASKID { get; set; }
        public string FEEDBACKCOMMENT { get; set; }
        public DateTime EVALUATIONDATE { get; set; }

   
        public int EVALUATESCORE {  get; set; } 
        public string PERIOD {  get; set; }
       


    }
}
