import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./manas_portfolio.db"
)


# ============================================================
# DATABASE URL NORMALIZATION
# ============================================================

# Neon commonly gives:
#
# postgresql://user:password@host/database?sslmode=require
#
# SQLAlchemy + psycopg 3 works cleanly with:
#
# postgresql+psycopg://...
#
# This allows you to paste the Neon connection string
# directly into Render without manually changing it.

if DATABASE_URL.startswith(
    "postgresql://"
):

    DATABASE_URL = (

        "postgresql+psycopg://"

        +

        DATABASE_URL[
            len("postgresql://"):
        ]

    )


# ============================================================
# ENGINE CONFIGURATION
# ============================================================

if DATABASE_URL.startswith(
    "sqlite"
):

    engine = create_engine(

        DATABASE_URL,

        connect_args={
            "check_same_thread":
                False
        },

        pool_pre_ping=True,

    )

else:

    engine = create_engine(

        DATABASE_URL,

        pool_pre_ping=True,

        pool_recycle=300,

    )


# ============================================================
# SESSION
# ============================================================

SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine,

)


# ============================================================
# SQLALCHEMY BASE
# ============================================================

Base = declarative_base()


# ============================================================
# FASTAPI DEPENDENCY
# ============================================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()