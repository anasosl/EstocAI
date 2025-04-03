def medicine_search_entity(item) -> dict:
    """
    Returns a dict of the medicine entity with selected attributes
    """
    return {
        "name": item["name"],
        "dosage": item["dosage"],
    }

def medicines_list_entity(items) -> list:
    """
    Returns a list of serialized medicine entities
    """
    return [medicine_search_entity(item) for item in items]
