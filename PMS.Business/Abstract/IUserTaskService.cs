using PMS.Core.Utilities.Results;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.Abstract
{
    public interface IUserTaskService
    {
        IResult Add(UserTask userTask);  
        IResult Delete(UserTask userTask);
        IResult Update(UserTask userTask); 
        Task<IDataResult<List<UserTask>>> GetAll();
        Task<IDataResult<UserTask>> GetById(int id); 
        Task<IDataResult<List<UserTaskDateDto>>> GetAllById(int id); 
    }
}
