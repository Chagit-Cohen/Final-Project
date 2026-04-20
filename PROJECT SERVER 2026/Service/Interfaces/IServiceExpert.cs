using Service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
   
        public interface IServiceExpert<T>
        {
            Task<List<T>> GetAll();
            Task<T> GetById(int id);

            Task<T> AddItem(T item);

            Task UpdateItem(int id, ExpertProfileDto item);

            Task DeleteItem(int id);
        }
    
}
