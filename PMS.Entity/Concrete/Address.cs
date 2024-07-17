using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }

        public int UserId { get; set; }

        public string AddressDetail{ get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string State {  get; set; }  


    }
}
