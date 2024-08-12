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
    public class UserTaskManager:IUserTaskService
    {
        IUserTaskDal _userTaskDal;

        public UserTaskManager(IUserTaskDal userTaskDal)
        {
            _userTaskDal = userTaskDal;
        }

        public IResult Add(UserTask userTask)
        {
            _userTaskDal.Add(userTask);
            return new SuccessResult("Eklendi");
        }

        public IResult Delete(UserTask userTask)
        {
            _userTaskDal.Delete(userTask);
            return new SuccessResult("Silindi");
        }

        public async Task<IDataResult<List<UserTask>>> GetAll()
        {
            return new SuccessDataResult<List<UserTask>>(await _userTaskDal.GetAll());
        }

        public async Task<IDataResult<UserTask>> GetById(int id)
        {
            return new SuccessDataResult<UserTask>(await _userTaskDal.Get(x=>x.TASKID == id));
        }

        public IResult Update(UserTask userTask)
        {
            _userTaskDal.Update(userTask);
            return new SuccessResult("Güncellendi");
        }
        public async Task<IDataResult<List<UserTask>>> GetAllById(int id)
        {
            return new SuccessDataResult<List<UserTask>>(await _userTaskDal.GetUserTaskById(id),"Userlar görevleri getirildi");
        }
    }
}
