using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Entities.Concrete
{
    public class UserAuth : IEntity
    {
        [Key]
        public int USERAUTHID { get; set; }
        public int USERID { get; set; }

        public string USERNAME { get; set; }

        public byte[] PASSWORDHASH { get; set; }

        public byte[] PASSWORDSALT { get; set; }
        public string? REFRESHTOKEN { get; set; }    

        public DateTime? REFRESHTOKENEXPIRETIME { get; set; }

        public string? EMAIL { get; set; }

        public string? RESETPASSTOKEN { get; set; }

        public DateTime? RESETPASSEXPIRE {  get; set; }  

    }
}
