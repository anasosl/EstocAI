from pydantic import BaseModel

class NotificationCreateModel(BaseModel):
    medicine_name: str
    type: str
    description: str
    action: str