using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    /// <inheritdoc />
    public partial class _26 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_serviceCalls_expertProfiles_ExpertId",
                table: "serviceCalls");

            migrationBuilder.AddForeignKey(
                name: "FK_serviceCalls_expertProfiles_ExpertId",
                table: "serviceCalls",
                column: "ExpertId",
                principalTable: "expertProfiles",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_serviceCalls_expertProfiles_ExpertId",
                table: "serviceCalls");

            migrationBuilder.AddForeignKey(
                name: "FK_serviceCalls_expertProfiles_ExpertId",
                table: "serviceCalls",
                column: "ExpertId",
                principalTable: "expertProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
