using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniCrm.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddFilePathToMessages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Messages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Messages");
        }
    }
}
