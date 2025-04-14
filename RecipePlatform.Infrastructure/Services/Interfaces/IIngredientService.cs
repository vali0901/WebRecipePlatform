using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Responses;
using System;
using System.Threading;
using System.Threading.Tasks;
using RecipePlatform.Core.Requests;

namespace RecipePlatform.Infrastructure.Services.Interfaces;

public interface IIngredientService
{
    Task<ServiceResponse> AddIngredient(IngredientAddDTO ingredientDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse<IngredientDTO>> GetIngredient(Guid id, CancellationToken cancellationToken = default);

    Task<ServiceResponse<PagedResponse<IngredientDTO>>> GetIngredients(PaginationSearchQueryParams pagination,
        CancellationToken cancellationToken = default);

    Task<ServiceResponse> UpdateIngredient(IngredientUpdateDTO ingredientDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse> DeleteIngredient(Guid id, CancellationToken cancellationToken = default);
}