from typing import Optional
from pydantic import BaseModel

class HttpResponseModel(BaseModel):
    message: str
    status_code: int
    data: Optional[dict] | Optional[list] = None

class HTTPResponses:

    @staticmethod
    def USER_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="USER not found",
            status_code=404,
        )

    @staticmethod
    def USER_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="USER found",
            status_code=200,
        )

    @staticmethod
    def USER_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="USER created",
            status_code=201,
        )

    @staticmethod
    def USER_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="USER deleted",
            status_code=200,
        )

    @staticmethod
    def USER_UPDATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="USER updated",
            status_code=200,
        )

    @staticmethod
    def INVALID_CREDENTIALS() -> HttpResponseModel:
        return HttpResponseModel(
            message="Invalid credentials",
            status_code=400,
        )

    @staticmethod
    def SERVER_ERROR() -> HttpResponseModel:
        return HttpResponseModel(
            message="Server error",
            status_code=500,
        )
