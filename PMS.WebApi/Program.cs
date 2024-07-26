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
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PMS.Core.Utilities.Security;
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
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = JwtTokenDefaults.ValidIssuer,
        ValidAudience = JwtTokenDefaults.ValidAudience,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtTokenDefaults.key)),
        ClockSkew=TimeSpan.Zero,
    };
});
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
