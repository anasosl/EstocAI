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
    def COMPANY_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="COMPANY not found",
            status_code=404,
        )

    @staticmethod
    def COMPANY_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="COMPANY found",
            status_code=200,
        )

    @staticmethod
    def COMPANY_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="COMPANY created",
            status_code=201,
        )

    @staticmethod
    def COMPANY_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="COMPANY deleted",
            status_code=200,
        )

    @staticmethod
    def COMPANY_UPDATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="COMPANY updated",
            status_code=200,
        )

    @staticmethod
    def MEDICINE_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="MEDICINE not found",
            status_code=404,
        )

    @staticmethod
    def MEDICINE_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="MEDICINE found",
            status_code=200,
        )

    @staticmethod
    def MEDICINE_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="MEDICINE created",
            status_code=201,
        )

    @staticmethod
    def MEDICINE_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="MEDICINE deleted",
            status_code=200,
        )

    @staticmethod
    def MEDICINE_UPDATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="MEDICINE updated",
            status_code=200,
        )

    @staticmethod
    def NOTIFICATION_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="NOTIFICATION not found",
            status_code=404,
        )

    @staticmethod
    def NOTIFICATION_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="NOTIFICATION found",
            status_code=200,
        )

    @staticmethod
    def NOTIFICATION_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="NOTIFICATION created",
            status_code=201,
        )

    @staticmethod
    def NOTIFICATION_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="NOTIFICATION deleted",
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
