namespace API.Data;

using Microsoft.EntityFrameworkCore;
using API.Entities;  // Ensure the Product entity is referenced

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions options) : base(options) { }

    public required DbSet<Product> Products { get; set; }
}
