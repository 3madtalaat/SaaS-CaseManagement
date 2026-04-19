Layered Architecture Diagram

This document provides a clear text-based layered diagram of the system architecture, illustrating the flow of data and responsibilities.

Frontend Layer

SPA (React/Angular/Vue)

Role-based dashboards:

Customer Dashboard

Agent Dashboard

Admin Dashboard

Shared components: filters, pagination, layouts

API Layer

RESTful Endpoints:

/users (register, login, reset)

/cases (create, update, close, reopen)

/notes (public/internal)

/messages (inbound/outbound email)

/departments (management)

/config (tenant settings)

Middleware:

Tenant isolation via tenantId

Role-based access control

Background Services Layer

Email Scanning Worker (Gmail API)

Outbound Email Service

Token Refresh Service

Runs as cron jobs or workers

Database Layer

Single Shared DB (tenantId isolation)

Entities:

User, Tenant, TenantMembership, AuthToken

Case, Note, Message, Department

CaseStatusHistory, CallRequest, AuditLog, SystemConfig

Indexes for performance:

Inactive cases

Notes retrieval

Email history queries

Authentication & Security Layer

JWT for API authentication

Bcrypt password hashing

OAuth2 for Google API integration

Audit logs for compliance

Tenant isolation enforced at query level

Deployment & Scaling Layer

Dockerized services (API, workers)

Load balancer for API scaling

Worker scaling based on tenant volume

DB partitioning option for large tenants

This layered architecture ensures tenant isolation, scalability, and operational clarity.