using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class DataBase : DbContext, IContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Message> messages { get; set; }
        public DbSet<ExpertProfile> expertProfiles { get; set; }
        public DbSet<ServiceCall> serviceCalls { get; set; }
        public DbSet<Review> reviews { get; set; }

        public void save()
        {
            SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=.;Database=MyProjectDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Client)
                .WithMany()
                .HasForeignKey(r => r.ClientId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ServiceCall>()
                .HasOne(s => s.Client)
                .WithMany()
                .HasForeignKey(s => s.ClientId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ServiceCall>()
               .HasOne(s => s.Expert)
               .WithMany()
               .HasForeignKey(s => s.ExpertId)
               .HasPrincipalKey(e => e.UserId)
               .OnDelete(DeleteBehavior.NoAction);
           
            modelBuilder.Entity<User>()
               .HasIndex(u => u.Email)
               .IsUnique();

            modelBuilder.Entity<ExpertProfile>()
           .HasAlternateKey(e => e.UserId);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.ExpertProfile)
                .WithMany(e => e.Reviews)
                .HasForeignKey(r => r.ExpertProfileId)
                .HasPrincipalKey(e => e.UserId);   


        }
    }
}
