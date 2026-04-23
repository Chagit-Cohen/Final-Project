using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Service.Dto;
using Service.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IServiceReview<ReviewDto> iservice;

        public ReviewController(IServiceReview<ReviewDto> iservice)
        {
            this.iservice = iservice;
        }


        [HttpGet("expert/{expertId}")]
        public Task<List<ReviewDto>> GetByExpertId(int expertId)
        {
            return iservice.GetByExpertId(expertId);
        }

        [Authorize]
        [HttpPost]
        public Task<ReviewDto> Post([FromBody] ReviewDto value)
        {
            return iservice.AddItem(value);
        }
    }
}
