"""create tables

Revision ID: 0001_create_tables
Revises: 
Create Date: 2026-05-22 00:00:00

"""
from alembic import op
import sqlalchemy as sa


revision = "0001_create_tables"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("user_id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("email", sa.String(length=100), nullable=False),
        sa.Column("password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.Enum("Student", "Broker", name="user_role"), nullable=False),
        sa.Column("contact_no", sa.String(length=15)),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )

    op.create_table(
        "jobs",
        sa.Column("job_id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("title", sa.String(length=150), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("salary", sa.Numeric(10, 2), nullable=False),
        sa.Column("location", sa.String(length=100), nullable=False),
        sa.Column("broker_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["broker_id"], ["users.user_id"], ondelete="CASCADE"),
    )

    op.create_table(
        "applications",
        sa.Column("application_id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("status", sa.Enum("Pending", "Accepted", "Rejected", name="application_status"), nullable=False, server_default="Pending"),
        sa.Column("applied_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.ForeignKeyConstraint(["job_id"], ["jobs.job_id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["student_id"], ["users.user_id"], ondelete="CASCADE"),
        sa.UniqueConstraint("job_id", "student_id", name="uq_application_job_student"),
    )


def downgrade() -> None:
    op.drop_table("applications")
    op.drop_table("jobs")
    op.drop_table("users")
