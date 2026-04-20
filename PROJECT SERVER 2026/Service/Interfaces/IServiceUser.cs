using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Dto;

namespace Service.Interfaces
{
    public interface IServiceUser<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);

        Task<T> AddItem(T item);

        Task UpdateItem(int id, UserUpdateDto item);

        Task DeleteItem(int id);
    }
}
