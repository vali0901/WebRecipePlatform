using RecipePlatform.Core.DataTransferObjects;
using RecipePlatform.Core.Responses;
using System;
using System.Threading;
using System.Threading.Tasks;
using RecipePlatform.Core.Requests;

namespace RecipePlatform.Infrastructure.Services.Interfaces;

public interface IPostService
{
    Task<ServiceResponse> AddPost(PostAddDTO postDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse<PostDTO>> GetPost(Guid id, CancellationToken cancellationToken = default);
    
    Task<ServiceResponse<PagedResponse<PostDTO>>> GetPosts(PaginationSearchQueryParams pagination,
        CancellationToken cancellationToken = default);
    Task<ServiceResponse> UpdatePost(PostUpdateDTO postDto, CancellationToken cancellationToken = default);
    Task<ServiceResponse> DeletePost(Guid id, CancellationToken cancellationToken = default);
    Task<ServiceResponse<PagedResponse<PostDTO>>> GetPostsByUserId(PaginationSearchQueryParams pagination, Guid authorId, CancellationToken cancellationToken = default);
}