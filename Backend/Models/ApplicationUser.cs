using Microsoft.AspNetCore.Identity;

namespace Backend_WanderGuide.Models
{
    public class ApplicationUser : IdentityUser
    {   

        public string Name { get; set; }
        public string Phone { get; set; }

        
    }
}
