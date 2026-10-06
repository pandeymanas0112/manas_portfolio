from typing import Optional

from pydantic import BaseModel
from pydantic import ConfigDict


# ============================================================
# ADMIN LOGIN
# ============================================================

class AdminLogin(BaseModel):

    email: str

    password: str


class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"


# ============================================================
# WEBSITE SETTINGS
# ============================================================

class WebsiteSettingsUpdate(BaseModel):

    site_name: Optional[str] = None

    badge: Optional[str] = None

    hero_title: Optional[str] = None

    hero_highlight: Optional[str] = None

    hero_description: Optional[str] = None

    about_text: Optional[str] = None

    email: Optional[str] = None

    phone: Optional[str] = None

    linkedin: Optional[str] = None

    location: Optional[str] = None

    resume_path: Optional[str] = None


class WebsiteSettingsResponse(
    WebsiteSettingsUpdate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# EXPERIENCE
# ============================================================

class ExperienceCreate(BaseModel):

    company: str

    role: str

    start_date: Optional[str] = None

    end_date: Optional[str] = None

    description: Optional[str] = None

    technologies: Optional[str] = None

    display_order: int = 0

    is_active: bool = True

    include_in_ai: bool = True


class ExperienceUpdate(BaseModel):

    company: Optional[str] = None

    role: Optional[str] = None

    start_date: Optional[str] = None

    end_date: Optional[str] = None

    description: Optional[str] = None

    technologies: Optional[str] = None

    display_order: Optional[int] = None

    is_active: Optional[bool] = None

    include_in_ai: Optional[bool] = None


class ExperienceResponse(
    ExperienceCreate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# PROJECT
# ============================================================

class ProjectCreate(BaseModel):

    title: str

    category: Optional[str] = None

    short_description: Optional[str] = None

    detailed_description: Optional[str] = None

    technologies: Optional[str] = None

    architecture: Optional[str] = None

    result: Optional[str] = None

    project_type: str = "Portfolio Project"

    display_order: int = 0

    is_featured: bool = False

    is_active: bool = True

    include_in_ai: bool = True


class ProjectUpdate(BaseModel):

    title: Optional[str] = None

    category: Optional[str] = None

    short_description: Optional[str] = None

    detailed_description: Optional[str] = None

    technologies: Optional[str] = None

    architecture: Optional[str] = None

    result: Optional[str] = None

    project_type: Optional[str] = None

    display_order: Optional[int] = None

    is_featured: Optional[bool] = None

    is_active: Optional[bool] = None

    include_in_ai: Optional[bool] = None


class ProjectResponse(
    ProjectCreate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# SKILL
# ============================================================

class SkillCreate(BaseModel):

    name: str

    category: Optional[str] = None

    description: Optional[str] = None

    evidence_level: str = "Skill"

    display_order: int = 0

    is_active: bool = True

    include_in_ai: bool = True


class SkillUpdate(BaseModel):

    name: Optional[str] = None

    category: Optional[str] = None

    description: Optional[str] = None

    evidence_level: Optional[str] = None

    display_order: Optional[int] = None

    is_active: Optional[bool] = None

    include_in_ai: Optional[bool] = None


class SkillResponse(
    SkillCreate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# EDUCATION
# ============================================================

class EducationCreate(BaseModel):

    institution: str

    degree: Optional[str] = None

    start_year: Optional[str] = None

    end_year: Optional[str] = None

    location: Optional[str] = None

    description: Optional[str] = None

    display_order: int = 0

    is_active: bool = True

    include_in_ai: bool = True


class EducationUpdate(BaseModel):

    institution: Optional[str] = None

    degree: Optional[str] = None

    start_year: Optional[str] = None

    end_year: Optional[str] = None

    location: Optional[str] = None

    description: Optional[str] = None

    display_order: Optional[int] = None

    is_active: Optional[bool] = None

    include_in_ai: Optional[bool] = None


class EducationResponse(
    EducationCreate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# CERTIFICATIONS
# ============================================================

class CertificationCreate(BaseModel):

    name: str

    issuer: Optional[str] = None

    issue_date: Optional[str] = None

    description: Optional[str] = None

    display_order: int = 0

    is_active: bool = True

    include_in_ai: bool = True


class CertificationUpdate(BaseModel):

    name: Optional[str] = None

    issuer: Optional[str] = None

    issue_date: Optional[str] = None

    description: Optional[str] = None

    display_order: Optional[int] = None

    is_active: Optional[bool] = None

    include_in_ai: Optional[bool] = None


class CertificationResponse(
    CertificationCreate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# KNOWLEDGE GAP
# ============================================================

class KnowledgeGapCreate(BaseModel):

    topic: str

    statement: str

    is_active: bool = True


class KnowledgeGapUpdate(BaseModel):

    topic: Optional[str] = None

    statement: Optional[str] = None

    is_active: Optional[bool] = None


class KnowledgeGapResponse(
    KnowledgeGapCreate
):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )