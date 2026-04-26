using Microsoft.AspNetCore.Mvc;
using Service.Dto;
using Service.Services;
using Service.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IServiceMessage service;

        public MessageController(IServiceMessage service)
        {
            this.service = service;
        }

        [HttpGet("service-call/{serviceCallId}")]
        public async Task<ActionResult<List<MessageDto>>> GetByServiceCallId(int serviceCallId)
        {
            var result = await service.GetByServiceCallId(serviceCallId);

            return Ok(result);
        }
    }
}
