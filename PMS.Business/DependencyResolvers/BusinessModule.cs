using Autofac;
using Autofac.Extras.DynamicProxy;
using Castle.DynamicProxy;
using PMS.Business.Abstract;
using PMS.Business.Concrete;
using PMS.Business.ForgetPass;
using PMS.Core.Utilities.ForgetPass;
using PMS.Core.Utilities.Interceptors;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Business.DependencyResolvers
{
    public class BusinessModule:Module
    {
        protected override void Load(ContainerBuilder builder)
        {


            builder.RegisterType<UserTaskManager>().As<IUserTaskService>().SingleInstance();
            builder.RegisterType<EfUserTaskDal>().As<IUserTaskDal>().SingleInstance();

            builder.RegisterType<ClaimManager>().As<IClaimService>().SingleInstance();
            builder.RegisterType<EfClaimDal>().As<IClaimDal>().SingleInstance();

            builder.RegisterType<EvaluateManager>().As<IEvaluateService>().SingleInstance();
            builder.RegisterType<EfEvaluateDal>().As<IEvaluateDal>().SingleInstance();

            builder.RegisterType<EvaluateQuestionManager>().As<IEvaluateQuestionService>().SingleInstance();
            builder.RegisterType<EfEvaluateQuestionDal>().As<IEvaluateQuestionDal>().SingleInstance();

            builder.RegisterType<PositionManager>().As<IPositionService>().SingleInstance();
            builder.RegisterType<EfPositionDal>().As<IPositionDal>().SingleInstance();

            builder.RegisterType<PositionClaimManager>().As<IPositionClaimeService>().SingleInstance();
            builder.RegisterType<EfPositionClaimDal>().As<IPositionClaimDal>().SingleInstance();

            builder.RegisterType<UserAuthManager>().As<IUserAuthService>().SingleInstance();
            builder.RegisterType<EfUserAuthDal>().As<IUserAuthDal>().SingleInstance();



            builder.RegisterType<UserPositionManager>().As<IUserPositionService>().SingleInstance();
            builder.RegisterType<EfUserPositionDal>().As<IUserPositionDal>().SingleInstance();

            builder.RegisterType<AddressManager>().As<IAddressService>().SingleInstance();
            builder.RegisterType<EfAddressDal>().As<IAddressDal>().SingleInstance();

            builder.RegisterType<UserPerformanceManager>().As<IUserPerformanceService>().SingleInstance();
            builder.RegisterType<EfUserPerformanceDal>().As<IUserPerformanceDal>().SingleInstance();

            builder.RegisterType<EmailService>().As<IEmailService>().SingleInstance();



            var assembly = System.Reflection.Assembly.GetExecutingAssembly();

            builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces()
                .EnableInterfaceInterceptors(new ProxyGenerationOptions()
                {
                    Selector = new AspectInterceptorSelector()
                }).SingleInstance();
        }
    }
}
