//using Service.Dto;
//using Service.Interfaces;
//using Repository.Interfaces;
//using Repository.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;
//using Repository.Repositories;

//namespace Service.Services
//{
//    public class UserService:IService<UserDto>
//    {
//        private readonly IRepository<User> repository;
//        private readonly IMapper mapper;

//        public UserService(IRepository<User> repository, IMapper map)
//        {
//            this.repository = repository;
//            this.mapper = map;
//        }
//        public async Task<UserDto> AddItem(UserDto item)
//        {

//            User user = mapper.Map<UserDto, User>(item);

//            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(item.Password);
//            user.IsActive = true;
//            user.IsExpert = false;
//            user.IsAdmin = false;

//            if (item.ProfileImage != null)
//            {
//                var filePath = Path.Combine(
//                    Directory.GetCurrentDirectory(),
//                    "wwwroot//Images//",
//                    item.ProfileImage.FileName
//                );

//                using (var stream = new FileStream(filePath, FileMode.Create))
//                {
//                    await item.ProfileImage.CopyToAsync(stream);
//                }
//                user.ProfileUrl = item.ProfileImage.FileName;

//            }
//            else
//            {
//                user.ProfileUrl = "default.png";
//            }


//             await repository.AddItem(user);

//             return mapper.Map<User, UserDto>(user);

//        }

//        public async Task DeleteItem(int id)
//        {
//            User u = await repository.GetById(id);
//            if (u != null)
//            {
//                u.IsActive = false;
//                await repository.UpdateItem(u.Id, u);

//            }
//        }


//         public async Task<List<UserDto>> GetAll()
//         {
//             List<User> users = await repository.GetAll();
//             return mapper.Map<List<UserDto>>(users);
//         }


//        public async Task<UserDto> GetById(int id)
//        {
//            return mapper.Map<User, UserDto>(await repository.GetById(id));
//        }

//        public async Task UpdateItem(int id, UserDto item)
//        {
//            User user = await repository.GetById(id);

//            user.FullName = item.FullName;
//            user.Email = item.Email;
//            user.City = item.City;

//            if (!string.IsNullOrEmpty(item.Password))
//            {
//                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(item.Password);
//            }

//            if (item.ProfileImage != null)
//            {
//                var filePath = Path.Combine(
//                    Directory.GetCurrentDirectory(),
//                    "wwwroot//Images//",
//                    item.ProfileImage.FileName
//                );

//                using (var stream = new FileStream(filePath, FileMode.Create))
//                {
//                    await item.ProfileImage.CopyToAsync(stream);
//                }

//                user.ProfileUrl = item.ProfileImage.FileName;
//            }

//            await repository.UpdateItem(id, user);
//        }

//    }
//}



using Service.Dto;
using Service.Interfaces;
using Repository.Interfaces;
using Repository.Models;
using AutoMapper;

namespace Service.Services
{
    public class UserService : IService<UserDto>
    {
        private readonly IRepository<User> repository;
        private readonly IMapper mapper;

        public UserService(IRepository<User> repository, IMapper map)
        {
            this.repository = repository;
            this.mapper = map;
        }

        public async Task<UserDto> AddItem(UserDto item)
        {
            
            if (item.Password.Length < 6)
                throw new Exception("הסיסמה חייבת להכיל לפחות 6 תווים");

            //if (!item.Email.Contains("@"))
            //    throw new Exception("פורמט האימייל אינו תקין");

            List<User> users = await repository.GetAll();

            if (users.Any(x => x.Email == item.Email))
                throw new Exception("האימייל כבר קיים במערכת");

            User user = mapper.Map<UserDto, User>(item);

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(item.Password);
            user.IsActive = true;
            user.IsExpert = false;
            user.IsAdmin = false;

            if (item.ProfileImage != null)
            {
                var filePath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot//Images//",
                    item.ProfileImage.FileName
                );

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await item.ProfileImage.CopyToAsync(stream);
                }

                user.ProfileUrl = item.ProfileImage.FileName;
            }
            else
            {
                user.ProfileUrl = "default.png";
            }

            await repository.AddItem(user);

            return mapper.Map<User, UserDto>(user);
        }

        public async Task DeleteItem(int id)
        {
            User u = await repository.GetById(id);

            if (u == null)
                throw new Exception("המשתמש לא נמצא");

            u.IsActive = false;
            await repository.UpdateItem(u.Id, u);
        }

        public async Task<List<UserDto>> GetAll()
        {
            List<User> users = await repository.GetAll();
            return mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto> GetById(int id)
        {
            User u = await repository.GetById(id);

            if (u == null)
                throw new Exception("המשתמש לא נמצא");
            return mapper.Map<User, UserDto>(u);
        }

        public async Task UpdateItem(int id, UserDto item)
        {
            
            User user = await repository.GetById(id);
            user.FullName = item.FullName;
            user.City = item.City;


            if (item.ProfileImage != null)
            {
                var filePath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot//Images//",
                    item.ProfileImage.FileName
                );

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await item.ProfileImage.CopyToAsync(stream);
                }

                user.ProfileUrl = item.ProfileImage.FileName;
            }

            await repository.UpdateItem(id, user);
        }
    }
}