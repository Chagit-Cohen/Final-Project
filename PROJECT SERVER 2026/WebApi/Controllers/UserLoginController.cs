//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using Service.Dto;
//using Service.Interfaces;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//namespace WebApi.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserLoginController:ControllerBase
//    {


//            private readonly ILogin login;
//            private readonly IConfiguration config;
//            public UserLoginController(ILogin login, IConfiguration config)
//            {
//                this.login = login;
//                this.config = config;
//            }



//            // POST api/<LoginController>
//            [HttpPost]

//            public async Task< IActionResult> Post([FromBody] UserLoginDto user)
//            {
//                //אימות משתמש
//                UserDto user1 = await login.Login(user);
//                if (user1 != null)
//                {
//                    string token =GenerateToken(user1);
//                    return Ok(new
//                    {
//                        token = token,
//                        user = new
//                        {
//                            id = user1.Id,
//                            fullName = user1.FullName,
//                            email = user1.Email,
//                            city = user1.City,
//                            isExpert = user1.IsExpert,
//                            isAdmin = user1.IsAdmin,
//                            profileUrl = user1.ProfileUrl
//                        }
//                    });
//            }
//                 return Unauthorized();
//            }

//            private string GenerateToken(UserDto user1)
//            {
//                var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
//                //אלגוריתם להצפנה
//                var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
//                var claims = new[] {
//                new Claim(ClaimTypes.Email,user1.Email),
//                new Claim(ClaimTypes.NameIdentifier, user1.Id.ToString()),
//                //new Claim("Id",user1.Id.ToString()),
//                //new Claim(ClaimTypes.GivenName,user1.Name)
//            };
//                var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"],
//                    claims,
//                    expires: DateTime.Now.AddMinutes(15),
//                    signingCredentials: credentials);
//                return new JwtSecurityTokenHandler().WriteToken(token);
//            }



//    }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Service.Dto;
using Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly ILogin login;
        private readonly IConfiguration config;

        public UserLoginController(ILogin login, IConfiguration config)
        {
            this.login = login;
            this.config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserLoginDto user)
        {
            try
            {
               

                UserDto user1 = await login.Login(user);

                string token = GenerateToken(user1);

                return Ok(new
                {
                    token = token,
                    user = new
                    {
                        id = user1.Id,
                        fullName = user1.FullName,
                        email = user1.Email,
                        city = user1.City,
                        isExpert = user1.IsExpert,
                        isAdmin = user1.IsAdmin,
                        profileUrl = user1.ProfileUrl
                    }
                });
            }
            catch (Exception ex)
            {
                
                return Unauthorized(new { message = ex.Message });
            }
        }

        private string GenerateToken(UserDto user1)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.Email,user1.Email),
                new Claim(ClaimTypes.NameIdentifier, user1.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}