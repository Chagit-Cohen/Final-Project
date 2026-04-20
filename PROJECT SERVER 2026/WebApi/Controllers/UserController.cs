

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Service.Dto;
using Service.Interfaces;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IServiceUser<UserDto> iservice;

        public UserController(IServiceUser<UserDto> iservice)
        {
            this.iservice = iservice;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            var users = await iservice.GetAll();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            try
            {
                UserDto user = await iservice.GetById(id);
                return Ok(user);

            }

            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }


        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<UserDto>> Post([FromForm] UserDto item)
        {
            try
            {
                var result = await iservice.AddItem(item);
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                    return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<UserDto>> Put(int id, [FromForm] UserUpdateDto value)
        {
            try
            {
                await iservice.UpdateItem(id, value);
                var updatedUser = await iservice.GetById(id);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await iservice.DeleteItem(id);
                return Ok(new { message = "המשתמש נמחק בהצלחה" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetUserByToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized(new { message = "המשתמש אינו מחובר" });

            int userId = int.Parse(userIdClaim.Value);

            UserDto user = await iservice.GetById(userId);

            if (user == null)
                return NotFound(new { message = "המשתמש לא נמצא" });

            return Ok(new
            {
                id = user.Id,
                fullName = user.FullName,
                email = user.Email,
                city = user.City,
                isExpert = user.IsExpert,
                isAdmin = user.IsAdmin,
                profileUrl = user.ProfileUrl
            });
        }
    }
}