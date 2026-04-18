using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        public int ExpertProfileId { get; set; } // קישור לפרופיל המומחה עליו נכתבה הביקורת

        [ForeignKey("ExpertProfileId")]
        public ExpertProfile ExpertProfile { get; set; }

        public int ClientId { get; set; }//קישור למשתמש שכתב את הביקורת
        [ForeignKey("ClientId")]
        public User Client { get; set; }

        public int Rating { get; set; } // ערך בין 1 ל-5
        public string Comment { get; set; } // תוכן הביקורת

        public DateTime CreatedAt { get; set; }
    }
}
