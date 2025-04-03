from fastapi import APIRouter
from src.api import users, login, company, medicine, notification, model

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(company.router, prefix="/company", tags=["company"])
api_router.include_router(medicine.router, prefix="/medicine", tags=["medicine"])
api_router.include_router(notification.router, prefix="/notification", tags=["notifications"])
api_router.include_router(model.router, prefix="/model", tags=["model"])