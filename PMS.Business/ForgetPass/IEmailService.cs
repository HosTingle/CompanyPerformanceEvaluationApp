using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Utilities.ForgetPass
{
    public interface IEmailService
    {
        Task SendEmail(EmailModel emailModel);
        Task<IResult> SendToMail(string email);
        Task<IResult> ResetPassword(ResetPasswordDto resetPasswordDto);
    }
}
