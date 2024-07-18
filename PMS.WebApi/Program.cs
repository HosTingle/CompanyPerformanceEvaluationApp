using PMS.Business.Abstract;
using PMS.Business.Concrete;
using PMS.DataAccess.Abstract;
using PMS.DataAccess.EntityFramework;
using PMS.DataAccess.EntityFramework.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddTransient<IUserPerformanceService, UserPerformanceManager>();
builder.Services.AddTransient<IUserPerformanceDal,EfUserPerformanceDal>();
builder.Services.AddTransient<IAddressService, AddressManager>(); 
builder.Services.AddTransient<IAddressDal, EfAddressDal>();
builder.Services.AddTransient<OracleDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
