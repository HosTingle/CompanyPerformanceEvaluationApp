using PMS.Core.Entities.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Entity.Dtos
{
    public class TokenApiDto:IDto
    {
        public string AccessToken { get; set; }=string.Empty;

        public string RefreshToken { get; set; } = string.Empty;
    }
}
