namespace RecipePlatform.Core.DataTransferObjects;

public class RecipeUpdateDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public ICollection<Guid> IngredientIds { get; set; } = new List<Guid>();
}