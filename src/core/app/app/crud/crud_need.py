from datetime import datetime
from typing import List, Set

from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Query, Session

from app.crud.base import CRUDBase
from app.models.need import Need
from app.models.need_ppe_type import NeedPpeType
from app.models.post_status import PostStatus
from app.schemas import NeedCreate


def to_model(create_model: NeedCreate) -> Need:
    need_model = Need(
        timestamp=datetime.utcnow(),
        publishAnonymously=create_model.publish_anonymously,
        orgTypeId=create_model.org_type,
        orgTypeOther=create_model.org_type_other,
        organisationName=create_model.organisation_name,
        orgCityId=create_model.org_city_id,
        orgRegCode=create_model.org_reg_code,
        email=create_model.email,
        phoneNumber=create_model.phone_number,
        contactName=create_model.contact_name,
        postcode=create_model.postcode,
        tellUsMore=create_model.tell_us_more,
        jobTitle=create_model.job_title,
        department=create_model.department,
        addressLineOne=create_model.address_line_one,
        addressLineTwo=create_model.address_line_two,
    )
    for ppe_type in create_model.ppe_types:
        need_ppe_type = NeedPpeType(
            ppeTypeId=ppe_type.type,
            ppeTypeOther=ppe_type.type_other,
            dailyShortage=ppe_type.daily_shortage,
            dailyShortageForWhom=ppe_type.daily_shortage_for_whom,
            statusId=PostStatus.UnderReview,
        )
        need_model.ppeTypes.append(need_ppe_type)

    return need_model


class CRUDNeed(CRUDBase[Need, NeedCreate, BaseModel]):
    def get_queryable_by_post_status(self, db: Session, *, status: PostStatus) -> Query:
        return db.query(Need).join(Need.ppeTypes).filter(Need.statusId == status)

    def get_all_by_post_status(self, db: Session, *, status: PostStatus) -> List[Need]:
        return self.get_queryable_by_post_status(db, status=status).all()

    def get_all_published_by_ppe_status(
        self, db: Session, *, statuses: Set
    ) -> List[Need]:
        subquery: Query = db.query(NeedPpeType.needId).filter(
            NeedPpeType.statusId.in_(statuses)
        ).having(func.count(NeedPpeType.needId) > 0).group_by(
            NeedPpeType.needId, NeedPpeType.statusId
        ).subquery()
        return (
            self.get_queryable_by_post_status(db, status=PostStatus.Published)
            .filter(Need.id.in_(subquery))
            .all()
        )

    def create_from_request(self, db: Session, *, request: NeedCreate) -> Need:
        supplier_model = to_model(request)
        return self.create(db, supplier_model)


need = CRUDNeed(Need)
