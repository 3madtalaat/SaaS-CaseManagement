Complete Features of Multi-Tenant Case Management System (with System Services)

This document consolidates all features from the original specification, clarifications, and additions we discussed, focusing on a true multi-tenant SaaS design with global roles, tenant-specific access, and system-level services.

Multi-Tenant Core

Each Company (Tenant) has its own customers, agents, admins, and departments.

Each tenant has its own support email account for inbound/outbound communication.

Strict isolation enforced by tenantId in all records.

Global Roles with Tenant Access:

Admins are always Admins, but can only manage cases, agents, customers, and departments in the tenants they are linked to.

Agents are always Agents, but can only handle cases in the tenants they are linked to.

Customers belong to a single tenant only.

Departments exist only within a single tenant.

User–Tenant Membership:

Users can belong to multiple tenants.

Their role is global (Admin or Agent), but their access is scoped to the tenants they are linked to.

Customers

Authentication: email + password (set via onboarding link).

Profile management: optional fields (name, mobile, company, position, department).

Case management:

View cases (filter, sort, paginate).

View case details (public notes only).

Close open cases.

Reopen closed cases.

Request call: submit call request form.

Agents

Dashboard: overview of open cases and pending call requests.

Open cases view: list of assigned open cases.

Case detail view:

Manage case status (investigation, resolution, close, reopen).

Add public notes (customer-facing).

Add internal notes (team-only).

See customer details alongside case.

Customer history view: review past cases for context.

Unassigned cases view: claim or leave cases.

Profile management: maintain personal data.

Admins

Dashboard: system overview (cases, call requests, agents).

Case list view:

Filter by customer, date opened, date updated, time since last update.

Sort and paginate.

Case detail view:

Assign agent (specific or leave unassigned).

Add/change departments.

Override case status.

View all notes (public + internal).

Manage departments: create/edit departments.

Manage customers: edit profiles, reset passwords.

Manage agents: create/edit agents, assign roles.

Manage users: full user management (admins, agents, customers).

Departments

Each tenant can define multiple departments.

Cases can be assigned to one or more departments.

Admins manage department creation and editing.

Case Lifecycle

Statuses: OPEN, UNDER_INVESTIGATION, BEING_RESOLVED, RESOLVED, CLOSED.

Status history:

Each change logged with status, timestamp, initiatorId (User or Customer).

Cases linked to:

CustomerId

AssignedAgentId (nullable)

AssignedDepartments[]

Notes[]

Messages[]

Notes

Public notes:

First note = initiating email body.

Customer replies → appended as public notes.

Agents/Admins can add public notes.

Internal notes:

Visible only to users (admins, agents).

Used for team collaboration.

Messages

Messages tied to cases.

Includes subject, body, senderId, customerId, timestamp.

Sent/received via tenant’s support email account.

Authentication & Security

Password handling:

Stored as passwordHash (bcrypt).

Restrictions: min length, complexity.

Onboarding flow:

Auto-registration via email.

Secure landing page link sent to customer.

Customer sets password + optional profile data.

Login/reset:

JWT/session issued after login.

Reset flow via email link.

Landing page security:

Tokenized link with expiry.

HTTPS enforced.

CSRF protection if server-rendered.

Shared Components

Filters: reusable dropdowns/tabs for filtering/sorting.

Pagination: reusable paging controls.

Layout: common header/footer/navigation.

System Services & Configurations

Email Scanning Service

Runs as background worker or scheduled job.

For each tenant:

Load stored email credentials.

Authenticate with Gmail API using refresh token.

Fetch new/unread emails since last check.

Parse subject/body → create new case or append to existing case.

Log email as public note/message.

Isolation: each tenant’s emails processed separately, tagged with tenantId.

Outbound Email Service

Agents/Admins reply via system.

System sends via Gmail API using tenant’s credentials.

Reply logged as public note in case.

Token Management

Initial consent: Tenant Admin logs in once via Google OAuth to authorize support email account.

System stores refresh token + access token securely (encrypted, tenant-scoped).

Automatic renewal: refresh token used to request new access tokens without user interaction.

Revocation handling: if token revoked/expired, system detects error and prompts Admin to re-authenticate.

Configuration Storage

Tenant model includes:

tenantId

companyName

supportEmail

authTokens (encrypted)

System configurations:

Email polling interval or Pub/Sub subscription.

Token refresh strategy.

Error handling & notification rules.

Efficiency & Organization

Clear role separation (Admins, Agents, Customers).

TenantId ensures strict isolation.

Support email integration per company.

User–Tenant membership allows flexible multi-company access without breaking isolation.

Shared components ensure consistency and reusability.

This document captures all features from the original specification, our enhancements, and system-level services, providing a complete and concise overview of the system’s functionality.