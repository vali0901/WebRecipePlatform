using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Requests;
using RecipePlatform.Core.Responses;
using RecipePlatform.Infrastructure.Authorization;
using RecipePlatform.Infrastructure.Services.Interfaces;
namespace RecipePlatform.Backend.Controllers;

/// <summary>
/// Controller for managing comments, providing CRUD operations.
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class CommentController(IUserService userService, ICommentService commentService) : AuthorizedController(userService)
{
    /// <summary>
    /// Retrieves a comment by its ID.
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<CommentDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await commentService.GetComment(id)) :
            ErrorMessageResult<CommentDTO>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<CommentDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await commentService.GetComments(pagination)) :
            ErrorMessageResult<PagedResponse<CommentDTO>>(currentUser.Error);
    }

    /// <summary>
    /// Adds a new comment.
    /// </summary>
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] CommentAddDTO comment)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await commentService.AddComment(comment)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Updates an existing comment.
    /// </summary>
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] CommentUpdateDTO comment)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await commentService.UpdateComment(comment)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Deletes a comment by its ID.
    /// </summary>
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await commentService.DeleteComment(id)) :
            ErrorMessageResult(currentUser.Error);
    }
}