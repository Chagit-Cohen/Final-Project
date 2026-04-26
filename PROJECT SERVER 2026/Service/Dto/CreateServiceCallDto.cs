using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class CreateServiceCallDto
    {
        public int ClientId { get; set; }

        public int ExpertId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string? InitialImageUrl { get; set; }
    }
}
