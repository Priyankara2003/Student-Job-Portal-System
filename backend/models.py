from datetime import datetime

from sqlalchemy import DECIMAL, DateTime, Enum, ForeignKey, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(Enum("Student", "Broker", name="user_role"), nullable=False)
    contact_no: Mapped[str | None] = mapped_column(String(15))
    bio: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime | None] = mapped_column(DateTime, server_default=func.now())

    jobs: Mapped[list["Job"]] = relationship("Job", back_populates="broker")
    applications: Mapped[list["Application"]] = relationship("Application", back_populates="student")


class Job(Base):
    __tablename__ = "jobs"

    job_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str | None] = mapped_column(String(50))
    salary: Mapped[float] = mapped_column(DECIMAL(10, 2), nullable=False)
    location: Mapped[str] = mapped_column(String(100), nullable=False)
    broker_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    created_at: Mapped[datetime | None] = mapped_column(DateTime, server_default=func.now())

    broker: Mapped["User"] = relationship("User", back_populates="jobs")
    applications: Mapped[list["Application"]] = relationship("Application", back_populates="job")


class Application(Base):
    __tablename__ = "applications"
    __table_args__ = (UniqueConstraint("job_id", "student_id", name="unique_application"),)

    application_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.job_id"), nullable=False)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    status: Mapped[str] = mapped_column(
        Enum("Pending", "Accepted", "Rejected", name="application_status"),
        nullable=False,
        default="Pending",
    )
    applied_at: Mapped[datetime | None] = mapped_column(DateTime, server_default=func.now())

    job: Mapped["Job"] = relationship("Job", back_populates="applications")
    student: Mapped["User"] = relationship("User", back_populates="applications")
