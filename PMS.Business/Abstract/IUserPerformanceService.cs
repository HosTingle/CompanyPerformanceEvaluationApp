using PMS.Core.Entities.Concrete;
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
    public interface IUserPerformanceService
    {
        IResult Add(UserInfo userPerformance);  
        IResult Delete(UserInfo userPerformance);
        IResult Update(UserInfo userPerformance);


        Task<IDataResult<List<UserInfo>>> GetAll();
        Task<IDataResult<UserInfo>> GetById(int id);
        Task<IDataResult<UserInfo>> GetByEmail(string email);
        Task<IDataResult<GetByIdUserPerformanceDetailDto>> GetByIdDetail(int id);
        IResult UpdateUserInfo(UserUpdateDto userUpdateDto);
        IResult DeleteAllUserPerformance(UserUpdateDto userUpdateDto);
        Task<IDataResult<List<UserPerformanceDetailAllDto>>> GetAllPerformanceDetail(int userid);
        Task<IDataResult<List<string>>> GetAllAddress();
    }
}
