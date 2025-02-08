using Backend_WanderGuide.Models;

using Microsoft.AspNetCore.Mvc;

namespace Backend_WanderGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;

        public ContactsController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        

        [HttpPost]
        public async Task<ActionResult<ExtraContacts>> AddContact(ExtraContacts contact)
        {
            var createdContact = await _contactRepository.AddContact(contact);
            return StatusCode(201, createdContact); // HTTP 201 Created
        }

        
    }
}
