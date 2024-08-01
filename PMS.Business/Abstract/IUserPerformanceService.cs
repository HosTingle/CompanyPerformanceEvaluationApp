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
        IResult Add(UserPerformance userPerformance);  
        IResult Delete(UserPerformance userPerformance);
        IResult Update(UserPerformance userPerformance);


        Task<IDataResult<List<UserPerformance>>> GetAll();
        Task<IDataResult<UserPerformance>> GetById(int id);
        Task<IDataResult<UserPerformance>> GetByEmail(string email);
        Task<IDataResult<UserPerformanceDetailDto>> GetByIdDetail(int id);
        IResult UpdateUserInfo(UserUpdateDto userUpdateDto);
    }
}
