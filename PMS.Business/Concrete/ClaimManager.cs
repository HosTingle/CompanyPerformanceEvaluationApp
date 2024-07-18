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
    public class ClaimManager:IClaimService
    {
        IClaimDal _claimDal;

        public ClaimManager(IClaimDal claimDal)
        {
            _claimDal = claimDal;
        }

        public IResult Add(Claim claim)
        {
            _claimDal.Add(claim);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(Claim claim)
        {
            _claimDal.Delete(claim);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<Claim>>> GetAll()
        {
            return new SuccessDataResult<List<Claim>>(await _claimDal.GetAll(), "Verileri Getirildi");
        }

        public async Task<IDataResult<Claim>> GetById(int id)
        {
            return new SuccessDataResult<Claim>(await _claimDal.Get(x=>x.CLAIMID == id));
        }

        public IResult Update(Claim claim)
        {
            _claimDal.Update(claim);
            return new SuccessResult("Güncellendi");
        }
    }
}
