﻿using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Entities.Concrete
{
    public class UserPerformance : IEntity
    {
        [Key]
        public int USERID { get; set; }

        public string NAME { get; set; }


        public DateOnly BIRTHDATE { get; set; }

        public string PHONE { get; set; }
    }
}
