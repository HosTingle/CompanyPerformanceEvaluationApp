﻿using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Concrete
{
    public class UserPerformance : IEntity
    {
        [Key]
        public int USERID { get; set; }

        public string NAME {  get; set; }   

        public string EMAIL {  get; set; }  

        public DateTime BIRTHDATE { get; set; }

        public string PHONE {  get; set; } 
    }
}
