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
    public class MessageRepository : IRepository<Message>
    {
        private readonly IContext context;

        public MessageRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Message> AddItem(Message message)
        {
            await context.messages.AddAsync(message);
            context.save();
            return message;
        }

        public async Task<List<Message>> GetAll()
        {
            return await context.messages.ToListAsync();
        }

        // פונקציה נוספת שחשובה לצאט:
        public async Task<List<Message>> GetByServiceCallId(int serviceCallId)
        {
            return await context.messages
                .Where(m => m.ServiceCallId == serviceCallId)
                .OrderBy(m => m.SentAt) // סידור לפי זמן כדי שהצאט יהיה רציף
                .ToListAsync();
        }

        public async Task<Message> GetById(int id)
        {
            return await context.messages.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateItem(int id, Message item)
        {
            throw new NotImplementedException();
        }
    }
}
