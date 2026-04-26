using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepositoryMessage
    {
      
            Task<Message> AddItem(Message message);
            Task<List<Message>> GetByServiceCallId(int serviceCallId);
        
    }
}
