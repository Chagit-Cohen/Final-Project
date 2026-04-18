//using Repository.Interfaces;
//using Service.Dto;
//using Service.Interfaces;
//using Repository.Models;

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;

//namespace Service.Services
//{
//    public class UserLoginService : ILogin
//    {
//        private readonly IRepository<User> repository;
//        private readonly IMapper mapper;
//        public UserLoginService(IRepository<User> repository, IMapper mapper)
//        {
//            this.repository = repository;
//            this.mapper = mapper;
//        }
//        public async Task<UserDto> Login(UserLoginDto user)
//        {
//            List<User> users = await repository.GetAll();

//            User existingUser = users.FirstOrDefault(x => x.Email == user.Email);

//            if (existingUser == null)
//                return null;

//            bool isValid = BCrypt.Net.BCrypt.Verify(user.Password, existingUser.PasswordHash);

//            if (!isValid)
//                return null;

//            return mapper.Map<User, UserDto>(existingUser);
//        }


//    }
//}
using Repository.Interfaces;
using Service.Dto;
using Service.Interfaces;
using Repository.Models;
using AutoMapper;

namespace Service.Services
{
    public class UserLoginService : ILogin
    {
        private readonly IRepository<User> repository;
        private readonly IMapper mapper;

        public UserLoginService(IRepository<User> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<UserDto> Login(UserLoginDto user)
        {

            List<User> users = await repository.GetAll();

            User existingUser = users.FirstOrDefault(x => x.Email == user.Email);

            
            if (existingUser == null)
                throw new Exception("האימייל לא קיים במערכת");

            bool isValid = BCrypt.Net.BCrypt.Verify(user.Password, existingUser.PasswordHash);

            
            if (!isValid)
                throw new Exception("הסיסמה שגויה");

            
            if (!existingUser.IsActive)
                throw new Exception("המשתמש אינו פעיל/נמחק אנא הירשם שוב");

            return mapper.Map<User, UserDto>(existingUser);
        }
    }
}