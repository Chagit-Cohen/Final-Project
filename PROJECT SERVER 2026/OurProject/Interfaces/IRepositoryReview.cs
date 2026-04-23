using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepositoryReview<T>
    {
        Task<T> AddItem(T item);
        Task<List<T>> GetByExpertId(int expertId);
    }
}
