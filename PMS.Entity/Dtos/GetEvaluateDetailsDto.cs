using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class GetEvaluateDetailsDto
    {
        [Key]
        public int EVALUATEID { get; set; }

        public string EVALUATORNAME { get; set; }
        public string EVALUATORIMAGEURL { get; set; } 
        public string EVALUATEENAME { get; set; }
        public string EVALUATEEIMAGEURL { get; set; }
        public string EVALUATEQUESTION { get; set; } 
        public string TASKNAME { get; set; }
        public string DESCRIPTION { get; set; } 
        public string FEEDBACKCOMMENT { get; set; }
        public DateTime EVALUATIONDATE { get; set; }
        public int EVALUATESCORE { get; set; }
        public string PERIOD {get;set;}
    }
}
