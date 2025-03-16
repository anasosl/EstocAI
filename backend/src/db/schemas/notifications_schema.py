
from src.db.schemas.model_schema import ModelSchema

class NotificationSchema(ModelSchema):
    bson_type: str = "object"
    required: list = ["medicine_name", "type"]
    properties: dict = {
        "medicine_name": {
            "bson_type": "string",
            "description": "The medicine's name"
        },
        "type": {
            "bson_type": "string",
            "description": "Type of notification"
        },
        "description": {
            "bson_type": "string",
            "description": "Notification description"
        },
        "action": {
            "bson_type": "string",
            "description": "Action to be taken"
        },
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }