using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class UserUpdateDto:IDto
    {
        public int userid {  get; set; }
        public string Name {  get; set; }

        public string Email { get; set; }
        public DateTime Birthdate { get; set; }
        public string Phone { get; set; }
        public string Country {  get; set; }
        public string City { get; set; }

        public string Role { get; set; }

        public string Imageurl { get; set; }

        public string Teamname { get; set; }
        public string Status { get; set; } 
    }
}
