using MailKit.Net.Smtp;
using MimeKit;
using PMS.Core.Utilities.ForgetPass;
using PMS.Core.Utilities.Results;
using PMS.Core.Utilities.Security;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System.Security.Cryptography;
namespace PMS.Business.ForgetPass
{
    public class EmailService : IEmailService
    {
        private readonly IUserAuthDal _userAuthDal;

        public EmailService(IUserAuthDal userAuthDal) 
        {

            _userAuthDal = userAuthDal;
        }

        public async Task SendEmail(EmailModel emailModel)
        {
            var emailMesage = new MimeMessage();
            var from = "fenerligokde@gmail.com";
            emailMesage.From.Add(new MailboxAddress("Lets Program ", from));
            emailMesage.To.Add(new MailboxAddress("Lets Program ", emailModel.To));
            emailMesage.Subject = emailModel.Subject;
            emailMesage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(emailModel.Content)
            };
            using (var client = new SmtpClient())
            {
                try
                {

                    client.Connect("smtp.gmail.com", 465, true);
                    client.Authenticate("fenerligokde@gmail.com", "kvvtsmzjzbtftopg");
                    client.Send(emailMesage);
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
        public async Task<IResult> SendToMail(string email)
        {
            var user=await _userAuthDal.Get(x=>x.EMAIL== email);
            if(user is null)
            {
                return new ErrorResult("Email gönderilemedi.");
            }
            var tokenBtyes = RandomNumberGenerator.GetBytes(64);
            var emailToken=Convert.ToBase64String(tokenBtyes);
            user.RESETPASSTOKEN=emailToken;
            user.RESETPASSEXPIRE = DateTime.Now.AddMinutes(15);
            string from = "fenerligokde@gmail.com";
            var emailModel = new EmailModel
            {
                To = email,
                Content = $@"http://localhost:4200/reset-password?email={email}&code={emailToken} Reset Password",
                Subject= EmailBody.EmailStringBodu(email, emailToken)
            };
            await SendEmail(emailModel);
            _userAuthDal.Update(user);
            return new SuccessResult("Email gönderildi");
        }
        public async Task<IResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            byte[] passwordHash, passwordSalt;
            var newToken = resetPasswordDto.EmailToken.Replace("+", "");
            var user = await _userAuthDal.Get(x => x.EMAIL == resetPasswordDto.Email);
            if (user is null)
            {
                return new ErrorResult("User yok");
            }
            var tokenCode = user.RESETPASSTOKEN;
            DateTime? emailTokenExpire=user.RESETPASSEXPIRE;
            if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpire<DateTime.Now)
            {
                return new ErrorResult("Böyle bir link yok");
            }
            HashingHelper.CreatePasswordHash(resetPasswordDto.NewPassword, out passwordHash, out passwordSalt);
            user.PASSWORDHASH = passwordHash;
            user.PASSWORDSALT = passwordSalt;
            _userAuthDal.Update(user);
            return new SuccessResult("Password Basariyle güncellendi");
        }
    }
}
