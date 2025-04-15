using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Requests;
using RecipePlatform.Core.Responses;
using RecipePlatform.Infrastructure.Authorization;
using RecipePlatform.Infrastructure.Services.Interfaces;
namespace RecipePlatform.Backend.Controllers;

/// <summary>
/// Controller for managing posts, providing CRUD operations.
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class PostController(IUserService userService, IPostService postService) : AuthorizedController(userService)
{
    /// <summary>
    /// Retrieves a post by its ID.
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<PostDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await postService.GetPost(id)) :
            ErrorMessageResult<PostDTO>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<PostDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await postService.GetPosts(pagination)) :
            ErrorMessageResult<PagedResponse<PostDTO>>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<PostDTO>>>> GetPageById([FromQuery] PaginationSearchQueryParams pagination, Guid AuthorId) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await postService.GetPostsByUserId(pagination, AuthorId)) :
            ErrorMessageResult<PagedResponse<PostDTO>>(currentUser.Error);
    }
    
    

    /// <summary>
    /// Adds a new post.
    /// </summary>
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] PostAddDTO post)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await postService.AddPost(post)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Updates an existing post.
    /// </summary>
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] PostUpdateDTO post)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await postService.UpdatePost(post)) :
            ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Deletes a post by its ID.
    /// </summary>
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            FromServiceResponse(await postService.DeletePost(id)) :
            ErrorMessageResult(currentUser.Error);
    }
}