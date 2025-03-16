""" Login routes """

from fastapi import APIRouter, status
from fastapi import Depends
from passlib.context import CryptContext
from src.schemas.login import UserLogin
from src.service.impl.user_service import UserService
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.utils.auth import create_jwt_token, get_current_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Login route",
    tags=["login"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully logged",
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Invalid credentials",
        },
    },
)
async def login(login: UserLogin):
    user = UserService.get_user(login.username)
    if user.data is None or not pwd_context.verify(login.password, user.data["password"]):
        return HttpResponseModel(
            message=HTTPResponses.INVALID_CREDENTIALS().message,
            status_code=HTTPResponses.INVALID_CREDENTIALS().status_code,
        )
    token_data = {"sub": user.data['username']}
    token = create_jwt_token(data=token_data)
    return HttpResponseModel(
        message="Login successful",
        status_code=status.HTTP_200_OK,
        data={"access_token": token, "token_type": "bearer"}
    )

@router.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello {current_user['sub']}! You are authenticated."}
