using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipePlatform.Core.Constants;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Infrastructure.EntityConfigurations;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.Description).HasMaxLength(MagicNumber.DescriptionLength).IsRequired(false);
        builder.Property(e => e.Likes).HasDefaultValue(0);
        builder.HasOne(e => e.Author).WithMany(e => e.Posts).HasForeignKey(e => e.AuthorId).HasPrincipalKey(e => e.Id).OnDelete(DeleteBehavior.Restrict);
    }
}