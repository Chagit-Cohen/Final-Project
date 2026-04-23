using AutoMapper;
using Service.Dto;
//using Service.Interfaces;
//using Repository.Interfaces;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class MyMapper:Profile
    {
        public MyMapper()
        {
            CreateMap<ExpertProfile, ExpertProfileDto>()
              .ForMember(dest => dest.FullName,
              opt => opt.MapFrom(src => src.User.FullName))
           .ForMember(dest => dest.City,
            opt => opt.MapFrom(src => src.User.City))
           .ForMember(dest => dest.ProfileUrl,
            opt => opt.MapFrom(src => src.User.ProfileUrl));
            CreateMap<ExpertProfileDto, ExpertProfile>();

            

            CreateMap<Review, ReviewDto>()
                 .ForMember(dest => dest.ClientName,
            opt => opt.MapFrom(src => src.Client.FullName));
            CreateMap<ReviewDto, Review>();



            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>()
                .ForMember("ProfileUrl",
                    x => x.MapFrom(y => y.ProfileImage != null ? y.ProfileImage.FileName : null));


        }
    }
}
