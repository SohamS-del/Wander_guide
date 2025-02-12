using Microsoft.AspNetCore.Mvc;
using Backend_WanderGuide.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Backend_WanderGuide.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmergencyContactsController : ControllerBase
    {
        private readonly AuthDbContext _context;
        private readonly ILogger<EmergencyContactsController> _logger;

        public EmergencyContactsController(AuthDbContext context, ILogger<EmergencyContactsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveEmergencyContacts([FromBody] EmergencyContacts request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Additional validation for properties
            if (string.IsNullOrWhiteSpace(request.EmergencyPhone1))
            {
                return BadRequest(new { message = "EmergencyPhone1 is required." });
            }

            try
            {
                request.Id = Guid.NewGuid(); // Auto-generate GUID for Id
                _context.EmergencyContacts.Add(request);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Emergency contacts saved successfully!"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving emergency contacts.");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while saving contacts.",
                    error = ex.Message
                });
            }
        }
    }
}
