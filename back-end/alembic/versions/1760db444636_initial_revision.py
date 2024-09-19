"""Initial revision

Revision ID: be777328a747
Revises: 
Create Date: 2024-09-17 22:48:16.678895

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

# revision identifiers, used by Alembic.
revision: str = 'be777328a747'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Check if the table already exists
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if 'users' not in inspector.get_table_names():
        # Create the 'users' table
        op.create_table(
            'users',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('username', sa.String, nullable=False, unique=True),
            sa.Column('password', sa.String, nullable=False),
            sa.Column('role', sa.String(length=5), nullable=True),
        )
        op.create_index('ix_users_username', 'users', ['username'], unique=True)
        op.create_index('ix_users_id', 'users', ['id'], unique=False)
    
    if 'problems' not in inspector.get_table_names():
        # Create the 'problems' table
        op.create_table(
            'problems',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('title', sa.String, nullable=False),
            sa.Column('description', sa.String, nullable=True),
            sa.Column('output', sa.String, nullable=True),
            sa.Column('example', sqlite.JSON(), nullable=True),
            sa.Column('note', sa.String, nullable=True)
        )
        op.create_index('ix_problems_title', 'problems', ['title'], unique=False)
        op.create_index('ix_problems_id', 'problems', ['id'], unique=False)


def downgrade() -> None:
    # Drop the 'problems' table and indexes
    op.drop_index('ix_problems_id', table_name='problems')
    op.drop_index('ix_problems_title', table_name='problems')
    op.drop_table('problems')

    # Drop the 'users' table and indexes
    op.drop_index('ix_users_id', table_name='users')
    op.drop_index('ix_users_username', table_name='users')
    op.drop_table('users')
