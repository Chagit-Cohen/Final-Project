using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace Service.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string City { get; set; }
        public bool IsExpert { get; set; }
        public IFormFile? ProfileImage { get; set; }
        public string? ProfileUrl { get; set; }
        public bool IsAdmin { get; set; }



    }
}
