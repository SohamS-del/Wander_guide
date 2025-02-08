using Backend_WanderGuide.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AuthDbContext : IdentityDbContext<ApplicationUser>
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }
    public DbSet<LocationData> LocationData { get; set; }
    public DbSet<EmergencyContacts> EmergencyContacts { get; set; }
    public DbSet<CreateJourney> Journeys { get; set; }
    public DbSet<ExtraContacts> Contacts { get; set; }

}
    