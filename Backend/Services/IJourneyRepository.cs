using Backend_WanderGuide.Models;


    public interface IJourneyRepository
    {
        Task<CreateJourney> AddJourney(CreateJourney journey);
        Task<CreateJourney?> GetJourneyById(Guid journeyId);
}

