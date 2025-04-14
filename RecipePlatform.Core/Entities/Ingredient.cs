namespace RecipePlatform.Core.Entities;

public class Ingredient : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
}