using PMS.Business.Abstract;
using PMS.Core.Entities.Concrete;
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
    public class UserPerformanceManager : IUserPerformanceService
    {
        IUserPerformanceDal _userPerformanceDal;

        public UserPerformanceManager(IUserPerformanceDal userPerformanceDal)
        {
            _userPerformanceDal = userPerformanceDal;
        }

        public IResult Add(UserPerformance userPerformance)
        {
            _userPerformanceDal.Add(userPerformance);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(UserPerformance userPerformance)
        {
            _userPerformanceDal.Delete(userPerformance); 
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserPerformance>>> GetAll()
        {
            return new SuccessDataResult<List<UserPerformance>>(await _userPerformanceDal.GetAll(),"Veriler Getirildi"); 
        }

        public async Task<IDataResult<UserPerformance>> GetById(int id)
        {
            return new SuccessDataResult<UserPerformance>(await _userPerformanceDal.Get(x=>x.USERID==id)); 
        }
        public async Task<IDataResult<UserPerformance>> GetByEmail(string email)   
        {
            return new SuccessDataResult<UserPerformance>(await _userPerformanceDal.Get(x => x.EMAIL == email));
        }

        public IResult Update(UserPerformance userPerformance)
        {
            _userPerformanceDal.Update(userPerformance);
            return new SuccessResult("Güncellendi");
        }
    }
}
