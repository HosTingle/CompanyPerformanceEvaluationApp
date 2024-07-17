using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class EvaluateQuestion
    {
        [Key]
        public int EvalQuestionId { get; set; }

        public string Question {  get; set; }

        public string QuestionDescription { get; set; } 
    }
}
