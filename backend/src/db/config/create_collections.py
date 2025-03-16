from pymongo import ASCENDING, IndexModel
from .item_collection_example import ITEM_COLLECTION_EXAMPLE
from .user_collection_example import USER_COLLECTION_EXAMPLE
from src.db.schemas.item_schema import ItemSchema
from src.db.schemas.user_schema import UserSchema
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
