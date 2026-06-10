"""add user bio column

Revision ID: a1b2c3d4e5f6
Revises: 07c35d4c2e1e
Create Date: 2026-06-10 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = '07c35d4c2e1e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('bio', sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column('users', 'bio')
