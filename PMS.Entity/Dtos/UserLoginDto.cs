using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class UserLoginDto:IDto
    {
        public string Username { get; set; } 
        public string Password { get; set; }
    }
}
