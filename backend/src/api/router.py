from fastapi import APIRouter
from src.api import users, login, company, medicine

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(company.router, prefix="/company", tags=["company"])
api_router.include_router(medicine.router, prefix="/medicine", tags=["medicine"])