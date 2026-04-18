using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Repository.Interfaces
{
    public interface IContext
    {
        DbSet<User> users { get; set; }
        DbSet<Message> messages { get; set; }
        DbSet<ExpertProfile> expertProfiles { get; set; }
        DbSet<ServiceCall> serviceCalls { get; set; }
        DbSet<Review> reviews { get; set; }

        public void save();



    }
}
