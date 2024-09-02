using PMS.Core.Entities.Concrete;
using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IAddressService
    {
        IResult Add(Address address);
        IResult Delete(Address address);
        IResult Update(Address address);
        Task<IDataResult<Address>> GetById(int id);
        Task<IDataResult<List<Address>>> GetAll();
        Task<IDataResult<List<string>>> GetAllAddress();  

    }
}
