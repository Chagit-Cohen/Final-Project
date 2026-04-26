using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public int ServiceCallId { get; set; }// קישור לקריאה שאליה שייכת ההודעה
        [ForeignKey("ServiceCallId")]
        public ServiceCall? ServiceCall { get; set; }

        public int SenderId { get; set; } // מזהה השולח
        public string? Content { get; set; }// תוכן ההודעה
        public string? AttachmentUrl { get; set; } // תמונה שנשלחה בצ'אט
        public DateTime SentAt { get; set; }
    }
}
