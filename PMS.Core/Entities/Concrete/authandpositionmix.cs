using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Entities.Concrete
{
    public class Authandpositionmix:IDto
    {
        public int USERPOSITIONID { get; set; }
        public string POSITIONNAME { get; set; }
        public int POSITIONLEVEL { get; set; }
        public int USERID { get; set; }
        public string USERNAME { get; set; }

        public int USERAUTHID {  get; set; }
        public string TEAMNAME {  get; set; }

    }
}
