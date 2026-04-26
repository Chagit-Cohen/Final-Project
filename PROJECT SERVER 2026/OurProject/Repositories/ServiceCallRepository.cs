using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ServiceCallRepository : IRepositoryServiceCall
    {
        private readonly IContext context;

        public ServiceCallRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<ServiceCall> AddItem(ServiceCall sc)
        {
            await context.serviceCalls.AddAsync(sc);
            context.save();
            return sc;
        }

        public async Task<ServiceCall?> GetById(int id)
        {
            return await context.serviceCalls
                .Include(x => x.Client)
                .Include(x => x.Expert)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<ServiceCall>> GetByClientId(int clientId)
        {
            return await context.serviceCalls
                .Where(sc => sc.ClientId == clientId)
                .Include(sc => sc.Client)
                .Include(sc => sc.Expert)
                .ToListAsync();
        }

        public async Task<List<ServiceCall>> GetByExpertId(int expertId)
        {
            return await context.serviceCalls
                .Where(sc => sc.ExpertId == expertId)
                .Include(sc => sc.Client)
                .Include(sc => sc.Expert)
                .ToListAsync();
        }

        public async Task UpdateStatus(int id, string status)
        {
            var sc = await context.serviceCalls
                .FirstOrDefaultAsync(x => x.Id == id);

            if (sc != null)
            {
                sc.Status = status;
                context.save();
            }
        }
    }
}
