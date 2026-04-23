using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class ReviewDto
    {
        public int ExpertProfileId { get; set; }
        public int ClientId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
