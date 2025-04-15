namespace RecipePlatform.Core.DataTransferObjects;

public class RecipeDTO
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public Guid AuthorId { get; set; }
    public ICollection<IngredientDTO> Ingredients { get; set; }
}