using Mazr3a.Models;
using Microsoft.EntityFrameworkCore;


namespace Mazr3a.Data;

//add-migration AddCategoryToDatabase
//remove-migration
//update-database
//update-database 0
public class ApplicationDbContext:DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options):base(options)
    {
    }

    public DbSet<Sector> Sectors { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Store> Stores { get; set; }
    public DbSet<Material> Materials { get; set; }
    public DbSet<Stock> Stocks { get; set; }
    public DbSet<Shared> Shareds { get; set; }
    public DbSet<Daily> Dailies { get; set; }
    public DbSet<Cash> Cashes { get; set; }


}
