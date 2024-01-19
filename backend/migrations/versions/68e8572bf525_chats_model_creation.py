"""Chats model creation

Revision ID: 68e8572bf525
Revises: 6d99824a2847
Create Date: 2023-12-27 12:19:39.701277

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '68e8572bf525'
down_revision: Union[str, None] = '6d99824a2847'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chat',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('first_user_id', sa.Uuid(), nullable=False),
    sa.Column('second_user_id', sa.Uuid(), nullable=False),
    sa.ForeignKeyConstraint(['first_user_id'], ['user.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['second_user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('sender_id', sa.Uuid(), nullable=False),
    sa.Column('chat_id', sa.Uuid(), nullable=False),
    sa.ForeignKeyConstraint(['chat_id'], ['chat.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('message')
    op.drop_table('chat')
    # ### end Alembic commands ###
