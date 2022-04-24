using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Db
{
	public partial class Need : ILocation, IPostStatus
	{
		public Need()
		{
			NeedNotes = new HashSet<NeedNote>();
			NeedPpeTypes = new HashSet<NeedPpeType>();
		}

		public long Id { get; set; }
		public long? UshahidiId { get; set; }
		public DateTimeOffset Timestamp { get; set; }
		public int StatusId { get; set; }
		public bool PublishAnonymously { get; set; }
		public string ContactName { get; set; }
		public string JobTitle { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string OrganisationName { get; set; }
		public string Department { get; set; }
		public int OrgTypeId { get; set; }
		public string OrgTypeOther { get; set; }
		public long OrgCityId { get; set; }
		public string TownOrCity { get; set; }
		public long? TweetId { get; set; }
		public string AddressLineOne { get; set; }
		public string AddressLineTwo { get; set; }
		public string Postcode { get; set; }
		public string TellUsMore { get; set; }
		public decimal? Latitude { get; set; }
		public decimal? Longitude { get; set; }

		public virtual City OrgCity { get; set; }
		public virtual ICollection<NeedNote> NeedNotes { get; set; }
		public virtual ICollection<NeedPpeType> NeedPpeTypes { get; set; }
	}
}
