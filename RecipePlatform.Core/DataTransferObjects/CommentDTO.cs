namespace RecipePlatform.Core.DataTransferObjects;

public class CommentDTO
{
    public Guid Id { get; set; }
    public string CommentText { get; set; } = null!;
    public Guid AuthorId { get; set; } // Added missing property
    public Guid PostId { get; set; } // Added missing property
}