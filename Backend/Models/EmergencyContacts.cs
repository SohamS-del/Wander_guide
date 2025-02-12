using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class EmergencyContacts
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }  // Primary Key
    public string EmergencyPhone1 { get; set; }
    public string EmergencyPhone2 { get; set; }
    public string EmergencyPhone3 { get; set; }
    public Guid UserId { get; set; }  // Foreign Key (ensure type matches database schema)
}
