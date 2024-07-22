using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Entities.Concrete
{
    public class Address : IEntity
    {
        [Key]
        public int ADDRESSID { get; set; }

        public int USERID { get; set; }

        public string ADDRESSDETAIL { get; set; }

        public string CITY { get; set; }

        public string COUNTRY { get; set; }

        public string STATE { get; set; }


    }
}
