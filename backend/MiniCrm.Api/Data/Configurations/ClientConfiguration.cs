using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Data.Configurations
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.ToTable("Clients");

            builder.HasKey(c => c.Id);

            builder.HasIndex(c => c.PhoneNumber)
                .IsUnique();

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.Property(c => c.PhoneNumber)
                .IsRequired()
                .HasColumnType("VARCHAR(16)");

            builder.Property(c => c.IsActive)
               .HasColumnType("BOOLEAN")
               .HasDefaultValue(true);

            builder.Property(c => c.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Property(c => c.LastMessageAt)
                .IsRequired(false);
        }
    }
}