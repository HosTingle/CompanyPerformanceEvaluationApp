using Autofac.Extensions.DependencyInjection;
using Autofac;
using PMS.Business.Abstract;
using PMS.Business.Concrete;
using PMS.Business.DependencyResolvers;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework;
using PMS.DataAccess.EntityFramework.Context;
using PMS.Core.Utilities.IoC;
using PMS.Core.Extensions;
using PMS.Core.DependencyResolvers;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Host.UseServiceProviderFactory(services => new AutofacServiceProviderFactory())
                        .ConfigureContainer<ContainerBuilder>(builder => { builder.RegisterModule(new BusinessModule()); });
builder.Services.AddTransient<OracleDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDependencyResolvers(new ICoreModule[]
{
                new CoreModule(),
});
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
