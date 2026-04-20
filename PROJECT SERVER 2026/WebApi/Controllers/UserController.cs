//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Data.SqlClient;
//using Service.Dto;
//using Service.Interfaces;
//using Service.Services;
//using System.Security.Claims;

//namespace WebApi.Controllers
//{

//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly IService<UserDto> iservice;
//        public UserController(IService<UserDto> iservice)
//        {
//            this.iservice = iservice;
//        }
//        // GET: api/<UserController>
//        [Authorize]
//        [HttpGet]
//        public Task<List<UserDto>> Get()
//        {
//            return iservice.GetAll();
//        }

//        // GET api/<UserController>/5
//        [Authorize]
//        [HttpGet("{id}")]
//        public Task<UserDto> Get(int id)
//        {
//            return iservice.GetById(id);
//        }

//        // POST api/<UserController>
//        [HttpPost]
//        [Consumes("multipart/form-data")]
//        public async Task<ActionResult<UserDto>> Post([FromForm] UserDto item)
//        {
//            try
//            {
//                var result = await iservice.AddItem(item);
//                return Ok(result);
//            }
//            catch (Exception ex)
//            {
//                if (ex.InnerException is SqlException sqlEx &&
//                    (sqlEx.Number == 2601 || sqlEx.Number == 2627))
//                {
//                    return BadRequest("האימייל כבר קיים במערכת");
//                }

//                throw;
//            }

//        }

//            // PUT api/<UserController>/5
//            [Authorize]
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] UserDto value)
//        {
//            iservice.UpdateItem(id, value);
//        }

//        // DELETE api/<UserController>/5
//        [Authorize]
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//            iservice.DeleteItem(id);
//        }


//        [Authorize]
//        [HttpGet("me")]
//        public async Task<IActionResult> GetUserByToken()
//        {
//            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

//            if (userIdClaim == null)
//            {
//                return Unauthorized();
//            }

//            int userId = int.Parse(userIdClaim.Value);

//            UserDto user = await iservice.GetById(userId);

//            if (user == null)
//            {
//                return NotFound();
//            }

//            return Ok(new
//            {
//                id = user.Id,
//                fullName = user.FullName,
//                email = user.Email,
//                city = user.City,
//                isExpert = user.IsExpert,
//                isAdmin = user.IsAdmin,
//                profileUrl = user.ProfileUrl
//            });
//        }


//    }
//}


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
        private readonly IService<UserDto> iservice;

        public UserController(IService<UserDto> iservice)
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
        public async Task<ActionResult<UserDto>> Put(int id, [FromForm] UserDto value)
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