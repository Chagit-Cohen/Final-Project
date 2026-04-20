using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository;
using Repository.Interfaces;
using Repository.Models;
using Repository.Repositories;
using Service.Dto;
using Service.Interfaces;
using Service.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()      // ?? מאפשר כל פורט, רק לפיתוח
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});



//סווגר עם אבטחה
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "securityLessonWebApi", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Please enter your bearer token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }
            });
});
//שימוש בטוקן כדי לאמת
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(option =>
      option.TokenValidationParameters = new TokenValidationParameters
      {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = builder.Configuration["Jwt:Issuer"],
          ValidAudience = builder.Configuration["Jwt:Audience"],
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))

      });






// הזרקת תלויות
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<IServiceUser<UserDto>, UserService>();

builder.Services.AddScoped<IRepositoryExpert<ExpertProfile>, ExpertProfileRepository>();

builder.Services.AddScoped<IServiceUser<UserDto>, UserService>();
builder.Services.AddScoped<IServiceExpert<ExpertProfileDto>, ExpertProfileService>();

builder.Services.AddScoped<ILogin, UserLoginService>();




builder.Services.AddAutoMapper(typeof(MyMapper));
builder.Services.AddScoped<IContext, DataBase>();


//1 addsingelton -מופע יחיד
//2 addScoped  -עבור כל גולש 
//3 addTrensisnet -לכל בקשה




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.UseCors("ReactPolicy");




app.UseAuthentication();

app.UseAuthorization();

//מאפשר לעלןת קבצים לרשת
app.UseStaticFiles();

app.MapControllers();

app.Run();
