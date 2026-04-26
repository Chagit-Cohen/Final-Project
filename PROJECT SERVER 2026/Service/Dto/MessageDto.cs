using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class MessageDto
    {
        public int Id { get; set; }

        public int ServiceCallId { get; set; }

        public int SenderId { get; set; }

        public string? Content { get; set; }

        public string? AttachmentUrl { get; set; }

        public DateTime SentAt { get; set; }
    }
}
