import os

from datetime import datetime
from datetime import timedelta
from datetime import timezone

import bcrypt

from dotenv import load_dotenv

from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from jose import JWTError
from jose import jwt


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()


ADMIN_EMAIL = os.getenv(
    "ADMIN_EMAIL"
)


ADMIN_PASSWORD_HASH = os.getenv(
    "ADMIN_PASSWORD_HASH"
)


JWT_SECRET = os.getenv(
    "JWT_SECRET"
)


JWT_ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOURS = 12


# ============================================================
# VALIDATION
# ============================================================

if not ADMIN_EMAIL:

    raise RuntimeError(
        "ADMIN_EMAIL missing in .env"
    )


if not ADMIN_PASSWORD_HASH:

    raise RuntimeError(
        "ADMIN_PASSWORD_HASH missing in .env"
    )


if not JWT_SECRET:

    raise RuntimeError(
        "JWT_SECRET missing in .env"
    )


# ============================================================
# SECURITY
# ============================================================

security = HTTPBearer()


# ============================================================
# PASSWORD VERIFICATION
# ============================================================

def verify_password(
    plain_password: str,
    hashed_password: str
):

    try:

        password_bytes = (
            plain_password.encode(
                "utf-8"
            )
        )

        hash_bytes = (
            hashed_password.encode(
                "utf-8"
            )
        )


        # bcrypt passwords must not exceed
        # 72 encoded bytes.

        if len(password_bytes) > 72:

            return False


        return bcrypt.checkpw(
            password_bytes,
            hash_bytes
        )


    except Exception as error:

        print(
            "Password verification error:",
            error
        )

        return False


# ============================================================
# ADMIN AUTHENTICATION
# ============================================================

def authenticate_admin(
    email: str,
    password: str
):

    if not email:

        return False


    if not password:

        return False


    if (
        email.strip().lower()
        !=
        ADMIN_EMAIL.strip().lower()
    ):

        return False


    return verify_password(

        password,

        ADMIN_PASSWORD_HASH

    )


# ============================================================
# JWT TOKEN
# ============================================================

def create_access_token(
    email: str
):

    expire = (

        datetime.now(
            timezone.utc
        )

        +

        timedelta(
            hours=
                ACCESS_TOKEN_EXPIRE_HOURS
        )

    )


    payload = {

        "sub":
            email,

        "exp":
            expire,

        "type":
            "admin_access"

    }


    token = jwt.encode(

        payload,

        JWT_SECRET,

        algorithm=
            JWT_ALGORITHM

    )


    return token


# ============================================================
# ADMIN AUTHORIZATION
# ============================================================

def require_admin(

    credentials:
        HTTPAuthorizationCredentials
        =
        Depends(
            security
        )

):

    token = (
        credentials.credentials
    )


    try:

        payload = jwt.decode(

            token,

            JWT_SECRET,

            algorithms=[
                JWT_ALGORITHM
            ]

        )


        email = payload.get(
            "sub"
        )


        token_type = payload.get(
            "type"
        )


        if not email:

            raise HTTPException(

                status_code=
                    status.HTTP_401_UNAUTHORIZED,

                detail=
                    "Invalid admin token"

            )


        if (
            token_type
            !=
            "admin_access"
        ):

            raise HTTPException(

                status_code=
                    status.HTTP_401_UNAUTHORIZED,

                detail=
                    "Invalid token type"

            )


        if (
            email.strip().lower()
            !=
            ADMIN_EMAIL.strip().lower()
        ):

            raise HTTPException(

                status_code=
                    status.HTTP_401_UNAUTHORIZED,

                detail=
                    "Invalid admin account"

            )


        return email


    except JWTError:

        raise HTTPException(

            status_code=
                status.HTTP_401_UNAUTHORIZED,

            detail=
                "Invalid or expired token"

        )