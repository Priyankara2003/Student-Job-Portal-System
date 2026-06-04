from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import or_
from sqlalchemy.orm import Session

from auth import create_access_token, get_current_user, get_password_hash, verify_password
from database import get_db
from models import Application, Job, User
from schemas import (
    ApplicantOut,
    ApplicationOut,
    JobCreate,
    JobDetail,
    JobOut,
    JobUpdate,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserOut,
    UserUpdate,
)


app = FastAPI(title="Job Portal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Portal API"}


@app.post("/auth/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    role = payload.role.strip().title()
    if role not in {"Student", "Broker"}:
        raise HTTPException(status_code=400, detail="Role must be Student or Broker")

    user = User(
        name=payload.name,
        email=payload.email,
        password=get_password_hash(payload.password),
        role=role,
        contact_no=payload.contact_no,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post("/auth/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.user_id)})
    return TokenResponse(access_token=token)


@app.get("/users/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.put("/users/me", response_model=UserOut)
def update_me(
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if payload.name is not None:
        current_user.name = payload.name
    if payload.contact_no is not None:
        current_user.contact_no = payload.contact_no
    if payload.role is not None:
        role = payload.role.strip().title()
        if role not in {"Student", "Broker"}:
            raise HTTPException(status_code=400, detail="Role must be Student or Broker")
        current_user.role = role
    db.commit()
    db.refresh(current_user)
    return current_user


@app.get("/jobs", response_model=list[JobOut])
def list_jobs(
    search: str | None = Query(default=None, max_length=100),
    category: str | None = Query(default=None, max_length=50),
    db: Session = Depends(get_db),
):
    query = db.query(Job)
    if search:
        like_value = f"%{search}%"
        query = query.filter(or_(Job.title.ilike(like_value), Job.description.ilike(like_value)))
    if category:
        query = query.filter(Job.category == category)
    return query.order_by(Job.created_at.desc()).all()


@app.get("/jobs/{job_id}", response_model=JobDetail)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    broker = db.query(User).filter(User.user_id == job.broker_id).first()
    return JobDetail(
        job_id=job.job_id,
        title=job.title,
        description=job.description,
        salary=float(job.salary),
        location=job.location,
        category=job.category,
        broker_id=job.broker_id,
        created_at=job.created_at,
        broker_name=broker.name if broker else None,
        broker_email=broker.email if broker else None,
    )


@app.get("/jobs/mine", response_model=list[JobOut])
def get_my_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "Broker":
        raise HTTPException(status_code=403, detail="Only brokers can access this")
    return db.query(Job).filter(Job.broker_id == current_user.user_id).all()


@app.post("/jobs", response_model=JobOut, status_code=status.HTTP_201_CREATED)
def create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "Broker":
        raise HTTPException(status_code=403, detail="Only brokers can post jobs")
    job = Job(
        title=payload.title,
        description=payload.description,
        salary=payload.salary,
        location=payload.location,
        category=payload.category,
        broker_id=current_user.user_id,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@app.put("/jobs/{job_id}", response_model=JobOut)
def update_job(
    job_id: int,
    payload: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.query(Job).filter(Job.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.role != "Broker" or job.broker_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this job")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job


@app.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.query(Job).filter(Job.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.role != "Broker" or job.broker_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this job")

    db.delete(job)
    db.commit()
    return None


@app.post("/jobs/{job_id}/apply", response_model=ApplicationOut, status_code=status.HTTP_201_CREATED)
def apply_to_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "Student":
        raise HTTPException(status_code=403, detail="Only students can apply")
    job = db.query(Job).filter(Job.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing = (
        db.query(Application)
        .filter(Application.job_id == job_id, Application.student_id == current_user.user_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already applied to this job")

    application = Application(job_id=job_id, student_id=current_user.user_id)
    db.add(application)
    db.commit()
    db.refresh(application)

    return ApplicationOut(
        application_id=application.application_id,
        job_id=application.job_id,
        student_id=application.student_id,
        status=application.status,
        applied_at=application.applied_at,
        job_title=job.title,
        company_name=job.broker.name if job.broker else None,
    )


@app.get("/applications/me", response_model=list[ApplicationOut])
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "Student":
        raise HTTPException(status_code=403, detail="Only students can access this")

    applications = (
        db.query(Application)
        .filter(Application.student_id == current_user.user_id)
        .order_by(Application.applied_at.desc())
        .all()
    )

    results: list[ApplicationOut] = []
    for application in applications:
        job = db.query(Job).filter(Job.job_id == application.job_id).first()
        broker = job.broker if job else None
        results.append(
            ApplicationOut(
                application_id=application.application_id,
                job_id=application.job_id,
                student_id=application.student_id,
                status=application.status,
                applied_at=application.applied_at,
                job_title=job.title if job else None,
                company_name=broker.name if broker else None,
            )
        )
    return results


@app.get("/employer/applicants", response_model=list[ApplicantOut])
def employer_applicants(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "Broker":
        raise HTTPException(status_code=403, detail="Only brokers can access this")

    results: list[ApplicantOut] = []
    applications = (
        db.query(Application)
        .join(Job, Application.job_id == Job.job_id)
        .filter(Job.broker_id == current_user.user_id)
        .order_by(Application.applied_at.desc())
        .all()
    )

    for application in applications:
        student = db.query(User).filter(User.user_id == application.student_id).first()
        job = db.query(Job).filter(Job.job_id == application.job_id).first()
        if student and job:
            results.append(
                ApplicantOut(
                    student_name=student.name,
                    student_email=student.email,
                    job_title=job.title,
                    status=application.status,
                    applied_at=application.applied_at,
                )
            )
    return results


@app.patch("/applications/{application_id}", response_model=ApplicationOut)
def update_application_status(
    application_id: int,
    status_value: str = Query(alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "Broker":
        raise HTTPException(status_code=403, detail="Only brokers can update status")

    application = db.query(Application).filter(Application.application_id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    job = db.query(Job).filter(Job.job_id == application.job_id).first()
    if not job or job.broker_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized for this application")

    normalized_status = status_value.strip().title()
    if normalized_status not in {"Pending", "Accepted", "Rejected"}:
        raise HTTPException(status_code=400, detail="Status must be Pending, Accepted, or Rejected")

    application.status = normalized_status
    db.commit()
    db.refresh(application)
    return ApplicationOut(
        application_id=application.application_id,
        job_id=application.job_id,
        student_id=application.student_id,
        status=application.status,
        applied_at=application.applied_at,
        job_title=job.title,
        company_name=job.broker.name if job.broker else None,
    )
