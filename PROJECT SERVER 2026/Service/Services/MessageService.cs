using AutoMapper;
using Repository.Interfaces;
using Repository.Models;
using Service.Dto;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class MessageService : IServiceMessage
    {
        private readonly IRepositoryMessage repository;
        private readonly IMapper mapper;

        public MessageService(IRepositoryMessage repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<MessageDto> Add(MessageDto mes)
        {
            if (string.IsNullOrWhiteSpace(mes.Content) &&
                string.IsNullOrWhiteSpace(mes.AttachmentUrl))
            {
                throw new Exception("Message must contain text or attachment");
            }

            mes.SentAt = DateTime.Now;

            Message message = mapper.Map<Message>(mes);

            Message result = await repository.AddItem(message);

            return mapper.Map<MessageDto>(result);
        }

        public async Task<List<MessageDto>> GetByServiceCallId(int serviceCallId)
        {
            var result = await repository.GetByServiceCallId(serviceCallId);

            return mapper.Map<List<MessageDto>>(result);
        }
    }
}
