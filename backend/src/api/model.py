from fastapi import APIRouter, status, Depends
from src.schemas.response import HttpResponseModel
from src.service.impl.model_service import ModelService

router = APIRouter()

@router.get(
    "/prediction",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Get model predictions",
    tags=["model"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got a prediction",
        }
    },
)
def get_prediction() -> HttpResponseModel:
    """
    Get model predictions

    Parameters:
    - id: The id of the model to get predictions from

    Returns:
    - The prediction from the model

    """
    return ModelService.get_prediction()

@router.get(
    "/report",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Get model report",
    tags=["model"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got a report",
        }
    },
)
def get_report() -> HttpResponseModel:
    """
    Get model report

    Parameters:
    - id: The id of the model to get a report from

    Returns:
    - The report from the model

    """
    return ModelService.get_report()

@router.get(
    "/report/{name}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Get model report",
    tags=["model"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got a report",
        }
    },
)
def get_report(name: str) -> HttpResponseModel:
    """
    Get model report

    Parameters:
    - id: The id of the model to get a report from

    Returns:
    - The report from the model

    """
    return ModelService.get_report_by_name(name)