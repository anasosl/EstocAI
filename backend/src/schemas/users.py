from typing import Optional
from pydantic import BaseModel

class UserCreateModel(BaseModel):
    name: str
    email: str
    username: str
    password: str
    role: str
    company: str

class UserUpdateModel(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    username: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
