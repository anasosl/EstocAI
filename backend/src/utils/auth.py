import jwt
from fastapi import Security
from datetime import datetime, timedelta, timezone
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.schemas.response import HTTPResponses, HttpResponseModel

SECRET_KEY = "your_secret_key"  # TODO: Use the .env file to store this info.
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_jwt_token(token: str):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token if decoded_token["exp"] >= datetime.now(timezone.utc).timestamp() else None
    except jwt.PyJWTError:
        return None

security = HTTPBearer()
async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    payload = verify_jwt_token(token)
    if payload is None:
        return HttpResponseModel(
            message=HTTPResponses.INVALID_CREDENTIALS().message,
            status_code=HTTPResponses.INVALID_CREDENTIALS().status_code,
        )
    return payload