using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Mazr3a.Models;

public class Stock
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم المادة")]
    public string Material_Name { get; set; }

    [Required]
    [DisplayName("الكمية بالكيلو")]
    public int Quantity { get; set; }

    [Required]
    [DisplayName("اسم المخزن")]
    public string Store_Name { get; set; }

    [Required]
    [DisplayName("اليوم")]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }
}
