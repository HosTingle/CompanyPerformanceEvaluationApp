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
    public class ClaimManager:IClaimService
    {
        IClaimDal _claimDal;

        public ClaimManager(IClaimDal claimDal)
        {
            _claimDal = claimDal;
        }

        public IResult Add(ClaimUser claim)
        {
            _claimDal.Add(claim);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(ClaimUser claim)
        {
            _claimDal.Delete(claim);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<ClaimUser>>> GetAll()
        {
            return new SuccessDataResult<List<ClaimUser>>(await _claimDal.GetAll(), "Verileri Getirildi");
        }

        public async Task<IDataResult<ClaimUser>> GetById(int id)
        {
            return new SuccessDataResult<ClaimUser>(await _claimDal.Get(x=>x.CLAIMID == id),"Veri Getirildi");
        }

        public IResult Update(ClaimUser claim)
        {
            _claimDal.Update(claim);
            return new SuccessResult("Güncellendi");
        }
    }
}
