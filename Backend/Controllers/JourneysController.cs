using Backend_WanderGuide.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend_WanderGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JourneysController : ControllerBase
    {
        private readonly IJourneyRepository _journeyRepository;

        public JourneysController(IJourneyRepository journeyRepository)
        {
            _journeyRepository = journeyRepository;
        }



        [HttpPost]
        public async Task<ActionResult<int>> CreateJourney(CreateJourney journey)
        {
            var createdJourney = await _journeyRepository.AddJourney(journey);

            if (createdJourney == null)
            {
                return BadRequest("Failed to create journey");
            }

            return StatusCode(201, new { journeyId = createdJourney.JourneyId });
        }


    }
}
