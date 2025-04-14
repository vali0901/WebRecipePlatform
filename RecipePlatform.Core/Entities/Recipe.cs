namespace RecipePlatform.Core.Entities;

public class Recipe : BaseEntity
{
    public string Description { get; set; } = default!;
    public ICollection<Ingredient> Ingredients { get; set; } = null!;
    public User Author { get; set; } = default!;
    public Guid AuthorId { get; set; }
}