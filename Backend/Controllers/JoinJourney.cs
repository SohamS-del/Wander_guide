using Backend_WanderGuide.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Backend_WanderGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JoinJourneyController : ControllerBase
    {
        private readonly IJourneyRepository _journeyRepository;

        public JoinJourneyController(IJourneyRepository journeyRepository)
        {
            _journeyRepository = journeyRepository;
        }

        // Join a journey request
        [HttpPost("join")]
        public async Task<IActionResult> JoinJourney(Guid journeyId, Guid userId)
        {
            var journey = await _journeyRepository.GetJourneyById(journeyId);

            if (journey == null)
                return NotFound("Journey not found.");

            if (journey.SeatsAvailable <= 0)
                return BadRequest("No seats available.");

            // Create join request
            var joinJourney = new JoinJourney
            {
                JourneyId = journeyId,
                UserId = userId,
                IsAccepted = false, // Owner will approve later
                Status = (int)JoinStatus.Pending // Mark as Pending
            };

            var result = await _journeyRepository.AddJoinRequest(joinJourney);
            if (!result)
                return BadRequest("Failed to join the journey.");

            return Ok("Join request sent.");
        }


        // Approve a join request
        [HttpPost("approve")]
        public async Task<IActionResult> ApproveJoinRequest(Guid joinId)
        {
            var joinRequest = await _journeyRepository.GetJoinRequestById(joinId);

            if (joinRequest == null)
                return NotFound("Join request not found.");

            var journey = await _journeyRepository.GetJourneyById(joinRequest.JourneyId);

            if (journey == null)
                return NotFound("Journey not found.");

            if (journey.SeatsAvailable <= 0)
                return BadRequest("Not enough seats available.");

            try
            {
                // Approve request
                joinRequest.IsAccepted = true;
                joinRequest.Status = (int)JoinStatus.Accepted; // Mark as Approved

                // Decrement available seats
                journey.SeatsAvailable--;

                var result = await _journeyRepository.UpdateJoinRequest(joinRequest);
                if (!result)
                    return BadRequest("Failed to approve the join request.");

                return Ok("Join request approved.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
    }
}
