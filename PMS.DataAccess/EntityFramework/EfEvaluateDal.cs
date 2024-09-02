using Microsoft.EntityFrameworkCore;
using PMS.Core.DataAccess.EntityFramework;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework.Context;
using PMS.Entity.Concrete;
using PMS.Entity.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DataAccess.EntityFramework
{
    public class EfEvaluateDal:EfEntityRepositoryBase<Evaluate,OracleDbContext>,IEvaluateDal
    {
        public void AddRange(IEnumerable<Evaluate> evaluates)
        {
            using (var context = new OracleDbContext())
            {
                context.Set<Evaluate>().AddRange(evaluates);
                context.SaveChanges();
            }
        }
        private IQueryable<GetEvaluateDetailsDto> GetEvaluateQueryList(OracleDbContext context, int userId)
        {
            return from e in context.EVALUATE
                   join au in context.USERS_INFO on e.EVALUATORID equals au.USERID
                   join auu in context.USERS_INFO on e.EVALUATEEID equals auu.USERID
                   join ut in context.USER_TASK on e.TASKID equals ut.TASKID
                   join eq in context.EVALUATE_QUESTION on e.EVALQUESTIONID equals eq.EVALUATEQUESTIONID
                   where e.EVALUATEEID == userId
                   select new GetEvaluateDetailsDto
                   {
                       EVALUATEID=e.EVALUATEID,
                       EVALUATEENAME=auu.NAME,
                       EVALUATEEIMAGEURL=auu.IMAGEURL,
                       EVALUATORNAME=au.NAME,
                       EVALUATORIMAGEURL=au.IMAGEURL,
                       EVALUATEQUESTION=eq.EVALUATEQUESTION,
                       TASKNAME=ut.TASKNAME,
                       DESCRIPTION=ut.DESCRIPTION,
                       EVALUATESCORE=e.EVALUATESCORE,
                       EVALUATIONDATE=e.EVALUATIONDATE,
                       FEEDBACKCOMMENT=e.FEEDBACKCOMMENT,
                       PERIOD=e.PERIOD,          
                   };
        }
        public async Task<List<GetEvaluateDetailsDto>> GetEvaluateDetailsList(int userid) 
        {

            using (OracleDbContext context = new OracleDbContext())
            {
                var result = GetEvaluateQueryList(context, userid);
                return await result.ToListAsync();
            }
        }
        private IQueryable<GetEvaluateDetailsDto> GetEvaluateQueryListt(OracleDbContext context, int userId)
        {
            return from e in context.EVALUATE
                   join au in context.USERS_INFO on e.EVALUATORID equals au.USERID
                   join auu in context.USERS_INFO on e.EVALUATEEID equals auu.USERID
                   join ut in context.USER_TASK on e.TASKID equals ut.TASKID
                   join eq in context.EVALUATE_QUESTION on e.EVALQUESTIONID equals eq.EVALUATEQUESTIONID
                   where e.EVALUATORID == userId
                   select new GetEvaluateDetailsDto
                   {
                       EVALUATEID = e.EVALUATEID,
                       EVALUATEENAME = auu.NAME,
                       EVALUATEEIMAGEURL = auu.IMAGEURL,
                       EVALUATORNAME = au.NAME,
                       EVALUATORIMAGEURL = au.IMAGEURL,
                       EVALUATEQUESTION = eq.EVALUATEQUESTION,
                       TASKNAME = ut.TASKNAME,
                       DESCRIPTION = ut.DESCRIPTION,
                       EVALUATESCORE = e.EVALUATESCORE,
                       EVALUATIONDATE = e.EVALUATIONDATE,
                       FEEDBACKCOMMENT = e.FEEDBACKCOMMENT,
                       PERIOD = e.PERIOD,
                   };
        }
        public async Task<List<GetEvaluateDetailsDto>> GetEvaluateDetailsListt(int userid)
        {

            using (OracleDbContext context = new OracleDbContext())
            {
                var result = GetEvaluateQueryListt(context, userid);
                return await result.ToListAsync();
            }
        }
    }
}
