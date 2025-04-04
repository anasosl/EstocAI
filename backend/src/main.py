from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from src.api.router import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)