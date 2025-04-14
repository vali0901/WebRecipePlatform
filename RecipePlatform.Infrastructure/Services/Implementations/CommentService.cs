using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Entities;
using RecipePlatform.Core.Specifications;
using RecipePlatform.Core.Responses;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using RecipePlatform.Core.Requests;
using RecipePlatform.Infrastructure.Database;
using RecipePlatform.Infrastructure.Repositories.Interfaces;
using RecipePlatform.Infrastructure.Services.Interfaces;

namespace RecipePlatform.Infrastructure.Services.Implementations;

public class CommentService : ICommentService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public CommentService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse> AddComment(CommentAddDTO commentDto, CancellationToken cancellationToken = default)
    {
        var comment = new Comment
        {
            CommentText = commentDto.CommentText,
            AuthorId = commentDto.AuthorId,
            PostId = commentDto.PostId
        };

        await _repository.AddAsync(comment, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<CommentDTO>> GetComment(Guid id, CancellationToken cancellationToken = default)
    {
        var comment = await _repository.GetAsync(new CommentSpec(id), cancellationToken);

        return (ServiceResponse<CommentDTO>)(comment != null
            ? ServiceResponse<CommentDTO>.ForSuccess(new CommentDTO
            {
                Id = comment.Id,
                CommentText = comment.CommentText,
                AuthorId = comment.AuthorId,
                PostId = comment.PostId
            })
            : ServiceResponse<CommentDTO>.FromError(new(HttpStatusCode.NotFound, "Comment not found.")));
    }
    
    public async Task<ServiceResponse<PagedResponse<CommentDTO>>> GetComments(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new CommentProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateComment(CommentUpdateDTO commentDto, CancellationToken cancellationToken = default)
    {
        var comment = await _repository.GetAsync(new CommentSpec(commentDto.Id), cancellationToken);

        if (comment == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Comment not found."));
        }

        comment.CommentText = commentDto.CommentText;

        await _repository.UpdateAsync(comment, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteComment(Guid id, CancellationToken cancellationToken = default)
    {
        var comment = await _repository.GetAsync(new CommentSpec(id), cancellationToken);

        if (comment == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Comment not found."));
        }

        await _repository.DeleteAsync<Comment>(comment.Id, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
}