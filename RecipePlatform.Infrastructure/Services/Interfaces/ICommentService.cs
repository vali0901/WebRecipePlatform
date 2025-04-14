using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Responses;
using System;
using System.Threading;
using System.Threading.Tasks;
using RecipePlatform.Core.Requests;

namespace RecipePlatform.Infrastructure.Services.Interfaces;

public interface ICommentService
{
    Task<ServiceResponse> AddComment(CommentAddDTO commentDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse<CommentDTO>> GetComment(Guid id, CancellationToken cancellationToken = default);
    
    Task<ServiceResponse<PagedResponse<CommentDTO>>> GetComments(PaginationSearchQueryParams pagination,
        CancellationToken cancellationToken = default);
    Task<ServiceResponse> UpdateComment(CommentUpdateDTO commentDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse> DeleteComment(Guid id, CancellationToken cancellationToken = default);
}
