using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Mazr3a.Models;

public class Sector
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم المزرعة")]
    public string Farm_Name { get; set; }

    [Required]
    [DisplayName("رقم القطاع")]
    public int Sector_ID { get; set; }




}
