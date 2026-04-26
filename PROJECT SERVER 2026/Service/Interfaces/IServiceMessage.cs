using Service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IServiceMessage
    {
        Task<MessageDto> Add(MessageDto dto);

        Task<List<MessageDto>> GetByServiceCallId(int serviceCallId);
    }
}
