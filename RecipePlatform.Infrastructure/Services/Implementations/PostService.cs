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

public class PostService : IPostService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public PostService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse> AddPost(PostAddDTO postDto, CancellationToken cancellationToken = default)
    {
        var post = new Post
        {
            Description = postDto.Description,
            Likes = 0,
            AuthorId = postDto.AuthorId,
            RecipeId = postDto.RecipeId
        };

        await _repository.AddAsync(post, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PostDTO>> GetPost(Guid id, CancellationToken cancellationToken = default)
    {
        var post = await _repository.GetAsync(new PostSpec(id), cancellationToken);

        return (ServiceResponse<PostDTO>)(post != null
            ? ServiceResponse<PostDTO>.ForSuccess(new PostDTO
            {
                Id = post.Id,
                Description = post.Description,
                Likes = post.Likes,
                AuthorId = post.AuthorId,
                RecipeId = post.RecipeId,
                Comments = post.Comments.Select(c => new CommentDTO
                {
                    Id = c.Id,
                    CommentText = c.CommentText
                }).ToList()
            })
            : ServiceResponse<PostDTO>.FromError(new(HttpStatusCode.NotFound, "Post not found.")));
    }

    public async Task<ServiceResponse<PagedResponse<PostDTO>>> GetPosts(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new PostProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }
    public async Task<ServiceResponse> UpdatePost(PostUpdateDTO postDto, CancellationToken cancellationToken = default)
    {
        var post = await _repository.GetAsync(new PostSpec(postDto.Id), cancellationToken);

        if (post == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Post not found."));
        }

        post.Description = postDto.Description;
        post.RecipeId = postDto.RecipeId;

        await _repository.UpdateAsync(post, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeletePost(Guid id, CancellationToken cancellationToken = default)
    {
        var post = await _repository.GetAsync(new PostSpec(id), cancellationToken);

        if (post == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Post not found."));
        }

        await _repository.DeleteAsync<Post>(post.Id, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
}