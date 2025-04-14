namespace RecipePlatform.Core.Entities;

public class Post : BaseEntity
{
    public string Description { get; set; } = default!;
    public int Likes { get; set; } = default!;
    public Guid AuthorId { get; set; } // Added missing property
    public Guid RecipeId { get; set; } // Added missing property
    public User Author { get; set; } = null!;
    public Recipe Recipe { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}