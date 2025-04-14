using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipePlatform.Core.Entities;
using RecipePlatform.Core.Constants;
namespace RecipePlatform.Infrastructure.EntityConfigurations;

public class IngredientConfiguration : IEntityTypeConfiguration<Ingredient>
{
    public void Configure(EntityTypeBuilder<Ingredient> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property((e => e.Name)).HasMaxLength(MagicNumber.NameLength).IsRequired();
        builder.HasAlternateKey(e => e.Name);
        builder.Property(e => e.Id).IsRequired();
        builder.Property(e => e.Description).HasMaxLength(MagicNumber.DescriptionLength).IsRequired();
    }
}