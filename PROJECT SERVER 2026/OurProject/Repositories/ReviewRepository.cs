
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
    public class ReviewRepository : IRepositoryReview<Review>
    {
        private readonly IContext context;

        public ReviewRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Review> AddItem(Review item)
        {
            await context.reviews.AddAsync(item);
            context.save();
            return item;
        }

        public async Task<List<Review>> GetByExpertId(int expertId)
        {
            return await context.reviews
                .Include(r => r.Client)
                .Where(r => r.ExpertProfileId == expertId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
    }
}