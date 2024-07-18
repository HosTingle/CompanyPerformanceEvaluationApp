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
    public class PositionClaimManager : IPositionClaimeService
    {
        IPositionClaimDal _positionClaimDal;

        public PositionClaimManager(IPositionClaimDal positionClaimDal)
        {
            _positionClaimDal = positionClaimDal;
        }

        public IResult Add(PositionClaim positionClaim)
        {
           _positionClaimDal.Add(positionClaim);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(PositionClaim positionClaim)
        {
            _positionClaimDal.Delete(positionClaim);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<PositionClaim>>> GetAll()
        {
            return new SuccessDataResult<List<PositionClaim>>(await _positionClaimDal.GetAll());
        }

        public async Task<IDataResult<PositionClaim>> GetById(int id)
        {
            return new SuccessDataResult<PositionClaim>(await _positionClaimDal.Get(x => x.POSITIONCLAIMID == id));
        }

        public IResult Update(PositionClaim positionClaim)
        {
            _positionClaimDal.Update(positionClaim);
            return new SuccessResult("Güncellendi");
        }
    }
}
