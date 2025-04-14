﻿using RecipePlatform.Core.Enums;

namespace RecipePlatform.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class User : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public UserRoleEnum Role { get; set; }

    /// <summary>
    /// References to other entities such as this are used to automatically fetch correlated data, this is called a navigation property.
    /// Collection such as this can be used for Many-To-One or Many-To-Many relations.
    /// Note that this field will be null if not explicitly requested via a Include query, also note that the property is used by the ORM, in the database this collection doesn't exist. 
    /// </summary>


    public ICollection<User> Following { get; set; } = null!;
    public ICollection<Post> Posts { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; } = null!;
    public ICollection<Recipe> Recipes { get; set; } = null!;
}
