using AutoMapper;
using Repository.Interfaces;
using Service.Interfaces;

using Repository.Models;
using Service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ServiceCallService : IServiceServiceCall
    {
        private readonly IRepositoryServiceCall repository;
        private readonly IMapper mapper;

        public ServiceCallService(IRepositoryServiceCall repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

       
        public async Task<ServiceCallDto> Add(CreateServiceCallDto dto)
        {
            var serviceCall = new ServiceCall
            {
                ClientId = dto.ClientId,
                ExpertId = dto.ExpertId,
                Title = dto.Title,
                Description = dto.Description,
                InitialImageUrl = dto.InitialImageUrl,
                Status = "פתוחה",
                CreatedAt = DateTime.Now
            };

            ServiceCall result = await repository.AddItem(serviceCall);

            return mapper.Map<ServiceCallDto>(result);
        }

        public async Task<ServiceCallDto?> GetById(int id)
        {
            ServiceCall result = await repository.GetById(id);

            return mapper.Map<ServiceCallDto?>(result);
        }

        public async Task<List<ServiceCallDto>> GetByClientId(int clientId)
        {
            List<ServiceCall> result = await repository.GetByClientId(clientId);

            return mapper.Map<List<ServiceCallDto>>(result);
        }

        public async Task<List<ServiceCallDto>> GetByExpertId(int expertId)
        {
            List<ServiceCall> result = await repository.GetByExpertId(expertId);

            return mapper.Map<List<ServiceCallDto>>(result);
        }

        public async Task UpdateStatus(int id, string status)
        {
            await repository.UpdateStatus(id, status);
        }
    }
}
