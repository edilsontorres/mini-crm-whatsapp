using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Data.Configurations
{
    public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
    {
        public void Configure(EntityTypeBuilder<Conversation> builder)
        {
            builder.ToTable("Conversations");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.AssignedAt)
                .IsRequired(false);

            builder.Property(c => c.StartedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Property(c => c.FinishedAt)
                .IsRequired(false);

            builder.Property(c => c.Status)
                .HasConversion<int>() // Armazena como int no banco
                .HasDefaultValue(ConversationStatus.Open);

            builder.HasOne(c => c.Client)
                .WithMany(c => c.Conversations)
                .HasForeignKey(c => c.ClientId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(c => c.User)
                .WithMany(u => u.Conversations)
                .HasForeignKey(c => c.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}