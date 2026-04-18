using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string City { get; set; }

        // האם המשתמש נרשם גם כמומחה
        public bool IsExpert { get; set; }

        // קשר לפרטי המומחה (במידה והוא כזה)
        public ExpertProfile ExpertProfile { get; set; }

        public string ProfileUrl { get; set; }

        public bool IsActive {  get; set; }

        public bool IsAdmin {  get; set; }
    }
}
