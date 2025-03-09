using Backend_WanderGuide.Models;


    public interface IJourneyRepository
    {
        Task<CreateJourney> AddJourney(CreateJourney journey);
        Task<bool> AddJoinRequest(JoinJourney joinJourney);

        Task<CreateJourney?> GetJourneyById(Guid journeyId);
        Task<JoinJourney> GetJoinRequestById(Guid joinId);
        Task<bool> UpdateJoinRequest(JoinJourney joinJourney);
}

