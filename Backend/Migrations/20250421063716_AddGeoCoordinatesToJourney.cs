using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_WanderGuide.Migrations
{
    /// <inheritdoc />
    public partial class AddGeoCoordinatesToJourney : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DropPoint",
                table: "Journeys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StartPoint",
                table: "Journeys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DropPoint",
                table: "Journeys");

            migrationBuilder.DropColumn(
                name: "StartPoint",
                table: "Journeys");
        }
    }
}
