using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipePlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RecipePlatform4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AuthorId",
                table: "Recipe",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_AuthorId",
                table: "Recipe",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_User_AuthorId",
                table: "Recipe",
                column: "AuthorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_User_AuthorId",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_AuthorId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Recipe");
        }
    }
}
