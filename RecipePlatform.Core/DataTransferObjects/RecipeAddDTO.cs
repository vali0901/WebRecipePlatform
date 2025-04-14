namespace RecipePlatform.Core.DataTransferObjects;

public class RecipeAddDTO
{
    public string Description { get; set; } = null!;
    public ICollection<Guid> IngredientIds { get; set; } = new List<Guid>();
    public Guid AuthorId { get; set; }
}