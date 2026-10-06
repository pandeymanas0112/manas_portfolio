const API_BASE =
    (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        ? "http://127.0.0.1:8000"
        : "https://manas-ai-api.onrender.com";


let adminToken =
    localStorage.getItem(
        "manas_admin_token"
    );


let cache = {
    experience: [],
    projects: [],
    skills: [],
    education: [],
    certifications: [],
    gaps: []
};


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value);

    return div.innerHTML;
}


function toast(
    message,
    isError = false
) {

    const element =
        document.getElementById(
            "toast"
        );

    element.textContent =
        message;

    element.style.borderColor =
        isError
        ? "rgba(255,100,124,.35)"
        : "rgba(75,227,164,.25)";

    element.classList.add(
        "show"
    );

    setTimeout(
        () => {
            element.classList.remove(
                "show"
            );
        },
        2500
    );
}


async function apiRequest(
    path,
    options = {}
) {

    const headers = {
        "Content-Type":
            "application/json",
        ...(options.headers || {})
    };


    if (adminToken) {

        headers.Authorization =
            `Bearer ${adminToken}`;

    }


    const response =
        await fetch(
            API_BASE + path,
            {
                ...options,
                headers
            }
        );


    if (
        response.status === 401
    ) {

        logoutAdmin();

        throw new Error(
            "Admin session expired."
        );

    }


    let data = null;


    try {

        data =
            await response.json();

    }

    catch {

        data = null;

    }


    if (!response.ok) {

        throw new Error(
            data?.detail ||
            "Request failed"
        );

    }


    return data;
}


/* =========================================================
   LOGIN
========================================================= */

async function loginAdmin() {

    const email =
        document
        .getElementById(
            "loginEmail"
        )
        .value
        .trim();


    const password =
        document
        .getElementById(
            "loginPassword"
        )
        .value;


    const errorBox =
        document.getElementById(
            "errorMessage"
        );


    errorBox.textContent = "";


    try {

        const response =
            await fetch(
                `${API_BASE}/api/admin/login`,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            email,
                            password
                        })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Login failed"
            );

        }


        adminToken =
            data.access_token;


        localStorage.setItem(
            "manas_admin_token",
            adminToken
        );


        showAdmin();

        await loadAll();

    }

    catch(error) {

        errorBox.textContent =
            error.message;

    }

}


function logoutAdmin() {

    localStorage.removeItem(
        "manas_admin_token"
    );

    adminToken = null;

    document
    .getElementById(
        "adminApp"
    )
    .classList
    .add(
        "hidden"
    );

    document
    .getElementById(
        "loginScreen"
    )
    .classList
    .remove(
        "hidden"
    );

}


function showAdmin() {

    document
    .getElementById(
        "loginScreen"
    )
    .classList
    .add(
        "hidden"
    );


    document
    .getElementById(
        "adminApp"
    )
    .classList
    .remove(
        "hidden"
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

document
.querySelectorAll(
    ".nav-btn[data-page]"
)
.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                document
                .querySelectorAll(
                    ".nav-btn[data-page]"
                )
                .forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                document
                .querySelectorAll(
                    ".page"
                )
                .forEach(
                    page =>
                        page.classList.remove(
                            "active"
                        )
                );


                const pageName =
                    button.dataset.page;


                document
                .getElementById(
                    `page-${pageName}`
                )
                .classList.add(
                    "active"
                );


                document
                .getElementById(
                    "pageTitle"
                )
                .textContent =
                    button.textContent.trim();

            }
        );

    }
);


/* =========================================================
   LOAD EVERYTHING
========================================================= */

async function loadAll() {

    try {

        await Promise.all([
            loadDashboard(),
            loadSettings(),
            loadExperience(),
            loadProjects(),
            loadSkills(),
            loadEducation(),
            loadCertifications(),
            loadGaps()
        ]);

    }

    catch(error) {

        toast(
            error.message,
            true
        );

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

async function loadDashboard() {

    const data =
        await apiRequest(
            "/api/admin/dashboard"
        );


    document
    .getElementById(
        "dashboardStats"
    )
    .innerHTML = `

        ${statCard(
            "Projects",
            data.projects
        )}

        ${statCard(
            "Experience",
            data.experience
        )}

        ${statCard(
            "Skills",
            data.skills
        )}

        ${statCard(
            "AI Chunks",
            data.ai_chunks
        )}

        ${statCard(
            "Education",
            data.education
        )}

        ${statCard(
            "Certifications",
            data.certifications
        )}

        ${statCard(
            "Known Gaps",
            data.knowledge_gaps
        )}

    `;

}


function statCard(
    label,
    value
) {

    return `

    <div class="stat-card">

        <span>
            ${escapeHTML(label)}
        </span>

        <strong>
            ${escapeHTML(value)}
        </strong>

    </div>

    `;

}


/* =========================================================
   SETTINGS
========================================================= */

async function loadSettings() {

    const data =
        await apiRequest(
            "/api/admin/settings"
        );


    const fields = [
        "site_name",
        "badge",
        "hero_title",
        "hero_highlight",
        "hero_description",
        "about_text",
        "email",
        "phone",
        "linkedin",
        "location",
        "resume_path"
    ];


    fields.forEach(
        field => {

            const element =
                document.getElementById(
                    `settings_${field}`
                );

            if (element) {

                element.value =
                    data?.[field] || "";

            }

        }
    );

}


async function saveSettings() {

    const fields = [
        "site_name",
        "badge",
        "hero_title",
        "hero_highlight",
        "hero_description",
        "about_text",
        "email",
        "phone",
        "linkedin",
        "location",
        "resume_path"
    ];


    const payload = {};


    fields.forEach(
        field => {

            payload[field] =
                document
                .getElementById(
                    `settings_${field}`
                )
                .value
                .trim();

        }
    );


    await apiRequest(
        "/api/admin/settings",
        {
            method:"PUT",
            body:
                JSON.stringify(
                    payload
                )
        }
    );


    toast(
        "Website settings saved."
    );

}


/* =========================================================
   EXPERIENCE
========================================================= */

async function loadExperience() {

    cache.experience =
        await apiRequest(
            "/api/admin/experience"
        );

    renderExperience();

}


function renderExperience() {

    document
    .getElementById(
        "experienceTable"
    )
    .innerHTML = `

    <table>

    <thead>
    <tr>
        <th>ROLE</th>
        <th>COMPANY</th>
        <th>PERIOD</th>
        <th>AI</th>
        <th>ACTIONS</th>
    </tr>
    </thead>

    <tbody>

    ${
        cache.experience
        .map(
            item => `

            <tr>

                <td>
                    ${escapeHTML(item.role)}
                </td>

                <td>
                    ${escapeHTML(item.company)}
                </td>

                <td>
                    ${escapeHTML(item.start_date)}
                    —
                    ${escapeHTML(item.end_date)}
                </td>

                <td>
                    ${
                        item.include_in_ai
                        ? "✓"
                        : "—"
                    }
                </td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="showExperienceForm(${item.id})"
                    >
                    Edit
                    </button>

                    <button
                    class="danger-btn"
                    onclick="deleteExperience(${item.id})"
                    >
                    Delete
                    </button>

                </td>

            </tr>

            `
        )
        .join("")
    }

    </tbody>

    </table>

    `;

}


function showExperienceForm(
    id = null
) {

    const item =
        cache.experience.find(
            x => x.id === id
        ) || {};


    const form =
        document.getElementById(
            "experienceForm"
        );


    form.classList.remove(
        "hidden"
    );


    form.innerHTML = formCard(
        "Experience",
        `

        ${inputField(
            "Company",
            "exp_company",
            item.company
        )}

        ${inputField(
            "Role",
            "exp_role",
            item.role
        )}

        ${inputField(
            "Start Date",
            "exp_start",
            item.start_date
        )}

        ${inputField(
            "End Date",
            "exp_end",
            item.end_date
        )}

        ${textareaField(
            "Description",
            "exp_description",
            item.description
        )}

        ${textareaField(
            "Technologies",
            "exp_technologies",
            item.technologies
        )}

        ${inputField(
            "Display Order",
            "exp_order",
            item.display_order ?? 0,
            "number"
        )}

        ${checkboxField(
            "Active",
            "exp_active",
            item.is_active ?? true
        )}

        ${checkboxField(
            "Include in AI",
            "exp_ai",
            item.include_in_ai ?? true
        )}

        `,
        `saveExperience(${id ?? "null"})`
    );

}


async function saveExperience(
    id
) {

    const payload = {

        company:
            value("exp_company"),

        role:
            value("exp_role"),

        start_date:
            value("exp_start"),

        end_date:
            value("exp_end"),

        description:
            value("exp_description"),

        technologies:
            value("exp_technologies"),

        display_order:
            Number(
                value("exp_order")
            ),

        is_active:
            checked("exp_active"),

        include_in_ai:
            checked("exp_ai")

    };


    await apiRequest(

        id
        ? `/api/admin/experience/${id}`
        : "/api/admin/experience",

        {
            method:
                id
                ? "PUT"
                : "POST",

            body:
                JSON.stringify(
                    payload
                )
        }

    );


    hideForm(
        "experienceForm"
    );

    await loadExperience();

    await loadDashboard();

    toast(
        "Experience saved."
    );

}


async function deleteExperience(
    id
) {

    if (
        !confirm(
            "Delete this experience?"
        )
    ) return;


    await apiRequest(
        `/api/admin/experience/${id}`,
        {
            method:"DELETE"
        }
    );


    await loadExperience();

    await loadDashboard();

    toast(
        "Experience deleted."
    );

}


/* =========================================================
   PROJECTS
========================================================= */

async function loadProjects() {

    cache.projects =
        await apiRequest(
            "/api/admin/projects"
        );

    renderProjects();

}


function renderProjects() {

    document
    .getElementById(
        "projectTable"
    )
    .innerHTML = `

    <table>

    <thead>

    <tr>
        <th>PROJECT</th>
        <th>CATEGORY</th>
        <th>TYPE</th>
        <th>AI</th>
        <th>ACTIONS</th>
    </tr>

    </thead>

    <tbody>

    ${
        cache.projects
        .map(
            item => `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(item.title)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(item.category)}
                </td>

                <td>
                    ${escapeHTML(item.project_type)}
                </td>

                <td>
                    ${
                        item.include_in_ai
                        ? "✓"
                        : "—"
                    }
                </td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="showProjectForm(${item.id})"
                    >
                    Edit
                    </button>

                    <button
                    class="danger-btn"
                    onclick="deleteProject(${item.id})"
                    >
                    Delete
                    </button>

                </td>

            </tr>

            `
        )
        .join("")
    }

    </tbody>

    </table>

    `;

}


function showProjectForm(
    id = null
) {

    const item =
        cache.projects.find(
            x => x.id === id
        ) || {};


    const form =
        document.getElementById(
            "projectForm"
        );


    form.classList.remove(
        "hidden"
    );


    form.innerHTML = formCard(
        "Project",
        `

        ${inputField(
            "Title",
            "project_title",
            item.title
        )}

        ${inputField(
            "Category",
            "project_category",
            item.category
        )}

        ${textareaField(
            "Short Description",
            "project_short",
            item.short_description
        )}

        ${textareaField(
            "Detailed Description",
            "project_detail",
            item.detailed_description
        )}

        ${textareaField(
            "Technologies",
            "project_tech",
            item.technologies
        )}

        ${textareaField(
            "Architecture",
            "project_architecture",
            item.architecture
        )}

        ${textareaField(
            "Result / Outcome",
            "project_result",
            item.result
        )}

        ${inputField(
            "Project Type",
            "project_type",
            item.project_type ||
            "Portfolio Project"
        )}

        ${inputField(
            "Display Order",
            "project_order",
            item.display_order ?? 0,
            "number"
        )}

        ${checkboxField(
            "Featured",
            "project_featured",
            item.is_featured ?? false
        )}

        ${checkboxField(
            "Active",
            "project_active",
            item.is_active ?? true
        )}

        ${checkboxField(
            "Include in AI",
            "project_ai",
            item.include_in_ai ?? true
        )}

        `,
        `saveProject(${id ?? "null"})`
    );

}


async function saveProject(
    id
) {

    const payload = {

        title:
            value("project_title"),

        category:
            value("project_category"),

        short_description:
            value("project_short"),

        detailed_description:
            value("project_detail"),

        technologies:
            value("project_tech"),

        architecture:
            value(
                "project_architecture"
            ),

        result:
            value("project_result"),

        project_type:
            value("project_type"),

        display_order:
            Number(
                value("project_order")
            ),

        is_featured:
            checked(
                "project_featured"
            ),

        is_active:
            checked(
                "project_active"
            ),

        include_in_ai:
            checked(
                "project_ai"
            )

    };


    await apiRequest(

        id
        ? `/api/admin/projects/${id}`
        : "/api/admin/projects",

        {

            method:
                id
                ? "PUT"
                : "POST",

            body:
                JSON.stringify(
                    payload
                )

        }

    );


    hideForm(
        "projectForm"
    );


    await loadProjects();

    await loadDashboard();


    toast(
        "Project saved."
    );

}


async function deleteProject(
    id
) {

    if (
        !confirm(
            "Delete this project?"
        )
    ) return;


    await apiRequest(
        `/api/admin/projects/${id}`,
        {
            method:"DELETE"
        }
    );


    await loadProjects();

    await loadDashboard();

    toast(
        "Project deleted."
    );

}


/* =========================================================
   SKILLS
========================================================= */

async function loadSkills() {

    cache.skills =
        await apiRequest(
            "/api/admin/skills"
        );

    renderSkills();

}


function renderSkills() {

    document
    .getElementById(
        "skillTable"
    )
    .innerHTML = `

    <table>

    <thead>
    <tr>
        <th>SKILL</th>
        <th>CATEGORY</th>
        <th>EVIDENCE</th>
        <th>AI</th>
        <th>ACTIONS</th>
    </tr>
    </thead>

    <tbody>

    ${
        cache.skills
        .map(
            item => `

            <tr>

                <td>
                    ${escapeHTML(item.name)}
                </td>

                <td>
                    ${escapeHTML(item.category)}
                </td>

                <td>
                    ${escapeHTML(item.evidence_level)}
                </td>

                <td>
                    ${
                        item.include_in_ai
                        ? "✓"
                        : "—"
                    }
                </td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="showSkillForm(${item.id})"
                    >
                    Edit
                    </button>

                    <button
                    class="danger-btn"
                    onclick="deleteSkill(${item.id})"
                    >
                    Delete
                    </button>

                </td>

            </tr>

            `
        )
        .join("")
    }

    </tbody>

    </table>

    `;

}


function showSkillForm(
    id = null
) {

    const item =
        cache.skills.find(
            x => x.id === id
        ) || {};


    const form =
        document.getElementById(
            "skillForm"
        );


    form.classList.remove(
        "hidden"
    );


    form.innerHTML = formCard(
        "Skill",
        `

        ${inputField(
            "Skill Name",
            "skill_name",
            item.name
        )}

        ${inputField(
            "Category",
            "skill_category",
            item.category
        )}

        ${textareaField(
            "Description",
            "skill_description",
            item.description
        )}

        ${inputField(
            "Evidence Level",
            "skill_evidence",
            item.evidence_level ||
            "Skill"
        )}

        ${inputField(
            "Display Order",
            "skill_order",
            item.display_order ?? 0,
            "number"
        )}

        ${checkboxField(
            "Active",
            "skill_active",
            item.is_active ?? true
        )}

        ${checkboxField(
            "Include in AI",
            "skill_ai",
            item.include_in_ai ?? true
        )}

        `,
        `saveSkill(${id ?? "null"})`
    );

}


async function saveSkill(
    id
) {

    const payload = {

        name:
            value("skill_name"),

        category:
            value("skill_category"),

        description:
            value(
                "skill_description"
            ),

        evidence_level:
            value(
                "skill_evidence"
            ),

        display_order:
            Number(
                value("skill_order")
            ),

        is_active:
            checked("skill_active"),

        include_in_ai:
            checked("skill_ai")

    };


    await apiRequest(

        id
        ? `/api/admin/skills/${id}`
        : "/api/admin/skills",

        {

            method:
                id
                ? "PUT"
                : "POST",

            body:
                JSON.stringify(
                    payload
                )

        }

    );


    hideForm(
        "skillForm"
    );


    await loadSkills();

    await loadDashboard();

    toast(
        "Skill saved."
    );

}


async function deleteSkill(
    id
) {

    if (
        !confirm(
            "Delete this skill?"
        )
    ) return;


    await apiRequest(
        `/api/admin/skills/${id}`,
        {
            method:"DELETE"
        }
    );


    await loadSkills();

    await loadDashboard();

    toast(
        "Skill deleted."
    );

}


/* =========================================================
   EDUCATION
========================================================= */

async function loadEducation() {

    cache.education =
        await apiRequest(
            "/api/admin/education"
        );

    renderEducation();

}


function renderEducation() {

    document
    .getElementById(
        "educationTable"
    )
    .innerHTML = `

    <table>

    <thead>
    <tr>
        <th>DEGREE</th>
        <th>INSTITUTION</th>
        <th>PERIOD</th>
        <th>ACTIONS</th>
    </tr>
    </thead>

    <tbody>

    ${
        cache.education
        .map(
            item => `

            <tr>

                <td>
                    ${escapeHTML(item.degree)}
                </td>

                <td>
                    ${escapeHTML(item.institution)}
                </td>

                <td>
                    ${escapeHTML(item.start_year)}
                    —
                    ${escapeHTML(item.end_year)}
                </td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="showEducationForm(${item.id})"
                    >
                    Edit
                    </button>

                    <button
                    class="danger-btn"
                    onclick="deleteEducation(${item.id})"
                    >
                    Delete
                    </button>

                </td>

            </tr>

            `
        )
        .join("")
    }

    </tbody>

    </table>

    `;

}


function showEducationForm(
    id = null
) {

    const item =
        cache.education.find(
            x => x.id === id
        ) || {};


    const form =
        document.getElementById(
            "educationForm"
        );


    form.classList.remove(
        "hidden"
    );


    form.innerHTML = formCard(
        "Education",
        `

        ${inputField(
            "Institution",
            "edu_institution",
            item.institution
        )}

        ${inputField(
            "Degree",
            "edu_degree",
            item.degree
        )}

        ${inputField(
            "Start Year",
            "edu_start",
            item.start_year
        )}

        ${inputField(
            "End Year",
            "edu_end",
            item.end_year
        )}

        ${inputField(
            "Location",
            "edu_location",
            item.location
        )}

        ${textareaField(
            "Description",
            "edu_description",
            item.description
        )}

        ${inputField(
            "Display Order",
            "edu_order",
            item.display_order ?? 0,
            "number"
        )}

        ${checkboxField(
            "Active",
            "edu_active",
            item.is_active ?? true
        )}

        ${checkboxField(
            "Include in AI",
            "edu_ai",
            item.include_in_ai ?? true
        )}

        `,
        `saveEducation(${id ?? "null"})`
    );

}


async function saveEducation(
    id
) {

    const payload = {

        institution:
            value("edu_institution"),

        degree:
            value("edu_degree"),

        start_year:
            value("edu_start"),

        end_year:
            value("edu_end"),

        location:
            value("edu_location"),

        description:
            value("edu_description"),

        display_order:
            Number(
                value("edu_order")
            ),

        is_active:
            checked("edu_active"),

        include_in_ai:
            checked("edu_ai")

    };


    await apiRequest(

        id
        ? `/api/admin/education/${id}`
        : "/api/admin/education",

        {

            method:
                id
                ? "PUT"
                : "POST",

            body:
                JSON.stringify(
                    payload
                )

        }

    );


    hideForm(
        "educationForm"
    );


    await loadEducation();

    await loadDashboard();

    toast(
        "Education saved."
    );

}


async function deleteEducation(
    id
) {

    if (
        !confirm(
            "Delete this education record?"
        )
    ) return;


    await apiRequest(
        `/api/admin/education/${id}`,
        {
            method:"DELETE"
        }
    );


    await loadEducation();

    await loadDashboard();

    toast(
        "Education deleted."
    );

}


/* =========================================================
   CERTIFICATIONS
========================================================= */

async function loadCertifications() {

    cache.certifications =
        await apiRequest(
            "/api/admin/certifications"
        );

    renderCertifications();

}


function renderCertifications() {

    document
    .getElementById(
        "certificationTable"
    )
    .innerHTML = `

    <table>

    <thead>
    <tr>
        <th>CERTIFICATION</th>
        <th>ISSUER</th>
        <th>DATE</th>
        <th>ACTIONS</th>
    </tr>
    </thead>

    <tbody>

    ${
        cache.certifications
        .map(
            item => `

            <tr>

                <td>
                    ${escapeHTML(item.name)}
                </td>

                <td>
                    ${escapeHTML(item.issuer)}
                </td>

                <td>
                    ${escapeHTML(item.issue_date)}
                </td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="showCertificationForm(${item.id})"
                    >
                    Edit
                    </button>

                    <button
                    class="danger-btn"
                    onclick="deleteCertification(${item.id})"
                    >
                    Delete
                    </button>

                </td>

            </tr>

            `
        )
        .join("")
    }

    </tbody>

    </table>

    `;

}


function showCertificationForm(
    id = null
) {

    const item =
        cache.certifications.find(
            x => x.id === id
        ) || {};


    const form =
        document.getElementById(
            "certificationForm"
        );


    form.classList.remove(
        "hidden"
    );


    form.innerHTML = formCard(
        "Certification",
        `

        ${inputField(
            "Certification",
            "cert_name",
            item.name
        )}

        ${inputField(
            "Issuer",
            "cert_issuer",
            item.issuer
        )}

        ${inputField(
            "Issue Date",
            "cert_date",
            item.issue_date
        )}

        ${textareaField(
            "Description",
            "cert_description",
            item.description
        )}

        ${inputField(
            "Display Order",
            "cert_order",
            item.display_order ?? 0,
            "number"
        )}

        ${checkboxField(
            "Active",
            "cert_active",
            item.is_active ?? true
        )}

        ${checkboxField(
            "Include in AI",
            "cert_ai",
            item.include_in_ai ?? true
        )}

        `,
        `saveCertification(${id ?? "null"})`
    );

}


async function saveCertification(
    id
) {

    const payload = {

        name:
            value("cert_name"),

        issuer:
            value("cert_issuer"),

        issue_date:
            value("cert_date"),

        description:
            value(
                "cert_description"
            ),

        display_order:
            Number(
                value("cert_order")
            ),

        is_active:
            checked("cert_active"),

        include_in_ai:
            checked("cert_ai")

    };


    await apiRequest(

        id
        ? `/api/admin/certifications/${id}`
        : "/api/admin/certifications",

        {

            method:
                id
                ? "PUT"
                : "POST",

            body:
                JSON.stringify(
                    payload
                )

        }

    );


    hideForm(
        "certificationForm"
    );


    await loadCertifications();

    await loadDashboard();

    toast(
        "Certification saved."
    );

}


async function deleteCertification(
    id
) {

    if (
        !confirm(
            "Delete this certification?"
        )
    ) return;


    await apiRequest(
        `/api/admin/certifications/${id}`,
        {
            method:"DELETE"
        }
    );


    await loadCertifications();

    await loadDashboard();

    toast(
        "Certification deleted."
    );

}


/* =========================================================
   KNOWN GAPS
========================================================= */

async function loadGaps() {

    cache.gaps =
        await apiRequest(
            "/api/admin/gaps"
        );

    renderGaps();

}


function renderGaps() {

    document
    .getElementById(
        "gapTable"
    )
    .innerHTML = `

    <table>

    <thead>
    <tr>
        <th>TOPIC</th>
        <th>STATEMENT</th>
        <th>ACTIVE</th>
        <th>ACTIONS</th>
    </tr>
    </thead>

    <tbody>

    ${
        cache.gaps
        .map(
            item => `

            <tr>

                <td>
                    ${escapeHTML(item.topic)}
                </td>

                <td>
                    ${escapeHTML(item.statement)}
                </td>

                <td>
                    ${
                        item.is_active
                        ? "✓"
                        : "—"
                    }
                </td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="showGapForm(${item.id})"
                    >
                    Edit
                    </button>

                    <button
                    class="danger-btn"
                    onclick="deleteGap(${item.id})"
                    >
                    Delete
                    </button>

                </td>

            </tr>

            `
        )
        .join("")
    }

    </tbody>

    </table>

    `;

}


function showGapForm(
    id = null
) {

    const item =
        cache.gaps.find(
            x => x.id === id
        ) || {};


    const form =
        document.getElementById(
            "gapForm"
        );


    form.classList.remove(
        "hidden"
    );


    form.innerHTML = formCard(
        "Known Gap",
        `

        ${inputField(
            "Topic",
            "gap_topic",
            item.topic
        )}

        ${textareaField(
            "Statement",
            "gap_statement",
            item.statement
        )}

        ${checkboxField(
            "Active",
            "gap_active",
            item.is_active ?? true
        )}

        `,
        `saveGap(${id ?? "null"})`
    );

}


async function saveGap(
    id
) {

    const payload = {

        topic:
            value("gap_topic"),

        statement:
            value("gap_statement"),

        is_active:
            checked("gap_active")

    };


    await apiRequest(

        id
        ? `/api/admin/gaps/${id}`
        : "/api/admin/gaps",

        {

            method:
                id
                ? "PUT"
                : "POST",

            body:
                JSON.stringify(
                    payload
                )

        }

    );


    hideForm(
        "gapForm"
    );


    await loadGaps();

    await loadDashboard();

    toast(
        "Knowledge gap saved."
    );

}


async function deleteGap(
    id
) {

    if (
        !confirm(
            "Delete this gap?"
        )
    ) return;


    await apiRequest(
        `/api/admin/gaps/${id}`,
        {
            method:"DELETE"
        }
    );


    await loadGaps();

    await loadDashboard();

    toast(
        "Gap deleted."
    );

}


/* =========================================================
   REBUILD AI
========================================================= */

async function rebuildAI() {

    try {

        const result =
            await apiRequest(
                "/api/admin/rebuild-ai",
                {
                    method:"POST"
                }
            );


        await loadDashboard();


        toast(
            `AI knowledge rebuilt: ${result.chunks} chunks`
        );

    }

    catch(error) {

        toast(
            error.message,
            true
        );

    }

}


/* =========================================================
   FORM HELPERS
========================================================= */

function formCard(
    title,
    content,
    saveAction
) {

    return `

    <div
    style="
        border:1px solid rgba(255,255,255,.08);
        background:#080c14;
        border-radius:14px;
        padding:18px;
        margin-bottom:20px;
    "
    >

        <h3
        style="margin-bottom:17px"
        >
            ${
                escapeHTML(title)
            }
        </h3>


        <div class="form-grid">

            ${content}

        </div>


        <div class="actions">

            <button
            class="primary-btn"
            onclick="${saveAction}"
            >
            Save
            </button>

            <button
            class="secondary-btn"
            onclick="
            this.closest('.panel')
            .querySelector('[id$=Form]')
            .classList.add('hidden')
            "
            >
            Cancel
            </button>

        </div>

    </div>

    `;

}


function inputField(
    label,
    id,
    currentValue = "",
    type = "text"
) {

    return `

    <div class="field">

        <label>
            ${escapeHTML(label)}
        </label>

        <input
        type="${type}"
        id="${id}"
        value="${escapeHTML(
            currentValue ?? ""
        )}"
        >

    </div>

    `;

}


function textareaField(
    label,
    id,
    currentValue = ""
) {

    return `

    <div class="field full">

        <label>
            ${escapeHTML(label)}
        </label>

        <textarea
        id="${id}"
        >${escapeHTML(
            currentValue ?? ""
        )}</textarea>

    </div>

    `;

}


function checkboxField(
    label,
    id,
    isChecked
) {

    return `

    <div class="checkbox-row">

        <input
        type="checkbox"
        id="${id}"
        ${
            isChecked
            ? "checked"
            : ""
        }
        >

        <label for="${id}">
            ${escapeHTML(label)}
        </label>

    </div>

    `;

}


function value(id) {

    return document
        .getElementById(id)
        .value
        .trim();

}


function checked(id) {

    return document
        .getElementById(id)
        .checked;

}


function hideForm(id) {

    document
        .getElementById(id)
        .classList
        .add(
            "hidden"
        );

}


/* =========================================================
   PORTFOLIO LINK
========================================================= */

function openPortfolio() {

    window.open(
        "index.html",
        "_blank"
    );

}


/* =========================================================
   STARTUP
========================================================= */

async function initializeAdmin() {

    if (!adminToken) {

        return;

    }


    try {

        await apiRequest(
            "/api/admin/dashboard"
        );


        showAdmin();

        await loadAll();

    }

    catch {

        logoutAdmin();

    }

}


document
.getElementById(
    "loginPassword"
)
.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            loginAdmin();

        }

    }
);


initializeAdmin();