from database import SessionLocal

from models import Certification
from models import Education
from models import Experience
from models import KnowledgeGap
from models import Project
from models import Skill
from models import WebsiteSettings


def seed_database():

    db = SessionLocal()


    try:

        # ====================================================
        # WEBSITE SETTINGS
        # ====================================================

        if (
            db.query(
                WebsiteSettings
            ).count()
            ==
            0
        ):

            settings = WebsiteSettings(

                site_name="Manas.AI",

                badge=(
                    "AI ENGINEER × "
                    "SOFTWARE DEVELOPER"
                ),

                hero_title=(
                    "Don't just read "
                    "my portfolio."
                ),

                hero_highlight=(
                    "Evaluate me."
                ),

                hero_description=(
                    "Software Developer focused "
                    "on Generative AI, RAG systems, "
                    "Python/FastAPI, backend engineering, "
                    "full-stack applications and "
                    "computer vision."
                ),

                about_text=(
                    "AI-focused Software Developer "
                    "combining practical backend "
                    "engineering with Generative AI, "
                    "RAG and computer vision."
                ),

                email=(
                    "immanaspandey@gmail.com"
                ),

                phone=(
                    "+919369328122"
                ),

                linkedin=(
                    "https://linkedin.com/"
                    "in/pandeymanas01"
                ),

                location="India",

                resume_path=(
                    "assets/resume/"
                    "Manas_Pandey_Resume.pdf"
                ),

            )


            db.add(
                settings
            )


        # ====================================================
        # EXPERIENCE
        # ====================================================

        if (
            db.query(
                Experience
            ).count()
            ==
            0
        ):

            experiences = [

                Experience(

                    company=(
                        "iLogitek Business Solutions"
                    ),

                    role=(
                        "Senior Software Developer"
                    ),

                    start_date="May 2026",

                    end_date="Present",

                    description=(
                        "Backend services using "
                        "FastAPI, Django and Flask. "
                        "REST APIs, automation, "
                        "database integration, testing "
                        "and Docker deployment."
                    ),

                    technologies=(
                        "Python, FastAPI, Django, "
                        "Flask, MySQL, PostgreSQL, "
                        "MongoDB, Docker"
                    ),

                    display_order=1,

                ),


                Experience(

                    company=(
                        "Vinayan India Consulting"
                    ),

                    role=(
                        "Software Developer"
                    ),

                    start_date="May 2025",

                    end_date="December 2025",

                    description=(
                        "Built an edge-deployed "
                        "vehicle e-challan system "
                        "using computer vision, OCR, "
                        "FastAPI and MongoDB."
                    ),

                    technologies=(
                        "Python, YOLOv8, OpenCV, "
                        "OCR, FastAPI, MongoDB"
                    ),

                    display_order=2,

                ),


                Experience(

                    company="CRIS",

                    role=(
                        "Software Developer Intern"
                    ),

                    start_date="July 2024",

                    end_date="September 2024",

                    description=(
                        "Railway freight demand "
                        "forecasting using Python, "
                        "EDA, feature engineering "
                        "and FastAPI endpoints."
                    ),

                    technologies=(
                        "Python, FastAPI, "
                        "Machine Learning"
                    ),

                    display_order=3,

                ),

            ]


            db.add_all(
                experiences
            )


        # ====================================================
        # PROJECTS
        # ====================================================

        if (
            db.query(
                Project
            ).count()
            ==
            0
        ):

            projects = [

                Project(

                    title=(
                        "RAG Knowledge Assistant"
                    ),

                    category=(
                        "Generative AI / RAG"
                    ),

                    short_description=(
                        "Document-grounded AI "
                        "assistant using embeddings, "
                        "semantic retrieval and "
                        "LLM generation."
                    ),

                    detailed_description=(
                        "Documents are split into "
                        "chunks and converted into "
                        "embeddings. User questions "
                        "are semantically matched "
                        "against evidence before "
                        "LLM generation."
                    ),

                    technologies=(
                        "Python, FastAPI, RAG, "
                        "SentenceTransformers, Groq"
                    ),

                    architecture=(
                        "Question -> FastAPI -> "
                        "Embedding -> Semantic Search -> "
                        "Top-K Evidence -> Groq LLM -> "
                        "Grounded Answer"
                    ),

                    project_type=(
                        "Portfolio Project"
                    ),

                    is_featured=True,

                    display_order=1,

                ),


                Project(

                    title=(
                        "Resume Shortlisting AI"
                    ),

                    category=(
                        "AI / NLP"
                    ),

                    short_description=(
                        "AI-assisted resume-to-job "
                        "description matching system."
                    ),

                    detailed_description=(
                        "Compares candidate resumes "
                        "with job requirements using "
                        "text extraction, skill "
                        "normalization and semantic "
                        "matching."
                    ),

                    technologies=(
                        "Python, FastAPI, NLP, "
                        "Embeddings"
                    ),

                    architecture=(
                        "JD + Resume -> Extraction -> "
                        "Requirement Mapping -> "
                        "Semantic Matching -> "
                        "Score + Evidence"
                    ),

                    project_type=(
                        "Portfolio Project"
                    ),

                    is_featured=True,

                    display_order=2,

                ),


                Project(

                    title=(
                        "AI Content Studio"
                    ),

                    category=(
                        "Generative AI"
                    ),

                    short_description=(
                        "AI application for creating "
                        "social-media content based "
                        "on topic, tone and objective."
                    ),

                    technologies=(
                        "Python, FastAPI, "
                        "Generative AI, Groq"
                    ),

                    architecture=(
                        "User Input -> Prompt Builder -> "
                        "LLM -> Structured Content"
                    ),

                    project_type=(
                        "Portfolio Project"
                    ),

                    display_order=3,

                ),


                Project(

                    title=(
                        "Vehicle E-Challan / ANPR"
                    ),

                    category=(
                        "Computer Vision"
                    ),

                    short_description=(
                        "Vehicle detection and "
                        "license-plate recognition "
                        "system."
                    ),

                    detailed_description=(
                        "Laser-triggered edge system "
                        "using YOLOv8, OpenCV and OCR "
                        "for vehicle and registration "
                        "number extraction."
                    ),

                    technologies=(
                        "Python, YOLOv8, OpenCV, OCR, "
                        "FastAPI, MongoDB"
                    ),

                    architecture=(
                        "Laser Trigger -> Camera -> "
                        "YOLOv8 -> OpenCV -> OCR -> "
                        "FastAPI -> MongoDB"
                    ),

                    result=(
                        "Approximately 40% reduction "
                        "in manual review effort."
                    ),

                    project_type=(
                        "Resume Project"
                    ),

                    is_featured=True,

                    display_order=4,

                ),


                Project(

                    title=(
                        "SimpleTech Training Platform"
                    ),

                    category=(
                        "Full Stack"
                    ),

                    short_description=(
                        "Training institute "
                        "management platform."
                    ),

                    technologies=(
                        "FastAPI, React, MySQL, "
                        "Redis, Celery, Docker, Nginx"
                    ),

                    architecture=(
                        "React -> FastAPI -> MySQL -> "
                        "Redis/Celery -> Docker -> Nginx"
                    ),

                    project_type=(
                        "Resume Project"
                    ),

                    display_order=5,

                ),


                Project(

                    title="MindHeal",

                    category=(
                        "Full Stack"
                    ),

                    short_description=(
                        "Mental wellness platform "
                        "with appointments and "
                        "real-time chat."
                    ),

                    technologies=(
                        "React, FastAPI, MySQL, "
                        "WebSocket, Redis, JWT, AWS"
                    ),

                    architecture=(
                        "React -> FastAPI -> "
                        "JWT/OAuth -> MySQL -> "
                        "Redis/WebSocket"
                    ),

                    project_type=(
                        "Resume Project"
                    ),

                    display_order=6,

                ),


                Project(

                    title="SecureAuthX",

                    category=(
                        "Security / ML"
                    ),

                    short_description=(
                        "Authentication platform "
                        "with anomaly detection."
                    ),

                    technologies=(
                        "Python, Django, Flask, JWT, "
                        "MySQL, Machine Learning"
                    ),

                    architecture=(
                        "Login -> Authentication -> "
                        "Risk Analysis -> "
                        "Step-up Verification"
                    ),

                    project_type=(
                        "Resume Project"
                    ),

                    display_order=7,

                ),

            ]


            db.add_all(
                projects
            )


        # ====================================================
        # SKILLS
        # ====================================================

        if (
            db.query(
                Skill
            ).count()
            ==
            0
        ):

            skills = [

                Skill(
                    name="Python",
                    category="Programming",
                    display_order=1
                ),

                Skill(
                    name="FastAPI",
                    category="Backend",
                    display_order=2
                ),

                Skill(
                    name="Django",
                    category="Backend",
                    display_order=3
                ),

                Skill(
                    name="Flask",
                    category="Backend",
                    display_order=4
                ),

                Skill(
                    name="LangChain",
                    category="AI / LLM",
                    display_order=5
                ),

                Skill(
                    name="LangGraph",
                    category="AI / LLM",
                    display_order=6
                ),

                Skill(
                    name="RAG",
                    category="AI / LLM",
                    display_order=7
                ),

                Skill(
                    name="YOLOv8",
                    category="Computer Vision",
                    display_order=8
                ),

                Skill(
                    name="OpenCV",
                    category="Computer Vision",
                    display_order=9
                ),

                Skill(
                    name="OCR",
                    category="Computer Vision",
                    display_order=10
                ),

                Skill(
                    name="React",
                    category="Frontend",
                    display_order=11
                ),

                Skill(
                    name="MySQL",
                    category="Database",
                    display_order=12
                ),

                Skill(
                    name="PostgreSQL",
                    category="Database",
                    display_order=13
                ),

                Skill(
                    name="MongoDB",
                    category="Database",
                    display_order=14
                ),

                Skill(
                    name="Redis",
                    category="Database",
                    display_order=15
                ),

                Skill(
                    name="Docker",
                    category="DevOps",
                    display_order=16
                ),

                Skill(
                    name="AWS",
                    category="Cloud",
                    display_order=17
                ),

            ]


            db.add_all(
                skills
            )


        # ====================================================
        # EDUCATION
        # ====================================================

        if (
            db.query(
                Education
            ).count()
            ==
            0
        ):

            education = Education(

                institution=(
                    "Sunder Deep Engineering College"
                ),

                degree=(
                    "Bachelor of Technology "
                    "in Computer Science Engineering"
                ),

                start_year="2021",

                end_year="2025",

                location=(
                    "Ghaziabad, Uttar Pradesh"
                ),

                description=(
                    "Affiliated to AKTU."
                ),

            )


            db.add(
                education
            )


        # ====================================================
        # CERTIFICATIONS
        # ====================================================

        if (
            db.query(
                Certification
            ).count()
            ==
            0
        ):

            certifications = [

                Certification(

                    name=(
                        "Microsoft Azure "
                        "AI Fundamentals"
                    ),

                    issuer="Microsoft",

                    issue_date="July 2026",

                    display_order=1,

                ),

                Certification(

                    name=(
                        "HackerRank 5-Star "
                        "Python"
                    ),

                    issuer="HackerRank",

                    display_order=2,

                ),

                Certification(

                    name=(
                        "HackerRank 5-Star "
                        "SQL"
                    ),

                    issuer="HackerRank",

                    display_order=3,

                ),

            ]


            db.add_all(
                certifications
            )


        # ====================================================
        # KNOWLEDGE GAPS
        # ====================================================

        if (
            db.query(
                KnowledgeGap
            ).count()
            ==
            0
        ):

            gap = KnowledgeGap(

                topic="Kafka",

                statement=(
                    "There is currently no verified "
                    "professional or project Kafka "
                    "experience in the supplied evidence."
                ),

            )


            db.add(
                gap
            )


        db.commit()


        print(
            "Portfolio database seeded successfully."
        )


    except Exception:

        db.rollback()

        raise


    finally:

        db.close()