using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class ServiceCall
    {
        [Key]
        public int Id { get; set; }

        public int ClientId { get; set; }// קישור למשתמש שיצר את הקריאה
        [ForeignKey("ClientId")]
        public User Client { get; set; }

        public int ExpertId { get; set; }//קישור למומחה שהוקצה לקריאה 
        [ForeignKey("ExpertId")]
        public ExpertProfile Expert { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }

        public string? InitialImageUrl { get; set; } // URL לתמונה 

        public string Status { get; set; }  // סטטוס הקריאה למשל: "פתוחה", "בתהליך", "נסגרה
        public DateTime CreatedAt { get; set; }

        public List<Message> Messages { get; set; } // רשימת ההודעות שקשורות לקריאה
    }
}
