using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RecipePlatform.Core.Entities;


public class RecipeSpec : Specification<Recipe>
{
    public RecipeSpec(Guid Id) => Query.Where(e => e.Id == Id);
}