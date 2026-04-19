General Naming Conventions

This document defines concise, standardized naming conventions for variables, database schema, functions, and other system elements in the multi-tenant case management system.

Variables

Use camelCase for variable names.

Keep names descriptive but concise.

Prefix booleans with is, has, or should (e.g., isActive, hasAccess).

Constants in UPPER_CASE with underscores (e.g., MAX_RETRY_COUNT).

Database Schema

Use snake_case for table and column names.

Table names are plural (e.g., users, cases, departments).

Foreign keys follow the pattern <referenced_table>_id (e.g., user_id, tenant_id).

Indexes named with idx_<table>_<column>.

Primary keys named id.

Functions

Use camelCase for function names.

Function names should be verbs or verb phrases (e.g., createCase, assignAgent).

Async functions should end with Async (e.g., fetchEmailsAsync).

Keep names concise and action-oriented.

API Endpoints

Use RESTful conventions.

Endpoints in kebab-case.

Example: /api/v1/cases, /api/v1/users/{id}.

Use plural nouns for collections.

Use HTTP verbs to indicate action (GET, POST, PUT, DELETE).

Configuration Keys

Use snake_case.

Example: email_poll_interval, token_refresh_strategy.

File Naming

Use kebab-case for filenames.

Example: email-reader.js, case-controller.js.

This naming convention ensures clarity, consistency, and maintainability across all system components.