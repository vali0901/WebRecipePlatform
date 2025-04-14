namespace RecipePlatform.Core.DataTransferObjects;

public class PostUpdateDTO
{
    public Guid Id { get; set; }
    public string Description { get; set; } = null!;
    public Guid RecipeId { get; set; }
}