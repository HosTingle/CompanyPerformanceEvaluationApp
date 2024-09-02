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
    public class AddressManager : IAddressService
    {
        IAddressDal _addressDal;

        public AddressManager(IAddressDal addressDal)
        {
            _addressDal = addressDal;
        }

        public IResult Add(Address address)
        {
            _addressDal.Add(address);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(Address address)
        {
            _addressDal.Delete(address);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<Address>> GetById(int id) 
        {
            return new SuccessDataResult<Address>(await _addressDal.Get(p => p.ADDRESSID == id),"Getirildi");
        }

        public async Task<IDataResult<List<Address>>> GetAll()
        {
            return new SuccessDataResult<List<Address>>(await _addressDal.GetAll(), "Veriler Getirildi");
        }

        public IResult Update(Address address) 
        {
            _addressDal.Update(address); 
            return new SuccessResult("Güncellendi");
        }

        public async Task<IDataResult<List<string>>> GetAllAddress()
        {
            var result = await _addressDal.GetCityList();
            return new SuccessDataResult<List<string>>(result,"Veriler getirildi");
        }
    }
}
