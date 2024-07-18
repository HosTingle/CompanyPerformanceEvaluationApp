using PMS.Business.Abstract;
using PMS.Core.Utilities.Results;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Concrete
{
    public class UserAuthManager : IUserAuthService
    {
        IUserAuthDal _userAuthDal;

        public UserAuthManager(IUserAuthDal userAuthDal)
        {
            _userAuthDal = userAuthDal;
        }

        public IResult Add(UserAuth userAuth)
        {
            _userAuthDal.Add(userAuth);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(UserAuth userAuth)
        {
            _userAuthDal.Delete(userAuth);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserAuth>>> GetAll()
        {
            return new SuccessDataResult<List<UserAuth>>(await _userAuthDal.GetAll());
        }

        public async Task<IDataResult<UserAuth>> GetById(int id)
        {
            return new SuccessDataResult<UserAuth>(await _userAuthDal.Get(x=>x.USERAUTHID == id));
        }

        public IResult Update(UserAuth userAuth)
        {
            _userAuthDal.Update(userAuth);
            return new SuccessResult("Güncellendi");
        }
    }
}
