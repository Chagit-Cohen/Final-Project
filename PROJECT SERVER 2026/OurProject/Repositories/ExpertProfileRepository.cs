using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ExpertProfileRepository : IRepositoryExpert<ExpertProfile>
    {
        private readonly IContext context;

        public ExpertProfileRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<List<ExpertProfile>> GetAll()
        {
            return await context.expertProfiles
                .Include(ep => ep.User) // חשוב! כדי שנדע מי המומחה (שם, אימייל וכו')
                .Where(x => x.User.IsActive && x.User.IsExpert)
                .ToListAsync();
        }
      
        public async Task<ExpertProfile> GetById(int id)
        {
            return await context.expertProfiles
                .Include(ep => ep.User)
                 .Where(x => x.User.IsActive && x.User.IsExpert)
                .FirstOrDefaultAsync(x => x.UserId == id);
        }

        public async Task<ExpertProfile> AddItem(ExpertProfile item)
        {
            await context.expertProfiles.AddAsync(item);
             context.save();
            return item;
        }

        public async Task UpdateItem(int id, ExpertProfile item)
        {
            ExpertProfile ep = await context.expertProfiles
                    .FirstOrDefaultAsync(x => x.UserId == id);
            if (ep != null)
            {
                // עדכון השדות המקצועיים 
                ep.Category = item.Category;
                ep.Bio = item.Bio;
                ep.BasePrice = item.BasePrice;
                //דירוג
                ep.NumberOfRaiting = item.NumberOfRaiting;
                ep.AverageRating = item.AverageRating;
                 context.save();
            }
        }


        public async Task DeleteItem(int id)
        {
         
            throw new NotImplementedException();

        }
        public async Task<ExpertProfile> GetByIdJustToTheUser(int id)
        {
            return await context.expertProfiles
                .Include(ep => ep.User)
                .FirstOrDefaultAsync(x => x.UserId == id && x.User.IsActive);
        }
    }
}
