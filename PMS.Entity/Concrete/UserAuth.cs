using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserAuth
    {
        [Key]
        public int UserAuthId { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }

        public string PasswordHash {  get; set; }

        public string PasswordSalt {  get; set; }

    }
}
