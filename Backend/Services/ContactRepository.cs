
using Backend_WanderGuide.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend_WanderGuide.Services // Change from Repositories to Services
{
    public class ContactRepository : IContactRepository
    {
        private readonly AuthDbContext _context;

        public ContactRepository(AuthDbContext context)
        {
            _context = context;
        }

       

        public async Task<ExtraContacts> AddContact(ExtraContacts contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        
        public async Task<ExtraContacts?> GetContactByPhone(string phoneNumber)
        {
            return await _context.Contacts.FirstOrDefaultAsync(c => c.ContactName == phoneNumber);
        }
    }
}
