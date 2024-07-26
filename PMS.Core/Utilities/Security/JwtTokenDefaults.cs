using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Utilities.Security
{
    public class JwtTokenDefaults
    {
        public const string ValidAudience = "https://localhost";
        public const string ValidIssuer = "https://localhost";
        public const string key = "Realestate..00100210Aps.netCore9.0.9.01+-*/";
        public const int Expire = 1;
    }
}
