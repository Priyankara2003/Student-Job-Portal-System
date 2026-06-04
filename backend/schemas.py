from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    role: str
    contact_no: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=255)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(UserBase):
    user_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    contact_no: Optional[str] = None
    role: Optional[str] = None


class JobBase(BaseModel):
    title: str
    description: str
    salary: float
    location: str
    category: Optional[str] = None


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    salary: Optional[float] = None
    location: Optional[str] = None
    category: Optional[str] = None


class JobOut(JobBase):
    job_id: int
    broker_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class JobDetail(JobOut):
    broker_name: Optional[str] = None
    broker_email: Optional[EmailStr] = None


class ApplicationCreate(BaseModel):
    job_id: int


class ApplicationOut(BaseModel):
    application_id: int
    job_id: int
    student_id: int
    status: str
    applied_at: Optional[datetime] = None
    job_title: Optional[str] = None
    company_name: Optional[str] = None

    class Config:
        from_attributes = True


class ApplicantOut(BaseModel):
    student_name: str
    student_email: EmailStr
    job_title: str
    status: str
    applied_at: Optional[datetime] = None
