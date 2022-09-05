using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Mazr3a.Models;

public class Material
{
    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم المادة")]
    public string Material_Name { get; set; }
    
}
