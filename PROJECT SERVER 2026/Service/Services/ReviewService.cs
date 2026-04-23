using AutoMapper;
using Repository.Interfaces;
using Repository.Models;
using Repository.Repositories;
using Service.Dto;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ReviewService : IServiceReview<ReviewDto>
    {
        private readonly IRepositoryReview<Review> reviewRepository;
        private readonly IServiceExpert<ExpertProfileDto> expertService;
        private readonly IMapper mapper;

        public ReviewService(IRepositoryReview<Review> reviewRepository,IServiceExpert<ExpertProfileDto> expertService,IMapper mapper)
        {
            this.reviewRepository = reviewRepository;
            this.expertService = expertService;
            this.mapper = mapper;
        }

        public async Task<ReviewDto> AddItem(ReviewDto item)
        {
            Review review = mapper.Map<ReviewDto, Review>(item);
            review.CreatedAt = DateTime.Now;

            Review newReview = await reviewRepository.AddItem(review);

            await expertService.AddReviewRating(item.ExpertProfileId, item.Rating);

            return mapper.Map<Review, ReviewDto>(newReview);
        }

        public async Task<List<ReviewDto>> GetByExpertId(int expertId)
        {
            List<Review> reviews = await reviewRepository.GetByExpertId(expertId);
            return mapper.Map<List<Review>, List<ReviewDto>>(reviews);
        }
    }
}