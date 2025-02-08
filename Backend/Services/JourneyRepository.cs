
using Backend_WanderGuide.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend_WanderGuide.Services
{
    public class JourneyRepository : IJourneyRepository
    {
        private readonly AuthDbContext _context;

        public JourneyRepository(AuthDbContext context)
        {
            _context = context;
        }

        public async Task<CreateJourney> AddJourney(CreateJourney journey)
        {
            _context.Journeys.Add(journey);
            await _context.SaveChangesAsync(); // Saves to DB, auto-generating JourneyId
            return journey; // Now includes generated JourneyId
        }
        public async Task<CreateJourney?> GetJourneyById(Guid journeyId)
        {
            return await _context.Journeys.FirstOrDefaultAsync(j => j.JourneyId == journeyId);
        }
    }
}
