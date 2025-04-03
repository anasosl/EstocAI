from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db

class NotificationService(ItemServiceMeta):

    @staticmethod
    def get_all_notifications_by_type(type: str) -> HttpResponseModel:
        """Get item by id method implementation"""
        notificatons = db.get_all_notifications_by_type('notification', type)
        if not notificatons:
            return HttpResponseModel(
                message=HTTPResponses.NOTIFICATION_NOT_FOUND().message,
                status_code=HTTPResponses.NOTIFICATION_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.NOTIFICATION_FOUND().message,
                status_code=HTTPResponses.NOTIFICATION_FOUND().status_code,
                data=notificatons,
            )

    @staticmethod
    def get_all_notifications():
        """Get users method implementation"""
        notifications = db.get_all_notifications('notification')
        if not notifications:
            return HttpResponseModel(
                message=HTTPResponses.NOTIFICATION_NOT_FOUND().message,
                status_code=HTTPResponses.NOTIFICATION_NOT_FOUND().status_code,
            )

        return HttpResponseModel(
                message=HTTPResponses.NOTIFICATION_FOUND().message,
                status_code=HTTPResponses.NOTIFICATION_FOUND().status_code,
                data=notifications,
            )

    @staticmethod
    def create_notification(data):
        """ Create a new user """
        new_notification = db.insert_user('notification', data)

        return HttpResponseModel(
            message=HTTPResponses.NOTIFICATION_CREATED().message,
            status_code=HTTPResponses.NOTIFICATION_CREATED().status_code
        )

    @staticmethod
    def delete_notification(notification_id):
        """ Deletes a user """
        delete_notification = db.delete_notification('notification', notification_id)

        if delete_notification['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.NOTIFICATION_DELETED().message,
                status_code=HTTPResponses.NOTIFICATION_DELETED().status_code,
            )
        else:
            return HttpResponseModel(
                message=HTTPResponses.NOTIFICATION_NOT_FOUND().message,
                status_code=HTTPResponses.NOTIFICATION_NOT_FOUND().status_code,
            )