namespace Mazr3a.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
public class Cash
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("البند")]
    public string item_Name { get; set; }

    [Required]
    [DisplayName("اليوم")]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Required]
    [DisplayName("السعر")]
    public float Price { get; set; }

}
