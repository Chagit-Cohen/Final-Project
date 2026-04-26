using Service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IServiceServiceCall
    {
        Task<ServiceCallDto> Add(CreateServiceCallDto dto);

        Task<ServiceCallDto?> GetById(int id);

        Task<List<ServiceCallDto>> GetByClientId(int clientId);

        Task<List<ServiceCallDto>> GetByExpertId(int expertId);

        Task UpdateStatus(int id, string status);

    }
}
