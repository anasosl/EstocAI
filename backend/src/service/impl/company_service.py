from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db

class CompanyService(ItemServiceMeta):

    @staticmethod
    def get_company(email: str) -> HttpResponseModel:
        """Get company by email method implementation"""
        company = db.get_company_by_email('company', email)
        if not company:
            return HttpResponseModel(
                message=HTTPResponses.COMPANY_NOT_FOUND().message,
                status_code=HTTPResponses.COMPANY_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.COMPANY_FOUND().message,
                status_code=HTTPResponses.COMPANY_FOUND().status_code,
                data=company,
            )

    @staticmethod
    def get_companies():
        """Get companies method implementation"""
        companies = db.get_all_companies('company')
        if not companies:
            return HttpResponseModel(
                message=HTTPResponses.COMPANY_NOT_FOUND().message,
                status_code=HTTPResponses.COMPANY_NOT_FOUND().status_code,
            )

        return HttpResponseModel(
                message=HTTPResponses.COMPANY_FOUND().message,
                status_code=HTTPResponses.COMPANY_FOUND().status_code,
                data=companies,
            )

    @staticmethod
    def create_company(data):
        """ Create a new company """
        new_company = db.insert_company('company', data)

        return HttpResponseModel(
            message=HTTPResponses.COMPANY_CREATED().message,
            status_code=HTTPResponses.COMPANY_CREATED().status_code
        )

    @staticmethod
    def delete_company(company_name):
        """ Deletes a company """
        delete_company = db.delete_company('company', company_name)

        if delete_company['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.COMPANY_DELETED().message,
                status_code=HTTPResponses.COMPANY_DELETED().status_code,
            )
        else:
            return HttpResponseModel(
                message=HTTPResponses.COMPANY_NOT_FOUND().message,
                status_code=HTTPResponses.COMPANY_NOT_FOUND().status_code,
            )
    
    @staticmethod
    def update_company(company_name, company_data):
        """ Updates a new user """
        updated_company = db.update_company('company', company_name, company_data)

        if updated_company['status'] == 'success':
            return HttpResponseModel(
                message=HTTPResponses.COMPANY_UPDATED().message,
                status_code=HTTPResponses.COMPANY_UPDATED().status_code,
            )
        return HttpResponseModel(
            message=HTTPResponses.COMPANY_NOT_FOUND().message,
            status_code=HTTPResponses.COMPANY_NOT_FOUND().status_code,
        )
