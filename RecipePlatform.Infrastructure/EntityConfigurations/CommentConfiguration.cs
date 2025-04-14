using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Infrastructure.EntityConfigurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.Property(e => e.Id).ValueGeneratedNever();
        builder.Property(e => e.CommentText).IsRequired();
        builder.HasOne(e => e.Author).WithMany(e => e.Comments).HasForeignKey(e => e.AuthorId).HasPrincipalKey(e => e.Id).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(e => e.Post).WithMany(e => e.Comments).HasForeignKey(e => e.PostId).OnDelete(DeleteBehavior.Restrict);
    }
}