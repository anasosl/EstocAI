def user_entity(item) -> dict:
    """
    Returns a dict of the item entity
    """
    return {
        "username": item["username"],
        "created_at": item["created_at"],
    }
