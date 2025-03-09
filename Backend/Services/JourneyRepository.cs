using Backend_WanderGuide.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Backend_WanderGuide.Services
{
    public class JourneyRepository : IJourneyRepository
    {
        private readonly AuthDbContext _context;

        public JourneyRepository(AuthDbContext context)
        {
            _context = context;
        }

        // ✅ Create a new journey
        public async Task<CreateJourney> AddJourney(CreateJourney journey)
        {
            journey.JourneyId = Guid.NewGuid(); // Ensure JourneyId is always generated
            _context.Journeys.Add(journey);
            await _context.SaveChangesAsync();
            return journey; // Return journey with generated ID
        }

        // ✅ Fetch a journey by its ID
        public async Task<CreateJourney?> GetJourneyById(Guid journeyId)
        {
            return await _context.Journeys.FirstOrDefaultAsync(j => j.JourneyId == journeyId);
        }

        // ✅ Add a join request
        public async Task<bool> AddJoinRequest(JoinJourney joinJourney)
        {
            if (joinJourney == null || joinJourney.JourneyId == Guid.Empty || joinJourney.UserId == Guid.Empty)
            {
                throw new ArgumentException("Invalid JoinJourney object.");
            }

            try
            {
                _context.JoinJourneys.Add(joinJourney);
                return await _context.SaveChangesAsync() > 0; // Returns true if inserted
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddJoinRequest: {ex.Message}");
                return false;
            }
        }

        // ✅ Fetch a join request by its ID
        public async Task<JoinJourney?> GetJoinRequestById(Guid joinId)
        {
            return await _context.JoinJourneys.FirstOrDefaultAsync(j => j.JoinId == joinId);
        }

        // ✅ Update a join request (for approval or rejection)
        public async Task<bool> UpdateJoinRequest(JoinJourney joinJourney)
        {
            _context.JoinJourneys.Update(joinJourney);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
