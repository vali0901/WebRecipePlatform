namespace RecipePlatform.Core.DataTransferObjects;

public class CommentUpdateDTO
{
    public Guid Id { get; set; }
    public string CommentText { get; set; } = null!;
}