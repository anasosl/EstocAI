from fastapi import APIRouter, status, Depends
from src.schemas.response import HttpResponseModel
from src.service.impl.medicine_service import MedicineService
from src.schemas.medicine import MedicineCreateModel, MedicineUpdateModel
from src.utils.auth import get_current_user

router = APIRouter()

@router.get(
    "/{name}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve a medicine by its name",
    tags=["medicine"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got medicine by name",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Medicine not found",
        }
    },
)
def get_medicine(name: str, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Get medicine by name.
    
    Parameters:
    - name: The name of the medicine to retrieve.
    
    Returns:
    - The medicine with the specified name.
    
    Raises:
    - HTTPException 404: If the medicine is not found.
    """
    return MedicineService.get_medicine(name)


@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all medicines",
    tags=["medicine"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all medicines",
        }
    },
)
def get_medicines(current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Get all medicines.
    Returns:
    - A list of all medicines.
    """
    return MedicineService.get_medicines()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Create a new medicine",
    tags=["medicine"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new medicine",
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Invalid input data",
        },
    },
)
def create_medicine(medicine: MedicineCreateModel, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """ 
    Create a new medicine.
    
    Returns:
    - The newly created medicine.
    """
    return MedicineService.create_medicine(medicine.model_dump())

@router.delete(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Delete a medicine",
    tags=["medicine"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully deleted a medicine",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Medicine not found",
        },
    },
)
def delete_medicine(name: str, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Delete medicine by name.
    
    Parameters:
    - name: The name of the medicine to be deleted.
    
    Returns:
    - A confirmation of deletion.
    
    Raises:
    - HTTPException 404: If the medicine does not exist.
    """
    return MedicineService.delete_medicine(name)

@router.patch(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Update a medicine",
    tags=["medicine"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully updated a medicine",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Medicine not found",
        },
    },
)
def update_medicine(name: str, medicine_data: MedicineUpdateModel, current_user: dict = Depends(get_current_user)) -> HttpResponseModel:
    """
    Update medicine by name.
    
    Parameters:
    - name: The name of the medicine to be updated.
    
    Returns:
    - The updated medicine data.
    
    Raises:
    - HTTPException 404: If the medicine does not exist.
    """
    medicine_data = medicine_data.model_dump()
    medicine_data = {key: value for key, value in medicine_data.items() if value is not None}
    return MedicineService.update_medicine(name, medicine_data)
