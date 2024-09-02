using Microsoft.IdentityModel.Tokens;
using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Core.Utilities.Security
{
    public class JwtTokenGenerator
    {

        public static TokenResponseViewModel GenerateToken(Authandpositionmix model)
        {
            var claims = new List<Claim>();


   
  
            if (!string.IsNullOrWhiteSpace(model.USERID.ToString()))
            {
                claims.Add(new Claim("USERNAME", model.USERNAME));
                claims.Add(new Claim(ClaimTypes.Name, model.USERNAME));
                claims.Add(new Claim("USERAUTHID", model.USERAUTHID.ToString()));
                claims.Add(new Claim("USERID", model.USERID.ToString()));
                claims.Add(new Claim("POSITIONNAME", model.POSITIONNAME.ToString()));
                claims.Add(new Claim("POSITIONLEVEL", model.POSITIONLEVEL.ToString()));
                claims.Add(new Claim("TEAMNAME", model.TEAMNAME.ToString()));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtTokenDefaults.key));
            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expireDate = DateTime.Now.AddSeconds(20);
            JwtSecurityToken token = new JwtSecurityToken(issuer: JwtTokenDefaults.ValidIssuer,
                audience: JwtTokenDefaults.ValidAudience,
                claims: claims,
                notBefore: DateTime.UtcNow, expires: expireDate, signingCredentials: signinCredentials
                );
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            return new TokenResponseViewModel(tokenHandler.WriteToken(token), expireDate);
        }

        public static TokenResponseViewModel GenerateToken(Authandpositionmix model,int a) 
        {
            var claims = new List<Claim>();




            if (!string.IsNullOrWhiteSpace(model.USERID.ToString()))
            {
                claims.Add(new Claim("USERNAME", model.USERNAME));
                claims.Add(new Claim(ClaimTypes.Name, model.USERNAME));
                claims.Add(new Claim("USERAUTHID", model.USERAUTHID.ToString()));
                claims.Add(new Claim("USERID", model.USERID.ToString()));
                claims.Add(new Claim("POSITIONNAME", model.POSITIONNAME.ToString()));
                claims.Add(new Claim("POSITIONLEVEL", model.POSITIONLEVEL.ToString()));
                claims.Add(new Claim("TEAMNAME", model.TEAMNAME.ToString()));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtTokenDefaults.key));
            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expireDate = DateTime.Now.AddDays(a);
            JwtSecurityToken token = new JwtSecurityToken(issuer: JwtTokenDefaults.ValidIssuer,
                audience: JwtTokenDefaults.ValidAudience,
                claims: claims,
                notBefore: DateTime.UtcNow, expires: expireDate, signingCredentials: signinCredentials
                );
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            return new TokenResponseViewModel(tokenHandler.WriteToken(token), expireDate);
        }
    }
}



