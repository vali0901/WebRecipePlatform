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

public class IngredientService : IIngredientService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public IngredientService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse> AddIngredient(IngredientAddDTO ingredientDto, CancellationToken cancellationToken = default)
    {
        var ingredient = new Ingredient
        {
            Name = ingredientDto.Name,
            Description = ingredientDto.Description
        };

        await _repository.AddAsync(ingredient, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<IngredientDTO>> GetIngredient(Guid id, CancellationToken cancellationToken = default)
    {
        var ingredient = await _repository.GetAsync(new IngredientSpec(id), cancellationToken);

        return (ServiceResponse<IngredientDTO>)(ingredient != null
            ? ServiceResponse<IngredientDTO>.ForSuccess(ingredient)
            : ServiceResponse<IngredientDTO>.FromError(new(HttpStatusCode.NotFound, "Ingredient not found.")));
    }
    
    public async Task<ServiceResponse<PagedResponse<IngredientDTO>>> GetIngredients(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new IngredientProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateIngredient(IngredientUpdateDTO ingredientDto, CancellationToken cancellationToken = default)
    {
        var ingredient = await _repository.GetAsync(new IngredientSpec(ingredientDto.Id), cancellationToken);

        if (ingredient == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Ingredient not found."));
        }

        ingredient.Name = ingredientDto.Name ?? ingredient.Name;
        ingredient.Description = ingredientDto.Description ?? ingredient.Description;

        await _repository.UpdateAsync(ingredient, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
    
    

    public async Task<ServiceResponse> DeleteIngredient(Guid id, CancellationToken cancellationToken = default)
    {
        var ingredient = await _repository.GetAsync(new IngredientSpec(id), cancellationToken);

        if (ingredient == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Ingredient not found."));
        }

        await _repository.DeleteAsync<Ingredient>(ingredient.Id, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
}