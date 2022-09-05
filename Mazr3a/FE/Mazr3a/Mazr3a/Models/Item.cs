using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Mazr3a.Models;

public class Item
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم النشاط")]
    public string Activity_Name { get; set; }

}
