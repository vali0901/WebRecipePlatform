namespace RecipePlatform.Core.DataTransferObjects;

public class PostAddDTO
{
    public string Description { get; set; } = null!;
    public Guid AuthorId { get; set; }
    public Guid RecipeId { get; set; }
}