using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class UserRegisterDto :IDto
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Country {  get; set; }
        public string City { get; set; }    
        public string State {  get; set; }  
        public string AddressDetail {  get; set; }

        public string teamid { get; set; }
        public string Status { get; set; }  
    }
}
