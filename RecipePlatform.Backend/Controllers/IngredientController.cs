using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Enums;
using RecipePlatform.Core.Requests;
using RecipePlatform.Core.Responses;
using RecipePlatform.Infrastructure.Authorization;
using RecipePlatform.Infrastructure.Services.Interfaces;
namespace RecipePlatform.Backend.Controllers;

/// <summary>
/// Controller for managing ingredients, providing CRUD operations.
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class IngredientController(IUserService userService, IIngredientService ingredientService) : AuthorizedController(userService)
{
    /// <summary>
    /// Retrieves an ingredient by its ID.
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<IngredientDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await ingredientService.GetIngredient(id)) :
            ErrorMessageResult<IngredientDTO>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<IngredientDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await ingredientService.GetIngredients(pagination)) :
            ErrorMessageResult<PagedResponse<IngredientDTO>>(currentUser.Error);
    }

    /// <summary>
    /// Adds a new ingredient.
    /// </summary>
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] IngredientAddDTO ingredient)
    {
        var currentUser = await GetCurrentUser();
        
        return (currentUser.Result != null && currentUser.Result.Role == UserRoleEnum.Admin) ?
            FromServiceResponse(await ingredientService.AddIngredient(ingredient)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Updates an existing ingredient.
    /// </summary>
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] IngredientUpdateDTO ingredient)
    {
        var currentUser = await GetCurrentUser();
        return (currentUser.Result != null && currentUser.Result.Role == UserRoleEnum.Admin) ?
            FromServiceResponse(await ingredientService.UpdateIngredient(ingredient)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Deletes an ingredient by its ID.
    /// </summary>
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return (currentUser.Result != null && currentUser.Result.Role == UserRoleEnum.Admin) ?
            FromServiceResponse(await ingredientService.DeleteIngredient(id)) :
            ErrorMessageResult(currentUser.Error);
    }
}