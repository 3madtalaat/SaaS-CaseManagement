Unified Workflows for Multi-Tenant Case Management System

This document outlines the operational workflows for all roles and system services, covering normal scenarios, general user flows, and system-level processes.

Customer Workflow

Onboarding

Receives secure email link → sets password → completes optional profile.

Authentication

Logs in with email + password.

Case Management

Submits new case via email or portal.

Views list of cases (filter, sort, paginate).

Opens case detail → sees public notes only.

Closes case when satisfied.

Reopens case if issue persists.

Communication

Replies to case emails → logged as public notes.

Requests a call via form.

Agent Workflow

Login & Dashboard

Logs in → sees dashboard with open cases and pending call requests.

Case Handling

Opens assigned cases list.

Views case detail → customer info + history.

Updates case status (investigation, resolution, close, reopen).

Adds public notes (customer-facing).

Adds internal notes (team-only).

Unassigned Cases

Claims or leaves unassigned cases.

Customer History

Reviews past cases for context.

Profile Management

Updates personal data.

Admin Workflow

Login & Dashboard

Logs in → sees system overview (cases, call requests, agents).

Case Oversight

Views case list → filters by customer, date, update time.

Opens case detail → assigns agents, changes departments, overrides status.

Views all notes (public + internal).

User & Department Management

Creates/edits departments.

Manages customers (profiles, reset passwords).

Manages agents (create/edit, assign roles).

Manages users (admins, agents, customers).

Daily Monitoring

Reviews cases with no reply, ordered by time of inactivity (last update).

Assigns agents or escalates cases to ensure SLA compliance.

Department Workflow

Creation & Management

Admin creates/edits departments.

Case Assignment

Cases routed to one or more departments.

Collaboration

Agents within department handle cases, add notes, update statuses.

Case Lifecycle Workflow

Case Creation

Customer email → system creates case with initial public note.

Investigation

Agent sets status to UNDER_INVESTIGATION.

Adds internal notes for collaboration.

Resolution

Agent sets status to BEING_RESOLVED → RESOLVED.

Adds public note with resolution details.

Closure

Customer confirms → case CLOSED.

Customer may reopen if issue persists.

Audit Trail

Status history logged with timestamp + initiatorId.

System Services Workflow

Email Scanning Service

Background worker loads tenants and credentials.

Authenticates with Gmail API using refresh token.

Fetches new/unread emails since last check.

Parses subject/body → creates new case or appends to existing case.

Logs email as public note/message.

Ensures tenant isolation.

Outbound Email Service

Agent/Admin reply via system.

System sends via Gmail API using tenant’s credentials.

Reply logged as public note.

Token Management

Initial consent: Tenant Admin authorizes support email account via Google OAuth.

System stores refresh token + access token securely.

Automatic renewal: refresh token used to request new access tokens.

Revocation handling: system detects error and prompts Admin to re-authenticate.

General Workflows

Forgot Password

User clicks “Forgot Password” → system generates reset token.

Email sent with reset link.

User sets new password.

System updates passwordHash.

Register New Customer

Customer sends first email → system auto-registers.

Creates customer record, generates onboarding token.

Sends secure onboarding link.

Customer sets password and profile data.

Register New Agent/Admin

Admin creates new agent/admin via UI.

System generates onboarding token.

Email sent with secure onboarding link.

User sets password and profile.

Account activated with assigned role.

This document provides a unified view of workflows for all roles, system services, and general user/system flows, ensuring clarity in daily operations and infrastructure processes.