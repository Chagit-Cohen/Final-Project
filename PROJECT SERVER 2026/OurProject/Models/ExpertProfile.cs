using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class ExpertProfile
    {
        public int Id { get; set; }
        public int UserId { get; set; } // קישור למשתמש שמייצג את המומחה 
        [ForeignKey("UserId")]
        public User User { get; set; }

        public string Category { get; set; } // קטגוריה: חשמל, אינסטלציה וכו
        public string Bio { get; set; }//תיאור קצר על המומחה
        public double BasePrice { get; set; }
        public double AverageRating { get; set; }//דירוג ממוצע מחושב מביקורות

        public int NumberOfRaiting {  get; set; }
        public List<Review> Reviews { get; set; }

    }
}
