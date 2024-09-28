"""Edit expires_in column

Revision ID: 13006ae9f01d
Revises: 1880f5a2e476
Create Date: 2024-09-29 00:57:53.995624

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '13006ae9f01d'
down_revision: Union[str, None] = '1880f5a2e476'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Step 1: Create a new table with the desired column type
    op.create_table(
        'invitations_new',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('sender_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('receiver_email', sa.String(), nullable=False),
        sa.Column('token', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('status', sa.String(), nullable=False, default="pending"),
        sa.Column('expires_at', sa.DateTime(), nullable=True)  # Changed to DateTime
    )

    # Step 2: Copy data from the old table to the new table
    op.execute("""
        INSERT INTO invitations_new (id, sender_id, receiver_email, token, status, expires_at)
        SELECT id, sender_id, receiver_email, token, status, expires_at
        FROM invitations
    """)

    # Step 3: Drop the old table
    op.drop_table('invitations')

    # Step 4: Rename the new table to the old table's name
    op.rename_table('invitations_new', 'invitations')

def downgrade() -> None:
    # You may need to implement the downgrade similarly, reverting the changes
    op.create_table(
        'invitations_old',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('sender_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('receiver_email', sa.String(), nullable=False),
        sa.Column('token', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('status', sa.String(), nullable=False, default="pending"),
        sa.Column('expires_at', sa.String(), nullable=True)  # Revert back to String
    )

    op.execute("""
        INSERT INTO invitations_old (id, sender_id, receiver_email, token, status, expires_at)
        SELECT id, sender_id, receiver_email, token, status, expires_at
        FROM invitations
    """)

    op.drop_table('invitations')

    op.rename_table('invitations_old', 'invitations')
