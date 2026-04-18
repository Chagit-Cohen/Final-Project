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
    public class ReviewRepository
    {
        private readonly IContext context;

        public ReviewRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Review> AddItem(Review review)
        {
            await context.reviews.AddAsync(review);
            context.save();
            return review;
        }

        public async Task<List<Review>> GetAll()
        {
            return await context.reviews
                .Include(r=>r.Client) .Include(x=>x.ExpertProfile)//  מי כתב את הביקורת ולמי נכתבה
                .ToListAsync();
        }

        public async Task<Review> GetById(int id)
        {
            return await context.reviews.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Review>> GetByExpertId(int expertId)
        {
            return await context.reviews
                .Where(r => r.ExpertProfileId == expertId) // כאן קורה הסינון שחיפשת!
                .Include(r => r.Client) // כדי שנראה את השם של מי שכתב את הביקורת
                .ToListAsync();
        }
        public async Task<List<Review>> GetByClientId(int userId)
        {
            return await context.reviews
                .Where(r => r.ClientId == userId) // כאן קורה הסינון שחיפשת!
                .Include(r => r.ExpertProfile) // כדי שנראה את השם של מי שכתבתי עליו את הביקורת
                .ToListAsync();
        }

        public async Task DeleteItem(int id)
        {
            var r = await context.reviews.FirstOrDefaultAsync(x => x.Id == id);
            if (r != null)
            {
                context.reviews.Remove(r);
                 context.save();
            }
        }

        public Task UpdateItem(int id, Review item)
        {
            throw new NotImplementedException();
        }
    }
}
