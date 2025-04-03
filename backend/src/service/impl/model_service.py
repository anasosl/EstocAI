from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db

class ModelService(ItemServiceMeta):

    @staticmethod
    # TODO: Prevision
    def get_prediction(name: str) -> HttpResponseModel:
        pass

    @staticmethod
    # TODO: Get report
    def get_report(name: str) -> HttpResponseModel:
        pass
