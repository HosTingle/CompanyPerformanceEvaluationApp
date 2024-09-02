using PMS.Business.Abstract;
using PMS.Core.Utilities.Results;
using PMS.DataAccess.Abstract;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Concrete
{
    public class UserPositionManager : IUserPositionService
    {
        IUserPositionDal _userPositionDal;

        public UserPositionManager(IUserPositionDal userPositionDal)
        {
            _userPositionDal = userPositionDal;
        }

        public IResult Add(UserPosition userPosition)
        {
            _userPositionDal.Add(userPosition);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(UserPosition userPosition)
        {
            _userPositionDal.Delete(userPosition);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserPosition>>> GetAll()
        {
            return new SuccessDataResult<List<UserPosition>>(await _userPositionDal.GetAll());
        }

        public async Task<IDataResult<UserPosition>> GetById(int id)
        {
            return new SuccessDataResult<UserPosition>(await _userPositionDal.Get(x=>x.USERPOSITIONID == id)); 
        }
        public async Task<IDataResult<UserPosition>> GetByUserId(int id) 
        {
            return new SuccessDataResult<UserPosition>(await _userPositionDal.Get(x => x.USERID == id));
        }

        public IResult Update(UserPosition userPosition)
        {
            _userPositionDal.Update(userPosition);
            return new SuccessResult("Güncellendi");
        }

        public async Task<IDataResult<UserPositionDetailDto>> GetUserPositionDetails(int userid) 
        {
            return new SuccessDataResult<UserPositionDetailDto>(await _userPositionDal.GetUserPositionDetails(userid), "Employee detaylı bilgileri getirildi.");
        }
    }
}
