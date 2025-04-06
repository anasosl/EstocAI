from .database import Database
from .config.create_collections import create_collections

database = Database()
database.drop_collection('notification')
create_collections(database)