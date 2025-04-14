namespace RecipePlatform.Core.DataTransferObjects;

public class IngredientDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}