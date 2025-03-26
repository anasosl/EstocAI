from typing import List, Dict
from uuid import uuid4
from pymongo import MongoClient, errors
from pymongo.collection import Collection, IndexModel
from src.config.config import env
from logging import INFO, WARNING, getLogger

logger = getLogger('uvicorn')

class Database():

    ID_LENGTH = 8

    def __init__(self):
        self.db = None
        self.connect()


    def connect(self):
        try:
            mongo_connection = MongoClient(env.DB_URL)

            logger.setLevel(INFO)

            self.db = mongo_connection[env.DB_NAME]

            print("--------------------")
            logger.info("MongoDB connected!")
            logger.info(f"Server Version: {mongo_connection.server_info()['version']}")
            print("--------------------")


        except errors.ServerSelectionTimeoutError as err:

            mongo_connection = None
            logger.setLevel(WARNING)
            logger.info(f"MongoDB connection error! {err}")

    def close_connection(self):
        print("--------------------")
        logger.info("MongoDB connection closed!")
        print("--------------------")
        self.db.client.close()

    def get_db(self):
        return self.db


    def create_collection(
        self,
        name: str,
        indexes: List[IndexModel] = [],
        validation_schema: Dict = {}
    ) -> Collection:
        """
        Create a collection

        Parameters
        - name : str
            The name of the collection to create
        - indexes : List[IndexModel]
            The indexes to create in the collection
        - validation_schema : dict
            The validation schema used to validate data inserted into the
            collection. It should be a dictionary representing a JSON Schema

        Returns
        - pymongo.collection.Collection
            The created collection

        Raises
        - TypeError: If indexes is not a list of pymongo.IndexModel

        """

        collection_options = { "validator": { "$jsonSchema": validation_schema } }

        collection: Collection = self.db.create_collection(
            name,
            **collection_options
        )

        collection.create_indexes(indexes)

        logger.info(f"Collection {name} created!")

        return collection

    def drop_collection(self, name) -> bool:
        """
        Drop a collection

        Parameters
        - name : str
            The name of the collection to drop

        Returns
        - bool
            True if the collection was dropped successfully, False otherwise

        """

        if name in self.db.list_collection_names():
            self.db.drop_collection(name)
            logger.info(f"Collection {name} dropped!")
            return True

        return False

    def get_all_users(self, collection_name: str) -> list:
        """
        Get all items from a collection

        Parameters:
        - collection_name: str
            The name of the collection

        Returns:
        - list
            A list of all users in the collection

        """

        collection: Collection = self.db[collection_name]

        items = list(collection.find({}, {"_id": 0}))

        return items

    def get_user_by_email(self, collection_name: str, email: str) -> dict:
        """
        Retrieve an user by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the user will be stored
        - user_id: str
            The ID of the user to retrieve

        Returns:
        - dict or None:
            The user if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        user = collection.find_one({"email": str(email)}, {"_id": 0})
        return user

    def insert_user(self, collection_name: str, user: dict) -> dict:
        """
        Insert an user into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the user will be stored
        - user: dict
            The user to insert

        Returns:
        - dict:
            The inserted user
        """
        user["id"] = str(uuid4())[:self.ID_LENGTH]
        collection: Collection = self.db[collection_name]
        user_id = collection.insert_one(user).inserted_id
        return {
            "id": str(user_id),
            **user
        }

    def delete_user(self, collection_name: str, user_id: dict) -> dict:
        """
        Delete an user into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the user will be stored
        - user: dict
            The user to delete

        Returns:
        - dict:
            The deleted user
        """
        
        collection: Collection = self.db[collection_name]
        result = collection.find_one_and_delete({"id": user_id}, {"_id": 0})
        
        if result:
            return {
                "status": "success",
                "message": "User deleted successfully",
                "data": result
            }
        else:
            return {
                "status": "failure",
                "message": "User not found"
            }

    def update_user(self, collection_name: str, user_id: str, updated_data: dict) -> dict:
        """
        Update an existing user in a collection

        Parameters:
        - collection_name: str
            The name of the collection where the user is stored
        - user_id: str
            The ID of the user to update
        - updated_data: dict
            The new data to update the user with

        Returns:
        - dict:
            The updated user data or a success message
        """
        collection: Collection = self.db[collection_name]

        result = collection.update_one(
            {"id": user_id}, 
            {"$set": updated_data}
        )

        if result.matched_count == 0:
            return {"status": "failure", "message": "User not found"}

        updated_data["id"] = user_id 
        return {"status": "success", "message": "User updated successfully", "data": updated_data}

    def get_all_companies(self, collection_name: str) -> list:
        """
        Get all items from a collection

        Parameters:
        - collection_name: str
            The name of the collection

        Returns:
        - list
            A list of all companies in the collection

        """

        collection: Collection = self.db[collection_name]
        companies = list(collection.find({}, {"_id": 0}))
        for company in companies:
            company.pop("password")
        return companies

    def get_company_by_email(self, collection_name: str, email: str) -> dict:
        """
        Retrieve an company by its email from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the user will be stored
        - email: str
            The email of the company to retrieve

        Returns:
        - dict or None:
            The company if found, None otherwise

        """
        collection: Collection = self.db[collection_name]
        company = collection.find_one({"email": str(email)}, {"_id": 0})
        return company

    def insert_company(self, collection_name: str, company: dict) -> dict:
        """
        Insert an company into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the company will be stored
        - company: dict
            The company to insert

        Returns:
        - dict:
            The inserted company
        """
        company["id"] = str(uuid4())[:self.ID_LENGTH]
        collection: Collection = self.db[collection_name]
        company_id = collection.insert_one(company).inserted_id
        return {
            "id": str(company_id),
            **company
        }

    def delete_company(self, collection_name: str, company_name: dict) -> dict:
        """
        Delete an company into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the company will be stored
        - company: dict
            The company to delete

        Returns:
        - dict:
            The deleted company
        """
        
        collection: Collection = self.db[collection_name]
        result = collection.find_one_and_delete({"name": company_name}, {"_id": 0})
        
        if result:
            return {
                "status": "success",
                "message": "Company deleted successfully",
                "data": result
            }
        else:
            return {
                "status": "failure",
                "message": "Company not found"
            }

    def update_company(self, collection_name: str, company_name: str, updated_data: dict) -> dict:
        """
        Update an existing Company in a collection

        Parameters:
        - collection_name: str
            The name of the collection where the Company is stored
        - company_name: str
            The ID of the Company to update
        - updated_data: dict
            The new data to update the Company with

        Returns:
        - dict:
            The updated Company data or a success message
        """
        collection: Collection = self.db[collection_name]

        result = collection.update_one(
            {"name": company_name}, 
            {"$set": updated_data}
        )

        if result.matched_count == 0:
            return {"status": "failure", "message": "Company not found"}

        updated_data["id"] = company_name 
        return {"status": "success", "message": "Company updated successfully", "data": updated_data}

    def get_all_medicines(self, collection_name: str) -> list:
        """
        Get all items from a collection

        Parameters:
        - collection_name: str
            The name of the collection

        Returns:
        - list
            A list of all medicines in the collection

        """

        collection: Collection = self.db[collection_name]
        medicines = list(collection.find({}, {"_id": 0}))
        return medicines

    def get_medicine_by_name(self, collection_name: str, name: str) -> dict:
        """
        Retrieve an medicine by its name from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the user will be stored
        - name: str
            The name of the medicine to retrieve

        Returns:
        - dict or None:
            The medicine if found, None otherwise

        """
        collection: Collection = self.db[collection_name]
        medicine = collection.find_one({"name": str(name)}, {"_id": 0})
        return medicine

    def insert_medicine(self, collection_name: str, medicine: dict) -> dict:
        """
        Insert an medicine into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the medicine will be stored
        - medicine: dict
            The medicine to insert

        Returns:
        - dict:
            The inserted medicine
        """
        medicine["id"] = str(uuid4())[:self.ID_LENGTH]
        collection: Collection = self.db[collection_name]
        medicine_id = collection.insert_one(medicine).inserted_id
        return {
            "id": str(medicine_id),
            **medicine
        }

    def delete_medicine(self, collection_name: str, medicine_name: dict) -> dict:
        """
        Delete an medicine into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the medicine will be stored
        - medicine: dict
            The medicine to delete

        Returns:
        - dict:
            The deleted medicine
        """
        
        collection: Collection = self.db[collection_name]
        result = collection.find_one_and_delete({"name": medicine_name}, {"_id": 0})
        
        if result:
            return {
                "status": "success",
                "message": "medicine deleted successfully",
                "data": result
            }
        else:
            return {
                "status": "failure",
                "message": "medicine not found"
            }

    def update_medicine(self, collection_name: str, medicine_name: str, updated_data: dict) -> dict:
        """
        Update an existing medicine in a collection

        Parameters:
        - collection_name: str
            The name of the collection where the medicine is stored
        - medicine_name: str
            The ID of the medicine to update
        - updated_data: dict
            The new data to update the medicine with

        Returns:
        - dict:
            The updated medicine data or a success message
        """
        collection: Collection = self.db[collection_name]

        result = collection.update_one(
            {"name": medicine_name}, 
            {"$set": updated_data}
        )

        if result.matched_count == 0:
            return {"status": "failure", "message": "medicine not found"}

        updated_data["id"] = medicine_name 
        return {"status": "success", "message": "medicine updated successfully", "data": updated_data}
