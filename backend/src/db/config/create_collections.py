from pymongo import ASCENDING, IndexModel
from .medicine_collection_example import MEDICINE_COLLECTION_EXAMPLE
from .user_collection_example import USER_COLLECTION_EXAMPLE
from .notification_collection_example import NOTIFICATION_COLLECTION_EXAMPLE
from src.db.schemas.medicine_schema import MedicineSchema
from src.db.schemas.user_schema import UserSchema
from src.db.schemas.notifications_schema import NotificationSchema
from src.db.serializers.schema_serializer import schema_serializer


def create_collections(database):
    """
    Create all collections and insert the example data.
    """
    if 'users' not in database.db.list_collection_names():
        collections = ['users']

        for collection in collections:
            schema = UserSchema()
            database.create_collection(
                collection,
                indexes=[IndexModel([("id", ASCENDING)], unique=True)],
                validation_schema=schema_serializer(schema.get())
            )

        for user in USER_COLLECTION_EXAMPLE:
            database.insert_user('users', user)

    if 'medicine' not in database.db.list_collection_names():
        collections = ['medicine']

        for collection in collections:
            schema = MedicineSchema()
            database.create_collection(
                collection,
                indexes=[IndexModel([("id", ASCENDING)], unique=True)],
                validation_schema=schema_serializer(schema.get())
            )

        for user in MEDICINE_COLLECTION_EXAMPLE:
            database.insert_user('medicine', user)
    
    if 'notification' not in database.db.list_collection_names():
        collections = ['notification']

        for collection in collections:
            schema = NotificationSchema()
            database.create_collection(
                collection,
                indexes=[IndexModel([("id", ASCENDING)], unique=True)],
                validation_schema=schema_serializer(schema.get())
            )

        for user in NOTIFICATION_COLLECTION_EXAMPLE:
            database.insert_user('notification', user)
    
    