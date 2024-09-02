using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.Core.Utilities.Security;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IUserAuthService
    {
        IResult Add(UserAuth userAuth);
        IResult Delete(UserAuth userAuth);
        IResult Update(UserAuth userAuth);
        Task<IDataResult<TokenResponseViewModel>> CreateAccessToken(UserPositionDetailDto userPositionDetailDto,int a); 
        Task<IDataResult<List<UserAuth>>> GetAll();
        Task<IDataResult<UserAuth>> GetById(int id);
        IResult Register(UserRegisterDto userRegisterDto);
        Task<IDataResult<UserAuth>> Login(UserLoginDto userForLoginDto);
        string GenerateRefreshToken(); 
        ClaimsPrincipal GetPrincipleFromExpiredToken(string token);
        Task<IDataResult<UserAuth>> GetByUserId(int id);

    }
}
