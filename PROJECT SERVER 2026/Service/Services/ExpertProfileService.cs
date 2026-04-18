using AutoMapper;
using Repository.Interfaces;
using Repository.Models;
using Service.Dto;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ExpertProfileService : IService<ExpertProfileDto>
    {
        private readonly IRepository<ExpertProfile> expertRepository;
        private readonly IRepository<User> userRepository;
        private readonly IMapper mapper;

        public ExpertProfileService(IRepository<ExpertProfile> expertRepository, IRepository<User> userRepository, IMapper mapper)
        {
            this.expertRepository = expertRepository;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        public async Task<ExpertProfileDto> AddItem(ExpertProfileDto item)
        {
            User user = await userRepository.GetById(item.UserId);
            if (user == null) return null;

            user.IsExpert = true;
            await userRepository.UpdateItem(user.Id, user);

            ExpertProfile profile = mapper.Map<ExpertProfileDto, ExpertProfile>(item);
            profile.AverageRating = 0;
            profile.NumberOfRaiting = 0;

            await expertRepository.AddItem(profile);

            return mapper.Map<ExpertProfile, ExpertProfileDto>(profile);
        }

        public async Task DeleteItem(int id)
        {
            ExpertProfile ep = await expertRepository.GetById(id);
            if (ep != null)
            {
                ep.User.IsExpert = false;

                await userRepository.UpdateItem(ep.User.Id, ep.User);

            }


        }

        public async Task<List<ExpertProfileDto>> GetAll()
        {
            List < ExpertProfile > list= await expertRepository.GetAll();
            return mapper.Map<List<ExpertProfile>, List<ExpertProfileDto>>(list);
        }

        public async Task<ExpertProfileDto> GetById(int id)
        {
            ExpertProfile ep = await expertRepository.GetById(id);
            return mapper.Map<ExpertProfile, ExpertProfileDto>(ep);
        }

        public async Task UpdateItem(int id, ExpertProfileDto item)
        {
            ExpertProfile ep = mapper.Map<ExpertProfileDto, ExpertProfile>(item);
            await expertRepository.UpdateItem(id, ep);
        }

        public async Task AddReviewRating(int idExpert, int rating)
        {
            ExpertProfile ep = await expertRepository.GetById(idExpert);

            // הגדלת כמות דירוגים
            ep.NumberOfRaiting += 1;

            // עדכון ממוצע
            ep.AverageRating = ((ep.AverageRating * (ep.NumberOfRaiting - 1)) + rating) / ep.NumberOfRaiting;

            await expertRepository.UpdateItem(idExpert, ep);
        }
    }
}
