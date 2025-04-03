from src.db.schemas.model_schema import ModelSchema

class MedicineSchema(ModelSchema):
    bson_type: str = "object"
    required: list = ["name", "dosage", "total_boxes", "providers"]
    properties: dict = {
        "name": {
            "bson_type": "string",
            "description": "Name of the medicine"
        },
        "dosage": {
            "bson_type": "string",
            "description": "Dosage of the medicine (e.g., 500mg)"
        },
        "historical_data": {
            "bson_type": "object",
            "description": "Historical data for the last 12 months"
        },
        "amount_per_satelite": {
            "bson_type": "object",
            "description": "Amount of medicine per satellite location"
        },
        "total_boxes": {
            "bson_type": "int",
            "description": "Total number of boxes available"
        },
        "providers": {
            "bson_type": "array",
            "items": {
                "bson_type": "string"
            },
            "description": "List of medicine providers"
        }
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }
