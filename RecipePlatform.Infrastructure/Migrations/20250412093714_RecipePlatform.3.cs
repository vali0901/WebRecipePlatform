using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipePlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RecipePlatform3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_User_PosterId",
                table: "Post");

            migrationBuilder.RenameColumn(
                name: "PosterId",
                table: "Post",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Post_PosterId",
                table: "Post",
                newName: "IX_Post_AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_User_AuthorId",
                table: "Post",
                column: "AuthorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_User_AuthorId",
                table: "Post");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Post",
                newName: "PosterId");

            migrationBuilder.RenameIndex(
                name: "IX_Post_AuthorId",
                table: "Post",
                newName: "IX_Post_PosterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_User_PosterId",
                table: "Post",
                column: "PosterId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
