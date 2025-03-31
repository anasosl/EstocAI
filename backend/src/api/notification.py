from fastapi import APIRouter, status, Depends
from src.schemas.response import HttpResponseModel
from src.service.impl.notification_service import NotificationService
from src.schemas.notification import NotificationCreateModel
from src.utils.auth import get_current_user

router = APIRouter()

@router.get(
    "/{type}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all notifications of a specific type",
    tags=["notifications"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got notifications by type",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Notification with the desired type was not found",
        }
    },
)
def get_notification_by_type(type: str, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Get all notifications by type

    Parameters:
    - type: The type of notifications to be retrieved

    Returns:
    - The notifications with the desired type

    Raises:
    - HTTPException 404: If there is any notification with the desired type

    """
    return NotificationService.get_all_notifications_by_type(type)


@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all notifications",
    tags=["notifications"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all the notifications",
        }
    },
)
def get_notifications(current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Get all notifications.
    Returns:
    - A list of all notifications.
    """

    return NotificationService.get_all_notifications()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Create a new notification",
    tags=["notifications"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new notification",
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Invalid input data",
        },
    },
)
def create_notification(data: NotificationCreateModel, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """ 
    Create a new notification
        Returns:
        - The new created notification
    """
    return NotificationService.create_notification(data.model_dump())

@router.delete(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Delete a new notifications",
    tags=["notifications"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully deleted a new notification",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Invalid input data",
        },
    },
)
def delete_notifications(notification_id: str, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Delete notification by ID.

    Parameters:
    - notification_id: The ID of the notification to be deleted.

    Returns:
    - The notification with the specified ID.

    Raises:
    - HTTPException 404: If the the notification does not exist

    """
    return NotificationService.delete_notification(notification_id)