using RecipePlatform.Core.Entities;

namespace RecipePlatform.Core.DataTransferObjects;

public class PostDTO
{
    public Guid Id { get; set; }
    public string Description { get; set; } = null!;
    public int Likes { get; set; }
    public Guid AuthorId { get; set; } // Added missing property
    public Guid RecipeId { get; set; } // Added missing property
    public UserDTO Author { get; set; } = null!;
    public RecipeDTO Recipe { get; set; } = null!;
    public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
}