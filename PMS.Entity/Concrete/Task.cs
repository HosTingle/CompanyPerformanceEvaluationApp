using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserTask 
    {
        [Key]
        public int TaskId {  get; set; }

        public string TaskName {  get; set; }

        public string Description {  get; set; }

        public DateTime DueDate { get; set; }   

        public string Status {  get; set; } 

        public int UserId {  get; set; }    

    }
}
