using RecipePlatform.Core.Entities;
using RecipePlatform.Core.Enums;

namespace RecipePlatform.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class UserDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public UserRoleEnum Role { get; set; }
    public ICollection<UserDTO> Following { get; set; } = null!;
    public ICollection<PostDTO> Posts { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; } = null!;
    public ICollection<RecipeDTO> Recipes { get; set; } = null!;
}
