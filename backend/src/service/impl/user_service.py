from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db

class UserService(ItemServiceMeta):

    @staticmethod
    def get_user(username: str) -> HttpResponseModel:
        """Get item by id method implementation"""
        user = db.get_user_by_username('users', username)
        if not user:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.USER_FOUND().message,
                status_code=HTTPResponses.USER_FOUND().status_code,
                data=user,
            )

    @staticmethod
    def get_users():
        """Get users method implementation"""
        users = db.get_all_users('users')
        if not users:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code,
            )

        return HttpResponseModel(
                message=HTTPResponses.USER_FOUND().message,
                status_code=HTTPResponses.USER_FOUND().status_code,
                data=users,
            )

    @staticmethod
    def create_user(data):
        """ Create a new user """
        new_user = db.insert_user('users', data)

        return HttpResponseModel(
            message=HTTPResponses.USER_CREATED().message,
            status_code=HTTPResponses.USER_CREATED().status_code
        )

    @staticmethod
    def delete_user(user_id):
        """ Deletes a user """
        delete_user = db.delete_user('users', user_id)

        if delete_user['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.USER_DELETED().message,
                status_code=HTTPResponses.USER_DELETED().status_code,
            )
        else:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code,
            )
    
    @staticmethod
    def update_user(user_id, user_data):
        """ Updates a new user """
        updated_user = db.update_user('users', user_id, user_data)

        if updated_user['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.USER_UPDATED().message,
                status_code=HTTPResponses.USER_UPDATED().status_code,
            )
        return HttpResponseModel(
            message=HTTPResponses.USER_NOT_FOUND().message,
            status_code=HTTPResponses.USER_NOT_FOUND().status_code,
        )
