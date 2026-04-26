using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Dto;
using Service.Interfaces;
using Service.Services;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCallController : ControllerBase
    {
        private readonly IServiceServiceCall service;

        public ServiceCallController(IServiceServiceCall service)
        {
            this.service = service;
        }

        [HttpPost]
        [HttpPost]
        public async Task<ActionResult<ServiceCallDto>> Add(CreateServiceCallDto dto)
        {
            var result = await service.Add(dto);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceCallDto>> GetById(int id)
        {
            var result = await service.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("client/{clientId}")]
        public async Task<ActionResult<List<ServiceCallDto>>> GetByClientId(int clientId)
        {
            var result = await service.GetByClientId(clientId);

            return Ok(result);
        }

        [HttpGet("expert/{expertId}")]
        public async Task<ActionResult<List<ServiceCallDto>>> GetByExpertId(int expertId)
        {
            var result = await service.GetByExpertId(expertId);

            return Ok(result);
        }

        [HttpPut("{id}/status")]
        public async Task<ActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            await service.UpdateStatus(id, status);

            return Ok();
        }
    }
}
