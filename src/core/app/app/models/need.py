from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    Integer,
    Numeric,
    PrimaryKeyConstraint,
    Text,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import relationship

from app.db.base_class import FLBase
from app.models import PostStatus


class Need(FLBase):
    __tablename__ = "Needs"

    __table_args__ = (
        PrimaryKeyConstraint("Id", name="idx_20762_PK_Needs"),
        ForeignKeyConstraint(
            columns=["OrgCityId"],
            refcolumns=["Cities.Id"],
            name="fk_needs_cities",
            ondelete="CASCADE",
        ),
    )

    id = Column("Id", BigInteger, quote=True)
    ushahidiId = Column("UshahidiId", BigInteger, quote=True, default=0)
    timestamp = Column("Timestamp", DateTime(timezone=True), quote=True, nullable=False)
    statusId = Column("StatusId", Integer, quote=True, default=PostStatus.UnderReview, nullable=False)
    publishAnonymously = Column("PublishAnonymously", Boolean, quote=True, nullable=False)
    contactName = Column("ContactName", Text, quote=True, nullable=False)
    jobTitle = Column("JobTitle", Text, quote=True)
    email = Column("Email", Text, quote=True, nullable=False)
    phoneNumber = Column("PhoneNumber", Text, quote=True)
    organisationName = Column("OrganisationName", Text, quote=True)
    department = Column("Department", Text, quote=True)
    orgTypeId = Column("OrgTypeId", Integer, quote=True, nullable=False)
    orgTypeOther = Column("OrgTypeOther", Text, quote=True)
    orgCityId = Column("OrgCityId", BigInteger, quote=True)
    orgRegCode = Column("OrgRegCode", Text, quote=True, nullable=False)
    townOrCity = Column("TownOrCity", Text, quote=True)
    tweetId = Column("TweetId", Integer, quote=True)
    postcode = Column("Postcode", Text, quote=True, nullable=False)
    tellUsMore = Column("TellUsMore", Text, quote=True)
    latitude = Column("Latitude", Numeric, quote=True)
    longitude = Column("Longitude", Numeric, quote=True)
    addressLineOne = Column("AddressLineOne", Text, quote=True, nullable=False)
    addressLineTwo = Column("AddressLineTwo", Text, quote=True)

    orgCity = relationship("City", back_populates="needs")
    notes = relationship("NeedNote", back_populates="need")
    ppeTypes = relationship("NeedPpeType", back_populates="need")
