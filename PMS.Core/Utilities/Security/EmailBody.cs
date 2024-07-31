using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Utilities.Security
{
    public static class EmailBody
    {

        public static string EmailStringBodu(string email, string emailToken)
        {
            return $@"Reset Password";
        }
    }
}
