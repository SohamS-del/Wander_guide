using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_WanderGuide.Migrations
{
    /// <inheritdoc />
    public partial class CreateJourneyModelUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Journeys");

            migrationBuilder.RenameColumn(
                name: "JourneyStart",
                table: "Journeys",
                newName: "JourneyStartDate");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "JourneyStartTime",
                table: "Journeys",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Journeys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JourneyStartTime",
                table: "Journeys");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Journeys");

            migrationBuilder.RenameColumn(
                name: "JourneyStartDate",
                table: "Journeys",
                newName: "JourneyStart");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Journeys",
                type: "datetime2",
                nullable: true);
        }
    }
}
