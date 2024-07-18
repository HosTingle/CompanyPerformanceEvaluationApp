using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserAuth : IEntity
    {
        [Key]
        public int USERAUTHID { get; set; }
        public int USERID { get; set; }

        public string USERNAME { get; set; }

        public string PASSWORDHASH {  get; set; }

        public string PASSWORDSALT {  get; set; }

    }
}
