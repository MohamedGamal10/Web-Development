using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Mazr3a.Models;

public class Shared
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم")]
    public string Name { get; set; }

    [Required]
    [DisplayName("المبلغ")]
    public float Price { get; set; }

    [Required]
    [DisplayName("اسم المزرعة")]
    public string Farm_Name { get; set; }

    [Required]
    [DisplayName("اليوم")]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }
}
