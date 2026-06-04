"""add jobs category

Revision ID: 07c35d4c2e1e
Revises: 0001_create_tables
Create Date: 2026-06-05 04:51:06.978681

"""
from alembic import op
import sqlalchemy as sa


revision = '07c35d4c2e1e'
down_revision = '0001_create_tables'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('jobs', sa.Column('category', sa.String(length=50), nullable=True))


def downgrade() -> None:
    op.drop_column('jobs', 'category')
