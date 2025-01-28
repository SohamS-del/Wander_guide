using System.ComponentModel.DataAnnotations;
using Backend_WanderGuide.Utilities;

namespace Backend_WanderGuide.Models
{
    public class LocationData
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }

        [Required]
        [Range(-90, 90)]
        public double Latitude { get; set; }

        [Required]
        [Range(-180, 180)]
        public double Longitude { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }


}
