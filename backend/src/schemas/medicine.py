from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class MedicineCreateModel(BaseModel):
    name: str
    dosage: str
    historical_data: Dict[str, Any] # Last 12 months
    amount_per_satelite: Dict[str, Any]  
    total_boxes: int
    providers: List[str]  

class MedicineUpdateModel(BaseModel):
    name: Optional[str] = None
    dosage: Optional[str] = None
    historical_data: Optional[str] = None
    amount_per_satelite: Optional[str] = None
    total_boxes: Optional[str] = None
    providers: Optional[str] = None
