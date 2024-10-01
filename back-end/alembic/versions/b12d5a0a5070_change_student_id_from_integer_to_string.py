"""Change student_id from Integer to String

Revision ID: b12d5a0a5070
Revises: c6d56d44a7c0
Create Date: 2024-09-30 00:09:13.317414

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b12d5a0a5070'
down_revision: Union[str, None] = 'c6d56d44a7c0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create a new table with the desired schema
    op.create_table(
        'users_new',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('student_id', sa.String(), unique=True, index=True),
        sa.Column('username', sa.String(), unique=True, index=True),
        sa.Column('password', sa.String()),
        sa.Column('role', sa.Enum('user', 'admin', name='userrole'), nullable=True),
        sa.Column('profile_pic', sa.String(), nullable=True),
        sa.Column('bio', sa.String()),
    )

    # Copy data from the old table to the new table
    op.execute('INSERT INTO users_new (id, student_id, username, password, role, profile_pic, bio) '
               'SELECT id, CAST(student_id AS TEXT), username, password, role, profile_pic, bio '
               'FROM users')

    # Drop the old table
    op.drop_table('users')

    # Rename the new table to the original table name
    op.rename_table('users_new', 'users')

def downgrade() -> None:
    # Reverse the process to downgrade
    op.create_table(
        'users_old',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('student_id', sa.Integer(), unique=True, index=True),
        sa.Column('username', sa.String(), unique=True, index=True),
        sa.Column('password', sa.String()),
        sa.Column('role', sa.Enum('user', 'admin', name='userrole'), nullable=True),
        sa.Column('profile_pic', sa.String(), nullable=True),
        sa.Column('bio', sa.String()),
    )

    op.execute('INSERT INTO users_old (id, student_id, username, password, role, profile_pic, bio) '
               'SELECT id, CAST(student_id AS INTEGER), username, password, role, profile_pic, bio '
               'FROM users')

    op.drop_table('users')

    op.rename_table('users_old', 'users')

