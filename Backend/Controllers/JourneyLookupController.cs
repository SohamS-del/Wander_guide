using Backend_WanderGuide.Models;
using Backend_WanderGuide.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_WanderGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JourneyLookupController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;
        private readonly IJourneyRepository _journeyRepository;
        private readonly AuthDbContext _context;

        public JourneyLookupController(IContactRepository contactRepository, IJourneyRepository journeyRepository, AuthDbContext context)
        {
            _contactRepository = contactRepository;
            _journeyRepository = journeyRepository;
            _context = context;
        }
      


        [HttpGet("GetJourneyByPhone/{phoneNumber}")]
        public async Task<ActionResult<CreateJourney>> GetJourneyByPhone(string phoneNumber)
        {
            // Find contact by phone number
            var contact = await _contactRepository.GetContactByPhone(phoneNumber);
            if (contact == null)
            {
                return NotFound("No journey found for this phone number.");
            }

            // Fetch journey details using JourneyId
            var journey = await _journeyRepository.GetJourneyById(contact.JourneyId);
            if (journey == null)
            {
                return NotFound("Journey details not found.");
            }

            return StatusCode(201, journey);
        }

        // ✅ Get Journeys by UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetJourneysByUserId(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest(new { message = "Invalid User ID." });
            }

            var journeys = await _context.Journeys
                .Where(j => j.UserId == userId)
                .ToListAsync();

            if (!journeys.Any())
            {
                return NotFound(new { message = "No journeys found for this user." });
            }

            return Ok(journeys);
        }
        
        [HttpGet("GetAllJourneys")]
        public async Task<ActionResult<IEnumerable<CreateJourney>>> GetAllJourneys()
        {
            return await _context.Journeys.ToListAsync();
        }



        // ✅ Delete Journey by ID
        [HttpDelete("{journeyId}")]
        public async Task<IActionResult> DeleteJourney(Guid journeyId)
        {
            var journey = await _context.Journeys.FindAsync(journeyId);
            if (journey == null)
            {
                return NotFound(new { message = "Journey not found." });
            }

            _context.Journeys.Remove(journey);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Journey deleted successfully." });
        }
    }
}
