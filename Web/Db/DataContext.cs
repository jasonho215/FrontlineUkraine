using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Web.Db.Auditing;

namespace Web.Db
{
    public partial class DataContext : IdentityDbContext<AppUser>
    {
		public readonly ILoggerFactory MyLoggerFactory;
        public DataContext()
		{
			MyLoggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });
			//this.Database.Log = s => Debug.WriteLine(s);//N.B. this can be really expensive perf wise - turn off for bulk processing
		}
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<ContactSubmission> ContactSubmissions { get; set; }

        public virtual DbSet<Need> Needs { get; set; }
        public virtual DbSet<NeedNote> NeedNotes { get; set; } //needed? can we drop the M2M table 
        public virtual DbSet<NeedPpeType> NeedPpeTypes { get; set; }

        public virtual DbSet<Note> Notes { get; set; }
        public virtual DbSet<PpeType> PpeTypes { get; set; }

		public virtual DbSet<Request> Requests { get; set; }
        public virtual DbSet<Supplies> Supplies { get; set; }

        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<SupplierNote> SupplierNotes { get; set; }
        public virtual DbSet<SupplierPpeType> SupplierPpeTypes { get; set; }

        /// <summary>
        /// 2,621,114 = (‭938000 + 1011997 + 671117‬) 
        /// </summary>
        public DbSet<PostcodeRegion> PostcodesRegions { get; set; }

        public NhsRegions? RegionByPostcode(string postcode) { return PostcodesRegions.AsNoTracking().SingleOrDefault(pcr => pcr.Postcode == postcode)?.NhsRegion; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            configureDomain(mb);
            configureAuditing(mb);
            base.OnModelCreating(mb); //Configures the IdentityDbContext
            City.OnModelCreating(mb);
        }
    }
}