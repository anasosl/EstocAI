def user_entity(item) -> dict:
    """
    Returns a dict of the item entity
    """
    return {
        "email": item["email"],
        "created_at": item["created_at"],
    }
