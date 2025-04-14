namespace RecipePlatform.Core.Entities;

public class Comment : BaseEntity
{
    public Post Post { get; set; } = null!;
    public Guid PostId { get; set; }
    public User Author { get; set; } = null!;
    public Guid AuthorId { get; set; }
    public string CommentText { get; set; } = default!;
    
}