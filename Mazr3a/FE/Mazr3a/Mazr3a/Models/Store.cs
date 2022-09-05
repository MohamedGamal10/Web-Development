using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Mazr3a.Models;

public class Store
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم المخزن")]
    public string Store_Name { get; set; }
}
