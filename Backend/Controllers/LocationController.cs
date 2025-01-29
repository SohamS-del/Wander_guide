using Backend_WanderGuide.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_WanderGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly AuthDbContext _context;

        public LocationController(AuthDbContext context)
        {
            _context = context;
        }

        [HttpPut]
        [Consumes("application/json")]
        public async Task<IActionResult> PutLocation([FromBody] LocationData location)
        {
            if (location == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Check if a record with the given UserId already exists
                var existingLocation = await _context.LocationData
                    .FirstOrDefaultAsync(l => l.UserId == location.UserId);

                if (existingLocation != null)
                {
                    // Update the existing record
                    existingLocation.Latitude = location.Latitude;
                    existingLocation.Longitude = location.Longitude;
                    existingLocation.Timestamp = location.Timestamp;

                    _context.LocationData.Update(existingLocation);
                }
                else
                {
                    // Create a new record
                    _context.LocationData.Add(location);
                }

                // Save changes to the database
                await _context.SaveChangesAsync();
                return Ok(new { message = "Location data successfully processed.", location });
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                return StatusCode(500, new { message = "An error occurred while processing the location data.", error = ex.Message });
            }
        }
    }
}
