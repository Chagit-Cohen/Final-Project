using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    /// <inheritdoc />
    public partial class init10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reviews_expertProfiles_ExpertProfileId",
                table: "reviews");

            migrationBuilder.DropIndex(
                name: "IX_expertProfiles_UserId",
                table: "expertProfiles");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_expertProfiles_UserId",
                table: "expertProfiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_expertProfiles_ExpertProfileId",
                table: "reviews",
                column: "ExpertProfileId",
                principalTable: "expertProfiles",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reviews_expertProfiles_ExpertProfileId",
                table: "reviews");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_expertProfiles_UserId",
                table: "expertProfiles");

            migrationBuilder.CreateIndex(
                name: "IX_expertProfiles_UserId",
                table: "expertProfiles",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_expertProfiles_ExpertProfileId",
                table: "reviews",
                column: "ExpertProfileId",
                principalTable: "expertProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
