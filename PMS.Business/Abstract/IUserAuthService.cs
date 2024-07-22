using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.Core.Utilities.Security;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IUserAuthService
    {
        IResult Add(UserAuth userAuth);
        IResult Delete(UserAuth userAuth);
        IResult Update(UserAuth userAuth);

        Task<IDataResult<TokenResponseViewModel>> CreateAccessToken(UserAuth userAuth); 
        Task<IDataResult<List<UserAuth>>> GetAll();
        Task<IDataResult<UserAuth>> GetById(int id);
        IDataResult<UserAuth> Register(UserRegisterDto userRegisterDto);
        Task<IDataResult<UserAuth>> Login(UserLoginDto userForLoginDto);


    }
}
