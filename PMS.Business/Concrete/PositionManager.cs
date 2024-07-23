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
    public class PositionManager : IPositionService
    {
        IPositionDal _positionDal;

        public PositionManager(IPositionDal positionDal)
        {
            _positionDal = positionDal;
        }

        public IResult Add(Position position)
        {
            _positionDal.Add(position);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(Position position)
        {
            _positionDal.Delete(position);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<Position>>> GetAll()
        {
            return new SuccessDataResult<List<Position>>(await _positionDal.GetAll(),"Veriler Getirildi");
        }

        public async Task<IDataResult<Position>> GetById(int id)
        {
            return new SuccessDataResult<Position>(await _positionDal.Get(x=>x.POSITIONID==id));
        }
        public async Task<IDataResult<Position>> GetByName(string name)  
        {
            return new SuccessDataResult<Position>(await _positionDal.Get(x => x.POSITIONNAME == name));
        }

        public IResult Update(Position position)
        {
            _positionDal.Update(position);
            return new SuccessResult("Güncellendi");
        }
    }
}
