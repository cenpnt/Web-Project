"""Edit invitation column

Revision ID: 41b9e048b99f
Revises: 13006ae9f01d
Create Date: 2024-09-29 15:32:18.987113

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '41b9e048b99f'
down_revision: Union[str, None] = '13006ae9f01d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_invitations_new_id', table_name='invitations')
    op.drop_index('ix_invitations_new_token', table_name='invitations')
    op.create_index(op.f('ix_invitations_id'), 'invitations', ['id'], unique=False)
    op.create_index(op.f('ix_invitations_token'), 'invitations', ['token'], unique=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_invitations_token'), table_name='invitations')
    op.drop_index(op.f('ix_invitations_id'), table_name='invitations')
    op.create_index('ix_invitations_new_token', 'invitations', ['token'], unique=1)
    op.create_index('ix_invitations_new_id', 'invitations', ['id'], unique=False)
    # ### end Alembic commands ###
