using Backend_WanderGuide.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> PostLocation([FromBody] LocationData location)
        {
            if (location == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Store the location in the database
                _context.LocationData.Add(location);
                await _context.SaveChangesAsync();
                return Ok(location);
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                return StatusCode(500, new { message = "An error occurred while saving the location", error = ex.Message });
            }
        }
    }
}
