using Microsoft.EntityFrameworkCore;

namespace Web.Db
{
    public partial class City: ILocation
    {
        public long Id { get; set; }
        public string NameEn { get; set; }
        public string NameUa { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public static void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<City>().Property(e => e.Latitude).HasColumnName("Lat");
            mb.Entity<City>().Property(e => e.Longitude).HasColumnName("Lng");
        }
    }
}