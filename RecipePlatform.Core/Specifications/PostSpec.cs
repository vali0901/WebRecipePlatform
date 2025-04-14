using Ardalis.Specification;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Core.Specifications;

public class PostSpec : Specification<Post>
{
    public PostSpec(Guid Id) => Query.Where(p => p.Id == Id);
}