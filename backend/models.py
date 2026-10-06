from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from database import Base


# ============================================================
# WEBSITE SETTINGS
# ============================================================

class WebsiteSettings(Base):

    __tablename__ = "website_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    site_name = Column(
        String(120),
        default="Manas.AI"
    )

    badge = Column(
        String(200),
        default="AI ENGINEER × SOFTWARE DEVELOPER"
    )

    hero_title = Column(
        String(300),
        default="Don't just read my portfolio."
    )

    hero_highlight = Column(
        String(200),
        default="Evaluate me."
    )

    hero_description = Column(
        Text,
        nullable=True
    )

    about_text = Column(
        Text,
        nullable=True
    )

    email = Column(
        String(200),
        nullable=True
    )

    phone = Column(
        String(50),
        nullable=True
    )

    linkedin = Column(
        String(500),
        nullable=True
    )

    location = Column(
        String(200),
        nullable=True
    )

    resume_path = Column(
        String(500),
        nullable=True
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


# ============================================================
# EXPERIENCE
# ============================================================

class Experience(Base):

    __tablename__ = "experiences"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    company = Column(
        String(250),
        nullable=False
    )

    role = Column(
        String(250),
        nullable=False
    )

    start_date = Column(
        String(100),
        nullable=True
    )

    end_date = Column(
        String(100),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    technologies = Column(
        Text,
        nullable=True
    )

    display_order = Column(
        Integer,
        default=0
    )

    is_active = Column(
        Boolean,
        default=True
    )

    include_in_ai = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


# ============================================================
# PROJECTS
# ============================================================

class Project(Base):

    __tablename__ = "projects"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(250),
        nullable=False
    )

    category = Column(
        String(150),
        nullable=True
    )

    short_description = Column(
        Text,
        nullable=True
    )

    detailed_description = Column(
        Text,
        nullable=True
    )

    technologies = Column(
        Text,
        nullable=True
    )

    architecture = Column(
        Text,
        nullable=True
    )

    result = Column(
        Text,
        nullable=True
    )

    project_type = Column(
        String(100),
        default="Portfolio Project"
    )

    display_order = Column(
        Integer,
        default=0
    )

    is_featured = Column(
        Boolean,
        default=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    include_in_ai = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


# ============================================================
# SKILLS
# ============================================================

class Skill(Base):

    __tablename__ = "skills"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(150),
        nullable=False
    )

    category = Column(
        String(150),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    evidence_level = Column(
        String(100),
        default="Skill"
    )

    display_order = Column(
        Integer,
        default=0
    )

    is_active = Column(
        Boolean,
        default=True
    )

    include_in_ai = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


# ============================================================
# EDUCATION
# ============================================================

class Education(Base):

    __tablename__ = "education"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    institution = Column(
        String(300),
        nullable=False
    )

    degree = Column(
        String(300),
        nullable=True
    )

    start_year = Column(
        String(50),
        nullable=True
    )

    end_year = Column(
        String(50),
        nullable=True
    )

    location = Column(
        String(200),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    display_order = Column(
        Integer,
        default=0
    )

    is_active = Column(
        Boolean,
        default=True
    )

    include_in_ai = Column(
        Boolean,
        default=True
    )


# ============================================================
# CERTIFICATIONS
# ============================================================

class Certification(Base):

    __tablename__ = "certifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(300),
        nullable=False
    )

    issuer = Column(
        String(250),
        nullable=True
    )

    issue_date = Column(
        String(100),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    display_order = Column(
        Integer,
        default=0
    )

    is_active = Column(
        Boolean,
        default=True
    )

    include_in_ai = Column(
        Boolean,
        default=True
    )


# ============================================================
# KNOWN AI GAPS
# ============================================================

class KnowledgeGap(Base):

    __tablename__ = "knowledge_gaps"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    topic = Column(
        String(200),
        nullable=False
    )

    statement = Column(
        Text,
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )