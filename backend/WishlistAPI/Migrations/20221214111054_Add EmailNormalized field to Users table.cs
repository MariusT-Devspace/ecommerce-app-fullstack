using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WishlistAPI.Migrations
{
    public partial class AddEmailNormalizedfieldtoUserstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailNormalized",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailNormalized",
                table: "Users");
        }
    }
}
