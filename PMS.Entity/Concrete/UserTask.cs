using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserTask : IEntity
    {
        [Key]
        public int TASKID {  get; set; }

        public string TASKNAME {  get; set; }

        public string DESCRIPTION {  get; set; }

        public DateTime DUEDATE { get; set; }   

        public string STATUS {  get; set; } 

        public int USERID {  get; set; }
        public string ISCOMPLETED {  get; set; }

    }
}
