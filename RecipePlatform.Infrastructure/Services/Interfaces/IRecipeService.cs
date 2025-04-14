using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Responses;
using System;
using System.Threading;
using System.Threading.Tasks;
using RecipePlatform.Core.Requests;

namespace RecipePlatform.Infrastructure.Services.Interfaces;

public interface IRecipeService
{
    Task<ServiceResponse> AddRecipe(RecipeAddDTO recipeDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse<RecipeDTO>> GetRecipe(Guid id, CancellationToken cancellationToken = default);
    
    Task<ServiceResponse<PagedResponse<RecipeDTO>>> GetRecipes(PaginationSearchQueryParams pagination,
        CancellationToken cancellationToken = default);
    Task<ServiceResponse> UpdateRecipe(RecipeUpdateDTO recipeDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse> DeleteRecipe(Guid id, CancellationToken cancellationToken = default);
}