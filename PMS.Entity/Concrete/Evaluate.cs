using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Evaluate
    {
        [Key]
        public int EvaluationId{ get; set; }

        public int EvaluatorId { get; set; }

        public int EvaluateeId { get; set; }

        public DateTime EvakuatıonDate { get; set; }

        public int EvalQuestionId {  get; set; }
        public int EvaluateScore {  get; set; } 

        public int TaskId {  get; set; }    

        public string FeedBackComment {  get; set; }    
    }
}
