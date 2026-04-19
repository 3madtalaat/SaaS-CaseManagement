Data Model Specifications - User and Tenant

This document defines the schema for the foundational entities User and Tenant in the multi-tenant case management system.

User Model

Purpose

Represents all system users (Admins, Agents, Customers).

Fields

id (PK, UUID)

email (string, unique, required)

password_hash (string, required for login users)

role (enum: ADMIN, AGENT, CUSTOMER)

name (string, optional)

mobile (string, optional)

company (string, optional)

position (string, optional)

department (string, optional)

created_at (timestamp, default now)

updated_at (timestamp, auto-update)

Relationships

Linked to one or more TenantMemberships (see below).

Customers linked to a single tenant only.

Tenant Model

Purpose

Represents a company (tenant) in the system.

Fields

id (PK, UUID)

company_name (string, required, unique)

support_email (string, required)

created_at (timestamp, default now)

updated_at (timestamp, auto-update)

Relationships

Has many TenantMemberships.

Has many Departments.

Has many Cases.

Has one or more AuthTokens for email integration.

TenantMembership Model

Purpose

Defines which users belong to which tenants.

Fields

id (PK, UUID)

user_id (FK → User.id)

tenant_id (FK → Tenant.id)

created_at (timestamp)

Notes

Role is global (stored in User), not per tenant.

Membership defines scope of access.

AuthToken Model

Purpose

Stores Google API tokens for tenant email integration.

Fields

id (PK, UUID)

tenant_id (FK → Tenant.id)

access_token (string, encrypted)

refresh_token (string, encrypted)

expiry_date (timestamp)

created_at (timestamp)

updated_at (timestamp)

This specification establishes the foundation for multi-tenant isolation and role-based access. Next, we will define Case, Note, Message, and Department models to complete the schema.