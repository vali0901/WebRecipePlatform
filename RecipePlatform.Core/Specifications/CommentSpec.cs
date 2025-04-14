using Ardalis.Specification;
using RecipePlatform.Core.Entities;

namespace RecipePlatform.Core.Specifications;

public class CommentSpec : Specification<Comment>
{
    public CommentSpec(Guid Id) => Query.Where(c => c.Id == Id);
}