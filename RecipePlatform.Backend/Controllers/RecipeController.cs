using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Requests;
using RecipePlatform.Core.Responses;
using RecipePlatform.Infrastructure.Authorization;
using RecipePlatform.Infrastructure.Services.Implementations;
using RecipePlatform.Infrastructure.Services.Interfaces;
namespace RecipePlatform.Backend.Controllers;

/// <summary>
/// Controller for managing recipes, providing CRUD operations.
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class RecipeController(IUserService userService, IRecipeService recipeService) : AuthorizedController(userService)
{
    /// <summary>
    /// Retrieves a recipe by its ID.
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<RecipeDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await recipeService.GetRecipe(id)) :
            ErrorMessageResult<RecipeDTO>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<RecipeDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await recipeService.GetRecipes(pagination, currentUser.Result)) :
            ErrorMessageResult<PagedResponse<RecipeDTO>>(currentUser.Error);
    }

    /// <summary>
    /// Adds a new recipe.
    /// </summary>
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] RecipeAddDTO recipe)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await recipeService.AddRecipe(recipe)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Updates an existing recipe.
    /// </summary>
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] RecipeUpdateDTO recipe)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await recipeService.UpdateRecipe(recipe)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Deletes a recipe by its ID.
    /// </summary>
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await recipeService.DeleteRecipe(id)) :
            ErrorMessageResult(currentUser.Error);
    }
}