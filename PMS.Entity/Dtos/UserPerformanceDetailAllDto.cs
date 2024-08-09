﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class UserPerformanceDetailAllDto
    {
        public int USERID { get; set; }
        public string NAME { get; set; }
        public string EMAIL { get; set; }

        public DateTime BIRTHDATE { get; set; }

        public string PHONE { get; set; }
        public string COUNTRY { get; set; }

        public string CITY { get; set; }
        public string ROLE { get; set; } 
    }
}
