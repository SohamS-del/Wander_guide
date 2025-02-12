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
            journey.JourneyId = Guid.NewGuid(); // Ensure JourneyId is always generated
            _context.Journeys.Add(journey);
            await _context.SaveChangesAsync();
            return journey; // Return journey with generated ID
        }

        public async Task<CreateJourney?> GetJourneyById(Guid journeyId)
        {
            return await _context.Journeys.FirstOrDefaultAsync(j => j.JourneyId == journeyId);
        }
    }
}
