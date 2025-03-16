from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db

class MedicineService(ItemServiceMeta):

    @staticmethod
    def get_medicine(name: str) -> HttpResponseModel:
        """Get medicine by name method implementation"""
        medicine = db.get_medicine_by_name('medicine', name)
        if not medicine:
            return HttpResponseModel(
                message=HTTPResponses.MEDICINE_NOT_FOUND().message,
                status_code=HTTPResponses.MEDICINE_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.MEDICINE_FOUND().message,
                status_code=HTTPResponses.MEDICINE_FOUND().status_code,
                data=medicine,
            )

    @staticmethod
    def get_medicines():
        """Get medicines method implementation"""
        medicines = db.get_all_medicines('medicine')
        if not medicines:
            return HttpResponseModel(
                message=HTTPResponses.MEDICINE_NOT_FOUND().message,
                status_code=HTTPResponses.MEDICINE_NOT_FOUND().status_code,
            )

        return HttpResponseModel(
                message=HTTPResponses.MEDICINE_FOUND().message,
                status_code=HTTPResponses.MEDICINE_FOUND().status_code,
                data=medicines,
            )

    @staticmethod
    def create_medicine(data):
        """ Create a new medicine """
        new_medicine = db.insert_medicine('medicine', data)

        return HttpResponseModel(
            message=HTTPResponses.MEDICINE_CREATED().message,
            status_code=HTTPResponses.MEDICINE_CREATED().status_code
        )

    @staticmethod
    def delete_medicine(medicine_name):
        """ Deletes a medicine """
        delete_medicine = db.delete_medicine('medicine', medicine_name)

        if delete_medicine['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.MEDICINE_DELETED().message,
                status_code=HTTPResponses.MEDICINE_DELETED().status_code,
            )
        else:
            return HttpResponseModel(
                message=HTTPResponses.MEDICINE_NOT_FOUND().message,
                status_code=HTTPResponses.MEDICINE_NOT_FOUND().status_code,
            )
    
    @staticmethod
    def update_medicine(medicine_name, medicine_data):
        """ Updates a new user """
        updated_medicine = db.update_medicine('medicine', medicine_name, medicine_data)

        if updated_medicine['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.MEDICINE_UPDATED().message,
                status_code=HTTPResponses.MEDICINE_UPDATED().status_code,
            )
        return HttpResponseModel(
            message=HTTPResponses.MEDICINE_NOT_FOUND().message,
            status_code=HTTPResponses.MEDICINE_NOT_FOUND().status_code,
        )
