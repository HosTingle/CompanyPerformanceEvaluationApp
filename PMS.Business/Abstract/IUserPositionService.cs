using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IUserPositionService
    {
        IResult Add(UserPosition userPosition); 
        IResult Delete(UserPosition userPosition);
        IResult Update(UserPosition userPosition);
        Task<IDataResult<List<UserPosition>>> GetAll();
        Task<IDataResult<UserPosition>> GetById(int id);
        Task<IDataResult<UserPositionDetailDto>> GetUserPositionDetails(int userid);
        Task<IDataResult<UserPosition>> GetByUserId(int id);
    }
}
