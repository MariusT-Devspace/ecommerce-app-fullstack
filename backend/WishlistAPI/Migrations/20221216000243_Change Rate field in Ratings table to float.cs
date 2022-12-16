using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WishlistAPI.Migrations
{
    public partial class ChangeRatefieldinRatingstabletofloat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Rate",
                table: "Ratings",
                type: "real",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "Rate",
                table: "Ratings",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
