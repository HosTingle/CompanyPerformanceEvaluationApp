using PMS.Core.DataAccess;
using PMS.Core.Entities.Concrete;
using PMS.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.Abstract
{
    public interface IUserAuthDal: IEntityRepository<UserAuth> 
    {
    }
}
