using PMS.Business.Abstract;
using PMS.Core.Utilities.Results;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
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
            int minValue = 80;
            int maxValue = 100000;
            Random random = new Random();
            int randomNumberr = random.Next(minValue, maxValue);
            userTask.TASKID=randomNumberr;
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
        public async Task<IDataResult<List<UserTaskDateDto>>> GetAllById(int id)
        { 
            var result =await  _userTaskDal.GetUserTaskById(id);
            var userTaskDateDtoList = new List<UserTaskDateDto>();

            foreach (var userTask in result)
            {
                var sa = new UserTaskDateDto
                {
                    DUEDATE = DateOnly.FromDateTime(userTask.DUEDATE),
                    TASKNAME = userTask.TASKNAME,
                    DESCRIPTION = userTask.DESCRIPTION,
                    STATUS = userTask.STATUS,
                    TASKID = userTask.TASKID,
                    USERID = userTask.USERID,
                    ISCOMPLETED=userTask.ISCOMPLETED,
                };

                userTaskDateDtoList.Add(sa);
            }
            return new SuccessDataResult<List<UserTaskDateDto>>(userTaskDateDtoList, "Userlar görevleri getirildi");
        }

    }
}
