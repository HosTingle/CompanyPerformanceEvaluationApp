using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class CreateAddressDto
    {

        public int USERID { get; set; }

        public string ADDRESSDETAIL { get; set; }

        public string CITY { get; set; }

        public string COUNTRY { get; set; }

        public string STATE { get; set; }
    }
}
