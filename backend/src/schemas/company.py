from pydantic import BaseModel
from typing import Optional

class CompanyCreateModel(BaseModel):
    name: str
    address: str
    cep: str
    city: str
    country: str
    email: str
    phone: str

class CompanyUpdateModel(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    cep: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
