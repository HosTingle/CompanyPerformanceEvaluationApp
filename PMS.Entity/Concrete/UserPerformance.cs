using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserPerformance
    {
        [Key]
        public int UserId { get; set; }

        public string Name {  get; set; }   

        public string Email {  get; set; }  

        public DateTime BirthDate { get; set; }

        public int AddressId {  get; set; }

        public string Phone {  get; set; }
    }
}
