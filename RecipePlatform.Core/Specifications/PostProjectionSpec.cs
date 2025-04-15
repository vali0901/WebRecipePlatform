using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Core.Specifications;

public class PostProjectionSpec : Specification<Post, PostDTO>
{
    public PostProjectionSpec(bool orderByCreatedAt = false) => Query.Select(p => new PostDTO
    {
        Id = p.Id,
        Description = p.Description,
        Likes = p.Likes,
        Author = new UserDTO
        {
            Id = p.Author.Id,
            Name = p.Author.Name,
            Email = p.Author.Email
        },
        Recipe = new RecipeDTO
        {
            Id = p.Recipe.Id,
            Description = p.Recipe.Description,
            Ingredients = p.Recipe.Ingredients.Select(i => new IngredientDTO
            {
                Id = i.Id,
                Name = i.Name
            }).ToList()
        },
        Comments = p.Comments.Select(c => new CommentDTO
        {
            Id = c.Id,
            AuthorId = c.AuthorId,
            CommentText = c.CommentText
        }).ToList()
    });
    
    public PostProjectionSpec(string? search) : this(true) // This constructor will call the first declared constructor with 'true' as the parameter. 
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Description, searchExpr)); // This is an example on how database specific expressions can be used via C# expressions.
        // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }
    
    public PostProjectionSpec(string? search, Guid userId) : this(true) // This constructor will call the first declared constructor with 'true' as the parameter. 
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;
        
        Query.Where(e => e.AuthorId == userId);
        
        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Description, searchExpr)); // This is an example on how database specific expressions can be used via C# expressions.
        // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }
}