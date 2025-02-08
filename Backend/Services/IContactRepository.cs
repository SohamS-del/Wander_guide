using Backend_WanderGuide.Models;

 
    public interface IContactRepository
    {
        Task<ExtraContacts> AddContact(ExtraContacts contact);
        Task<ExtraContacts?> GetContactByPhone(string phoneNumber);

}
