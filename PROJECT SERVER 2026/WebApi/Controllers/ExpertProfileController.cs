using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Dto;
using Service.Interfaces;
namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpertProfileController : ControllerBase
    {
        private readonly IServiceExpert<ExpertProfileDto> iservice;
        public ExpertProfileController(IServiceExpert<ExpertProfileDto> iservice)
        {
            this.iservice = iservice;
        }
        // GET: api/<UserController>
        
        [HttpGet]
        public Task<List<ExpertProfileDto>> Get()
        {
            return iservice.GetAll();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public Task<ExpertProfileDto> Get(int id)
        {
            return iservice.GetById(id);
        }

        // POST api/<UserController>
        [Authorize]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public Task<ExpertProfileDto> Post([FromForm] ExpertProfileDto value)
        {
            return iservice.AddItem(value);
        }

        // PUT api/<UserController>/5
      
        [Authorize]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task Put(int id, [FromForm] ExpertProfileDto value)
        {
            await iservice.UpdateItem(id, value);
        }
        // DELETE api/<UserController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            iservice.DeleteItem(id);
        }
    }
}
