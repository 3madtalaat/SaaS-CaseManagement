Deployment Sequence Diagram

This document provides a text-based sequence diagram showing how requests and background operations flow through the deployed system.

Participants

Customer

Load Balancer

API Server (Dockerized)

Database Cluster

Background Worker (Email Scan / Outbound / Token Refresh)

Gmail API

Flow

Customer sends a request (e.g., login, case view, case reply) via the frontend.

Load Balancer receives the request and routes it to an available API Server.

API Server authenticates the request (JWT, tenant isolation).

API Server queries or updates the Database Cluster.

For email-related actions:

Background Worker polls Gmail API for inbound emails.

Worker creates or updates cases in the Database Cluster.

API Server exposes updated cases to dashboards.

For outbound replies:

Agent/Admin submits reply via API Server.

API Server passes message to Outbound Email Worker.

Worker sends email via Gmail API.

Reply logged in Database Cluster.

Customer receives the outbound email.

Diagram (Text-Based)

Customer → Load Balancer: Send requestLoad Balancer → API Server: Route requestAPI Server → Database Cluster: Query/update dataAPI Server → Background Worker: Trigger email scan/outboundBackground Worker → Gmail API: Fetch/send emailBackground Worker → Database Cluster: Create/update case/messageDatabase Cluster → API Server: Return updated dataAPI Server → Customer: Response via frontendGmail API → Customer: Deliver outbound email

This sequence diagram illustrates runtime interactions in the deployed environment, showing how customer requests, background services, and external integrations (Gmail API) work together to ensure smooth operations.