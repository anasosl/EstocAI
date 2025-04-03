from fastapi import APIRouter, status, Depends
from src.schemas.response import HttpResponseModel
from src.service.impl.company_service import CompanyService
from src.utils.hash_password import hash_password
from src.schemas.company import CompanyCreateModel, CompanyUpdateModel
from src.utils.auth import get_current_user
from typing import Optional

router = APIRouter()

@router.get(
    "/{name}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve a company by its name",
    tags=["company"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got company by name",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Company not found",
        }
    },
)
def get_company(name: str) -> HttpResponseModel:
    """
    Get company by name.

    Parameters:
    - name: The name of the company to retrieve.

    Returns:
    - The company with the specified name.

    Raises:
    - HTTPException 404: If the company is not found.

    """
    company_get_response = CompanyService.get_company(name)
    return company_get_response


@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all companies",
    tags=["company"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all the companies",
        }
    },
)
def get_company() -> HttpResponseModel:
    """
    Get all companies.
    Returns:
    - A list of all companies.
    """
    companies_list_response = CompanyService.get_companies()
    return companies_list_response

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Create a new company",
    tags=["company"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new company",
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Invalid input data",
        },
    },
)
def create_company(company: CompanyCreateModel) -> HttpResponseModel:
    """ 
    Create a new company
        Returns:
        - The new created company
    """
    hashed_password = hash_password(company.password)
    company.password = hashed_password
    new_company_created = CompanyService.create_company(company.model_dump())
    return new_company_created

@router.delete(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Delete a company",
    tags=["company"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully deleted a company",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Invalid input data",
        },
    },
)
def delete_company(name: str) -> HttpResponseModel:
    """
    Delete company by name.

    Parameters:
    - name: The name of the company to be deleted.

    Returns:
    - The company with the specified ID.

    Raises:
    - HTTPException 404: If the the company does not exist

    """
    company_delete_response = CompanyService.delete_company(name)
    return company_delete_response

@router.patch(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Update a company",
    tags=["company"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully updated a company",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Invalid input data",
        },
    },
)
def update_company(name: str, company_data: CompanyUpdateModel) -> HttpResponseModel:
    """
    Update company by name.

    Parameters:
    - name: The name of the company to be updated.

    Returns:
    - The company with the specified name.

    Raises:
    - HTTPException 404: If the the company does not exist

    """
    company_data = company_data.model_dump()
    company_data = {key: value for key, value in company_data.items() if value is not None}
    user_get_response = CompanyService.update_company(name, company_data)
    return user_get_response
