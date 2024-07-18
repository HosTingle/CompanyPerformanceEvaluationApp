using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
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


        Task<IDataResult<List<UserAuth>>> GetAll();
        Task<IDataResult<UserAuth>> GetById(int id); 

    }
}
