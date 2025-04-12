using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniCrm.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddClientRelatitionshipToConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "ClientNumber",
                table: "Conversations");

            migrationBuilder.AddColumn<DateTime>(
                name: "AssignedAt",
                table: "Conversations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ClientId",
                table: "Conversations",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_ClientId",
                table: "Conversations",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Clients_ClientId",
                table: "Conversations",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Clients_ClientId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_ClientId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "AssignedAt",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Conversations");

            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Conversations",
                type: "VARCHAR(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientNumber",
                table: "Conversations",
                type: "VARCHAR(20)",
                nullable: false,
                defaultValue: "");
        }
    }
}
