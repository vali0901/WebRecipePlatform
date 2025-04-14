using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Core.Specifications;

public class IngredientProjectionSpec : Specification<Ingredient, IngredientDTO>
{
    public IngredientProjectionSpec(bool orderByCreatedAt = false) =>
    Query.Select(e => new IngredientDTO
    {
        Id = e.Id,
        Name = e.Name,
        Description = e.Description
    }).OrderByDescending(o => o.CreatedAt, orderByCreatedAt);
    public IngredientProjectionSpec(string? search) : this(true) // This constructor will call the first declared constructor with 'true' as the parameter. 
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr)); // This is an example on how database specific expressions can be used via C# expressions.
        // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }
}