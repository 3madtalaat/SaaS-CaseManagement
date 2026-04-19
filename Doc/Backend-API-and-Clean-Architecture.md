# Backend API & Clean Architecture (Node.js + MongoDB)

This document consolidates the REST API surface, Clean Architecture layering, environment configuration, and mapping to product features described in `Features.md`, `Base Implementation Document.md`, `Unified Workflows for Multi-Tenant Case Management System.md`, `Data Model Specifications - User and Tenant.md`, `General Naming Conventions.md`, and `structure.md`.

---

## 1. Architectural goals

- **Clean Architecture**: domain has no framework imports; application defines use cases and ports; infrastructure implements adapters (MongoDB, Gmail, JWT); HTTP is a thin adapter.
- **Multi-tenancy**: every persisted record is scoped with `tenant_id`; API paths include `/tenants/:tenantId` where appropriate; middleware enforces membership and role.
- **Conventions**: REST resources use **kebab-case** paths and plural nouns; MongoDB fields use **snake_case**; configuration keys use **snake_case** (see `General Naming Conventions.md`).

---

## 2. Repository layout (`src/`)

```
src/
├── domain/
│   ├── entities/           # User, Tenant, Case, Note, Message, …
│   ├── value-objects/      # Email, CaseStatus, …
│   └── services/           # Pure domain rules (optional)
├── application/
│   ├── use-cases/          # One primary operation per file / class
│   └── ports/              # Repository & gateway interfaces
├── infrastructure/
│   ├── database/           # Mongoose models, repository implementations
│   ├── email/              # Gmail / outbound adapters
│   ├── auth/               # JWT, password hashing
│   └── logging/            # Structured logs, audit appenders
├── interface/
│   ├── http/               # Express app, routes, controllers, middleware
│   └── cli/                # Optional worker / cron entrypoints
├── config/                 # Env loading, DI composition
└── main.ts                 # Process entry
```

**Dependency rule**: `interface` → `application` → `domain`; `infrastructure` → `application` (+ `domain` for mapping). `domain` imports nothing from outer layers.

---

## 3. API base URL

- **Prefix**: `/api/v1`
- **Versioning**: path segment `v1` (bump when breaking changes are introduced).

---

## 4. REST endpoints (consolidated)

### 4.1 Authentication & onboarding

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/login` | Email + password → JWT (and optional refresh token) |
| POST | `/api/v1/auth/logout` | Invalidate refresh/session |
| POST | `/api/v1/auth/refresh` | Rotate access token (if refresh tokens are used) |
| POST | `/api/v1/auth/forgot-password` | Issue password-reset token and email |
| POST | `/api/v1/auth/reset-password` | Complete reset with token |
| POST | `/api/v1/auth/onboarding/customer` | Onboarding token + password + optional profile |
| POST | `/api/v1/auth/onboarding/staff` | Complete invite for agent/admin |

### 4.2 Current user & active tenant

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/me` | Profile, global role, tenant memberships |
| PATCH | `/api/v1/me` | Update allowed profile fields |
| POST | `/api/v1/me/active-tenant` | Body: `{ tenant_id }` — set active tenant context |

### 4.3 Tenants & Google mailbox integration

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants` | Tenants the caller can access |
| POST | `/api/v1/tenants` | Create tenant (gated by product rules) |
| GET | `/api/v1/tenants/:tenantId` | Tenant detail |
| PATCH | `/api/v1/tenants/:tenantId` | Update `company_name`, `support_email`, etc. |
| GET | `/api/v1/tenants/:tenantId/integrations/google/start` | Start OAuth consent |
| GET | `/api/v1/tenants/:tenantId/integrations/google/callback` | OAuth redirect handler |
| DELETE | `/api/v1/tenants/:tenantId/integrations/google` | Revoke stored tokens |
| GET | `/api/v1/tenants/:tenantId/integrations/google/status` | Connection / expiry status |

### 4.4 Users (per tenant)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/users` | List with filters/pagination (admin) |
| POST | `/api/v1/tenants/:tenantId/users` | Invite user (customer / agent / admin) |
| GET | `/api/v1/tenants/:tenantId/users/:userId` | Detail |
| PATCH | `/api/v1/tenants/:tenantId/users/:userId` | Update profile / role per policy |
| DELETE | `/api/v1/tenants/:tenantId/users/:userId` | Deactivate / soft-delete |
| POST | `/api/v1/tenants/:tenantId/users/:userId/reset-password` | Admin-triggered reset |

### 4.5 Departments

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/departments` | List |
| POST | `/api/v1/tenants/:tenantId/departments` | Create |
| GET | `/api/v1/tenants/:tenantId/departments/:departmentId` | Detail |
| PATCH | `/api/v1/tenants/:tenantId/departments/:departmentId` | Update |
| DELETE | `/api/v1/tenants/:tenantId/departments/:departmentId` | Delete |

### 4.6 Cases & lifecycle

Statuses: `OPEN`, `UNDER_INVESTIGATION`, `BEING_RESOLVED`, `RESOLVED`, `CLOSED`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/cases` | Filter, sort, paginate (role-scoped) |
| POST | `/api/v1/tenants/:tenantId/cases` | Manual / portal case creation |
| GET | `/api/v1/tenants/:tenantId/cases/:caseId` | Detail |
| PATCH | `/api/v1/tenants/:tenantId/cases/:caseId` | Metadata updates if modeled |
| PATCH | `/api/v1/tenants/:tenantId/cases/:caseId/status` | Controlled transition + history |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/close` | Close |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/reopen` | Reopen |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/assign` | Assign or unassign agent |
| PATCH | `/api/v1/tenants/:tenantId/cases/:caseId/departments` | Set `assigned_departments` |
| GET | `/api/v1/tenants/:tenantId/cases/:caseId/status-history` | Status audit trail |
| GET | `/api/v1/tenants/:tenantId/cases/unassigned` | Unassigned queue |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/claim` | Agent claims case |
| GET | `/api/v1/tenants/:tenantId/cases/inactive` | Stale / no-reply monitoring (admin) |

### 4.7 Customer history (agent)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/customers/:customerId/cases` | Past cases for context |

### 4.8 Notes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/cases/:caseId/notes` | Public only for customer; staff see both |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/notes` | `visibility`: `PUBLIC` \| `INTERNAL` |

### 4.9 Messages (email thread)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/cases/:caseId/messages` | List |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/messages/reply` | Outbound reply via Gmail |

### 4.10 Call requests

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/call-requests` | Pending / filtered |
| POST | `/api/v1/tenants/:tenantId/cases/:caseId/call-requests` | Customer submits request |
| PATCH | `/api/v1/tenants/:tenantId/call-requests/:callRequestId` | Handle / assign |

### 4.11 Dashboards (read models)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/dashboard/agent` | Open cases, pending call requests |
| GET | `/api/v1/tenants/:tenantId/dashboard/admin` | Tenant overview |
| GET | `/api/v1/tenants/:tenantId/dashboard/customer` | Customer summary |

### 4.12 Audit logs

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/tenants/:tenantId/audit-logs` | Filterable list (admin) |

### 4.13 Health & internal (optional)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Liveness |
| GET | `/api/v1/health/ready` | Readiness (DB, etc.) |
| POST | `/api/v1/internal/email-scan/run` | Trigger scan (API key / mTLS) |

---

## 5. Middleware stack (HTTP)

1. **Authentication** — Validate JWT; attach `user_id`, `role`, memberships.
2. **Tenant context** — Resolve `tenantId` from path or active-tenant header/body; verify membership.
3. **Authorization** — Role + route policy (e.g. internal notes: admin/agent only).
4. **Input validation** — Schema validation at the HTTP boundary (DTOs).
5. **Audit** — Emit audit events for mutating operations (application or cross-cutting).

---

## 6. MongoDB collections (illustrative)

Plural collection names; `snake_case` field names; compound indexes on `(tenant_id, …)` for isolation and queries.

| Collection | Purpose |
|------------|---------|
| `users` | All personas; `role`: ADMIN \| AGENT \| CUSTOMER |
| `tenants` | Company, `support_email`, etc. |
| `tenant_memberships` | `user_id` + `tenant_id` |
| `auth_tokens` | Encrypted Google tokens per tenant |
| `departments` | Per-tenant departments |
| `cases` | Case aggregate root references |
| `notes` | Public / internal |
| `messages` | Email-linked messages |
| `case_status_histories` | Status transitions + initiator |
| `call_requests` | Customer call requests |
| `audit_logs` | Compliance trail |
| `system_configs` | Tenant or global config (optional) |

Suggested indexes (non-exhaustive): `idx_cases_tenant_id_updated_at`, `idx_cases_tenant_id_assigned_agent_id`, `idx_tenant_memberships_user_id`, `idx_notes_tenant_id_case_id`.

---

## 7. Application use cases (feature mapping)

| Area | Examples |
|------|----------|
| Tenancy | `AssertTenantMembership`, `SetActiveTenant` |
| Onboarding | `CompleteCustomerOnboarding`, `InviteStaffUser` |
| Cases | `CreateCase`, `TransitionCaseStatus`, `CloseCase`, `ReopenCase`, `AssignAgent`, `ClaimCase`, `ListInactiveCases` |
| Notes / messages | `AddNote`, `RecordInboundEmail` (worker), `SendCaseReply` |
| Gmail | `StartGoogleOAuth`, `HandleGoogleCallback`, `RefreshGoogleAccessToken` |
| Admin | `ResetUserPassword`, `ListAuditLogs` |

Workers (email scan, token refresh) should call the **same** use cases or dedicated application services registered in the composition root—not duplicate business rules in scripts.

---

## 8. Environment variables

Loaded in `src/config` from `.env` (see repository `.env.example`). Keys use **snake_case**.

| Variable | Purpose |
|----------|---------|
| `node_env` | `development` \| `production` \| `test` |
| `port` | HTTP port |
| `api_prefix` | e.g. `/api/v1` |
| `cors_origin` | Allowed browser origin(s) |
| `mongodb_uri` | MongoDB connection string |
| `mongodb_db_name` | Database name (if not in URI) |
| `jwt_secret` | Access token signing |
| `jwt_expires_in` | Access TTL |
| `jwt_refresh_secret` | Refresh signing (if used) |
| `jwt_refresh_expires_in` | Refresh TTL |
| `bcrypt_rounds` | Password hashing cost |
| `token_encryption_key` | AES-256-GCM key (base64) for stored OAuth tokens |
| `google_client_id` / `google_client_secret` | OAuth client |
| `google_oauth_redirect_base` | Base URL for tenant OAuth callback routes |
| `gmail_pubsub_topic` | Optional Pub/Sub for Gmail push |
| `email_poll_interval_ms` | Polling fallback for workers |
| `public_app_url` | Frontend URL for links in emails |
| `email_from_name` | Display name for outbound mail |
| `internal_api_key` | Protect internal HTTP triggers |
| `email_worker_enabled` | Feature flag |
| `log_level` | e.g. `info`, `debug` |

Production: prefer a secrets manager for sensitive values; keep variable *names* stable.

---

## 9. Implementation status

The repository contains a **skeleton**: config loading, HTTP bootstrap, health routes, and folder placeholders for domain, application ports, and infrastructure. Implement repositories, use cases, and route handlers incrementally while keeping the dependency rule intact.

---

## 10. Related documents

- `structure.md` — Original folder outline  
- `Features.md` — Product capabilities  
- `Base Implementation Document.md` — Consolidated baseline  
- `General Naming Conventions.md` — Naming rules  
- `Data Model Specifications - User and Tenant.md` — Core entities  
