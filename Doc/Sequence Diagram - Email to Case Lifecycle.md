equence Diagram - Email to Case Lifecycle

This document provides a text-based sequence diagram showing the flow of a customer email through case creation, agent reply, and outbound email.

Participants

Customer

System API

Email Scan Worker

Database

Agent/Admin

Outbound Email Service

Flow

Customer sends an email to the tenant's support address.

Email Scan Worker detects the new email.

Email Scan Worker creates a new Case in the Database.

System API exposes the Case to Agent/Admin dashboards.

Agent/Admin views the Case and adds public/internal notes.

Agent/Admin replies to the customer via the system.

Outbound Email Service sends the reply through Gmail API.

Customer receives the reply.

Diagram (Text-Based)

Customer -> Email Scan Worker: Send email
Email Scan Worker -> Database: Create Case
Database -> System API: Case available
System API -> Agent/Admin: Display Case
Agent/Admin -> Database: Add notes / update status
Agent/Admin -> Outbound Email Service: Send reply
Outbound Email Service -> Customer: Deliver reply via Gmail API

This sequence diagram illustrates the runtime behavior of the system when handling customer emails, ensuring cases are created, managed, and resolved with proper communication.