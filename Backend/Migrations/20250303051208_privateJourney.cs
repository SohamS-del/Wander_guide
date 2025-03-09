using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_WanderGuide.Migrations
{
    /// <inheritdoc />
    public partial class privateJourney : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPrivate",
                table: "Journeys",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TotalSeats",
                table: "Journeys",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrivate",
                table: "Journeys");

            migrationBuilder.DropColumn(
                name: "TotalSeats",
                table: "Journeys");
        }
    }
}
