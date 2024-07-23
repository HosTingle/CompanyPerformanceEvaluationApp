﻿using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class UserPositionDetailDto:IDto
    {

        public int USERPOSITIONID { get; set; } 
        public string POSITIONNAME { get; set; }
        public string POSITIONLEVEL { get; set; }
        public int USERID { get; set; }
        public string USERNAME { get; set; }
    }
}
