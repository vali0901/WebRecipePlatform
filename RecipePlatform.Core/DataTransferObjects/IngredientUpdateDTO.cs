namespace RecipePlatform.Core.DataTransferObjects;

public record IngredientUpdateDTO(Guid Id, string? Name=null, string? Description=null);