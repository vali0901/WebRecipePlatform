using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Entities;
using RecipePlatform.Core.Specifications;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using RecipePlatform.Core.Requests;
using RecipePlatform.Core.Responses;
using RecipePlatform.Infrastructure.Database;
using RecipePlatform.Infrastructure.Repositories.Interfaces;
using RecipePlatform.Infrastructure.Services.Interfaces;

namespace RecipePlatform.Infrastructure.Services.Implementations;

public class RecipeService : IRecipeService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public RecipeService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse> AddRecipe(RecipeAddDTO recipeDto, CancellationToken cancellationToken = default)
    {   var ingredients = new List<Ingredient>();
        foreach (var ingredientId in recipeDto.IngredientIds) {
            var ingredient = await _repository.GetAsync<Ingredient>(ingredientId, cancellationToken);
            if (ingredient == null)
                throw new KeyNotFoundException();
            ingredients.Add(ingredient);
        };
        var recipe = new Recipe
        {
            Description = recipeDto.Description,
            Ingredients = ingredients,
            AuthorId = recipeDto.AuthorId
        };

        await _repository.AddAsync(recipe, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<RecipeDTO>> GetRecipe(Guid id, CancellationToken cancellationToken = default)
    {
        var recipe = await _repository.GetAsync(new RecipeSpec(id), cancellationToken);

        return (ServiceResponse<RecipeDTO>)(recipe != null
            ? ServiceResponse<RecipeDTO>.ForSuccess(new RecipeDTO
            {
                Id = recipe.Id,
                Description = recipe.Description,
                Ingredients = recipe.Ingredients.Select(i => new IngredientDTO
                {
                    Id = i.Id,
                    Name = i.Name,
                    Description = i.Description
                }).ToList()
            })
            : ServiceResponse<RecipeDTO>.FromError(new(HttpStatusCode.NotFound, "Recipe not found.")));
    }
    
    public async Task<ServiceResponse<PagedResponse<RecipeDTO>>> GetRecipes(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new RecipeProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateRecipe(RecipeUpdateDTO recipeDto, CancellationToken cancellationToken = default)
    {
        var recipe = await _repository.GetAsync(new RecipeSpec(recipeDto.Id), cancellationToken);

        if (recipe == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Recipe not found."));
        }

        recipe.Description = recipeDto.Description;
        recipe.Ingredients = recipeDto.IngredientIds.Select(id => new Ingredient { Id = id }).ToList();

        await _repository.UpdateAsync(recipe, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteRecipe(Guid id, CancellationToken cancellationToken = default)
    {
        var recipe = await _repository.GetAsync(new RecipeSpec(id), cancellationToken);

        if (recipe == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Recipe not found."));
        }

        await _repository.DeleteAsync<Recipe>(recipe.Id, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
}