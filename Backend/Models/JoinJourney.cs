using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend_WanderGuide.Models
{
    public class JoinJourney
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid JoinId { get; set; } // Change to BookingID
        public Guid JourneyId { get; set; }
        public Guid UserId { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool IsAccepted { get; set; }
        [ForeignKey("JourneyId")]
        public virtual CreateJourney Journey { get; set; }
        public int Status { get; set; } = (int)JoinStatus.NotApplied;
    }
}
