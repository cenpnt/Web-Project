import sys
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# This is the Alembic Config object, which provides access to the values within the .ini file.
config = context.config

# Setup logging configuration from the .ini file.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Now you can import your database and models
from backend.database import Base  # Import your Base class from back-end/database.py
from backend.models import User, Problem  # Import your models from the appropriate module

# Set target_metadata for Alembic to autogenerate migrations
target_metadata = Base.metadata

# Functions to run migrations (same as before)
def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

# Determine if running in offline or online mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
