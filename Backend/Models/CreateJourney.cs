using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend_WanderGuide.Models
{
    public class CreateJourney
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Ensures auto-increment
        public Guid JourneyId { get; set; }
        public string UserName { get; set; }
        public Guid UserId { get; set; }
        public DateOnly JourneyCreate { get; set; }
        public DateOnly JourneyStartDate { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool FromMit { get; set; }
        public bool TodayOnly { get; set; }
        public bool IsStarted { get; set; }
        [Required]
        [Range(-90, 90)]
        public double StartLatitude { get; set; }

        [Required]
        [Range(-180, 180)]
        public double StartLongitude { get; set; }
        [Required]
        [Range(-90, 90)]
        public double DestinationLatitude { get; set; }

        [Required]
        [Range(-180, 180)]
        public double DestinationLongitude { get; set; }
        public int SeatsAvailable { get; set; }

        public int CostPerSeat { get; set; }
        [DefaultValue(null)]
        public TimeOnly? JourneyStartTime { get; set; } = null;
        public int TotalSeats { get; set; }
        public bool IsPrivate { get; set; }


    }
}
