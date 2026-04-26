using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepositoryServiceCall
    {
        Task<ServiceCall> AddItem(ServiceCall serviceCall);
        Task<ServiceCall?> GetById(int id);
        Task<List<ServiceCall>> GetByClientId(int clientId);
        Task<List<ServiceCall>> GetByExpertId(int expertId);
        Task UpdateStatus(int id, string status);
    }
}
