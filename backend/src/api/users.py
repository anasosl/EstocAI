from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.user_service import UserService
from src.utils.hash_password import hash_password
from src.schemas.users import UserCreateModel, UserUpdateModel
import datetime

router = APIRouter()

@router.get(
    "/{email}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve an user by its email",
    tags=["users"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got user by email",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "User not found",
        }
    },
)
def get_user(email: str) -> HttpResponseModel:
    """
    Get user by name.

    Parameters:
    - email: The email of the user to retrieve.

    Returns:
    - The user with the specified email.

    Raises:
    - HTTPException 404: If the user is not found.

    """
    user_get_response = UserService.get_user(email)
    return user_get_response


@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all users",
    tags=["users"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all the users",
        }
    },
)
def get_user() -> HttpResponseModel:
    """
    Get all users.
    Returns:
    - A list of all users.
    """
    item_list_response = UserService.get_users()
    return item_list_response

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Create a new user",
    tags=["users"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new user",
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Invalid input data",
        },
    },
)
def create_user(user: UserCreateModel) -> HttpResponseModel:
    """ 
    Create a new user
        Returns:
        - The new created user
    """
    user_data = user.model_dump()
    user_data["password"] = hash_password(user.password)
    user_data["created_at"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    new_user_created = UserService.create_user(user_data)
    return new_user_created

@router.delete(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Delete a new user",
    tags=["users"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully deleted a new user",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Invalid input data",
        },
    },
)
def delete_user(user_id: str) -> HttpResponseModel:
    """
    Delete user by ID.

    Parameters:
    - user_id: The ID of the user to be deleted.

    Returns:
    - The user with the specified ID.

    Raises:
    - HTTPException 404: If the the user does not exist

    """
    user_get_response = UserService.delete_user(user_id)
    return user_get_response

@router.patch(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Update a new user",
    tags=["users"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully updated a new user",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Invalid input data",
        },
    },
)
def update_user(user_id: str, user_data: UserUpdateModel) -> HttpResponseModel:
    """
    Update user by ID.

    Parameters:
    - user_id: The ID of the user to be updated.

    Returns:
    - The user with the specified ID.

    Raises:
    - HTTPException 404: If the the user does not exist

    """
    user_data = user_data.model_dump()
    user_data = {key: value for key, value in user_data.items() if value is not None}
    user_get_response = UserService.update_user(user_id, user_data)
    return user_get_response
