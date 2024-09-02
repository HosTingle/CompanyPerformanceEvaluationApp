using PMS.Core.DataAccess;
using PMS.Core.Entities.Concrete;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.Abstract
{
    public interface IUserPerformanceDal:IEntityRepository<UserInfo>
    {
        Task<UserPerformanceDetailDto> GetUserPerformanceDetails(int userid);
        Task<List<UserPerformanceDetailAllDto>> GetUserPerformanceDetailsList(int userid);
        Task<List<string>> GetCityList();
    }
}
