using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class ExpertProfileDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string FullName { get; set; }   // מגיע מ-User

        public string Category { get; set; }

        public string Bio { get; set; }

        public double BasePrice { get; set; }

        public double AverageRating { get; set; }

        public int NumberOfRaiting { get; set; }

        public string City {  get; set; }//מגיע מיוזר

        public string ProfileUrl { get; set; }//מגיע מיוזר

    }
}
