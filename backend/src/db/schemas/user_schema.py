from src.db.schemas.model_schema import ModelSchema

class UserSchema(ModelSchema):
    bson_type: str = "object"
    required: list = ["id", "email", "password"]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "The item's unique identifier"
        },
        "email": {
            "bson_type": "string",
            "description": "User's email"
        },
        "password": {
            "bson_type": "string",
            "description": "User's password"
        },
        "created_at": {
            "bson_type": "string",
            "description": "The item's creation time"
        }
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }