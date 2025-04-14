namespace RecipePlatform.Core.DataTransferObjects;

public class CommentAddDTO
{
    public string CommentText { get; set; } = null!;
    public Guid AuthorId { get; set; }
    public Guid PostId { get; set; }
}