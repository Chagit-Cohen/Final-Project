using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Interfaces;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly IContext context;
        public UserRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<User> AddItem(User user)
        {

            await context.users.AddAsync(user);
            context.save();
            return user;
        }

        public async Task DeleteItem(int id)
        {
          
            throw new NotImplementedException();

        }

        public async Task<List<User>> GetAll()
        {
            return await context.users.Where(x=>x.IsActive==true).ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await context.users.FirstOrDefaultAsync(x => x.Id == id&&x.IsActive==true);

        }

        public async Task UpdateItem(int id, User item)
        {
            User u =await GetById(id);
            if (u != null)
            {
                u.FullName = item.FullName;
                u.Email = item.Email;
                u.City = item.City;
                u.IsExpert = item.IsExpert;
                u.ProfileUrl = item.ProfileUrl;
                u.PasswordHash = item.PasswordHash;
                context.save();
            }

        }
       
    }
}
