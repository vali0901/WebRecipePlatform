using Ardalis.Specification;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Core.Specifications;

public class IngredientSpec : Specification<Ingredient>
{
    public IngredientSpec(Guid id) => Query.Where(e => e.Id == id);
}