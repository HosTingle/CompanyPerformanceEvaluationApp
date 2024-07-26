using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IPositionService
    {
        IResult Add(Position position);
        IResult Delete(Position position);
        IResult Update(Position position);
        

        Task<IDataResult<List<Position>>> GetAll();
        Task<IDataResult<Position>> GetById(int id);
        Task<IDataResult<Position>> GetByName(string name);  

    }
}
