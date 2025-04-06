using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Data
{
    public class MiniCrmContext : DbContext
    {
        public MiniCrmContext(DbContextOptions<MiniCrmContext> options) : base(options)
        {
        }

        public DbSet<User> Users {get; set;}
        public DbSet<Conversation> Conversations {get; set;}
        public DbSet<Message> Messages {get; set;}

        //registrando configuraçoes do Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MiniCrmContext).Assembly);
        }

    }
}