using Service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface ILogin
    {
       public Task<UserDto> Login(UserLoginDto user);

    }
}
