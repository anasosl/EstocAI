from typing import Optional
from pydantic import BaseModel

class UserCreateModel(BaseModel):
    name: str
    cep: str
    city: str
    state: str
    address: str
    email: str
    phone: str
    password: str
    confirmed_password: str

class UserUpdateModel(BaseModel):
    name: Optional[str] = None
    cep: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
