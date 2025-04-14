using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Infrastructure.EntityConfigurations;

public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.Description).IsRequired(false);
        builder.HasMany(e => e.Ingredients).WithMany();
        builder.HasOne(e => e.Author).WithMany(e => e.Recipes).HasForeignKey(e => e.AuthorId);
    }
}