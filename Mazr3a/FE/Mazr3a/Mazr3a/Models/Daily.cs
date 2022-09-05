using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mazr3a.Models;

public class Daily
{

    [Key]
    public int Id { get; set; }

    [Required]
    [DisplayName("اسم المزرعة")]
    public string Farm_Name { get; set; }

    [Required]
    [DisplayName("رقم القطاع")]
    public int Sector_ID { get; set; }

    [Required]
    [DisplayName("اليوم")]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Required]
    [DisplayName("اسم النشاط")]
    public string Activity_Name { get; set; }

    [Required]
    [DisplayName("عدد العمالة")]
    public float Workers { get; set; }

    [Required]
    [DisplayName("اليومية")]
    public float Unit_Rate { get; set; }

    [Required]
    [DisplayName("اجمالي اليومية")]
    public float Workers_Rate { get; set; }

    [Required]
    [DisplayName("اسم المادة")]
    public string Material_Name { get; set; }

    [Required]
    [DisplayName("الكمية بالكيلو")]
    public float Quantity { get; set; }

    [Required]
    [DisplayName("اسم المخزن")]
    public string Store_Name { get; set; }

    [Required]
    [DisplayName("السعر")]
    public float Price { get; set; }

    [Required]
    [DisplayName("اجمالي سعر المواد")]
    public float Material_Total { get; set; }

    [Required]
    [DisplayName("الاجمالي")]
    public float Total { get; set; } 

}
