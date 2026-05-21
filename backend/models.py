from sqlalchemy import DECIMAL, Enum, ForeignKey, String, Text
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

    jobs: Mapped[list["Job"]] = relationship("Job", back_populates="broker")
    applications: Mapped[list["Application"]] = relationship("Application", back_populates="student")


class Job(Base):
    __tablename__ = "jobs"

    job_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    salary: Mapped[float] = mapped_column(DECIMAL(10, 2), nullable=False)
    location: Mapped[str] = mapped_column(String(100), nullable=False)
    broker_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)

    broker: Mapped["User"] = relationship("User", back_populates="jobs")
    applications: Mapped[list["Application"]] = relationship("Application", back_populates="job")


class Application(Base):
    __tablename__ = "applications"

    application_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.job_id"), nullable=False)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    status: Mapped[str] = mapped_column(
        Enum("Pending", "Accepted", "Rejected", name="application_status"),
        nullable=False,
        default="Pending",
    )

    job: Mapped["Job"] = relationship("Job", back_populates="applications")
    student: Mapped["User"] = relationship("User", back_populates="applications")
