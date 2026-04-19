Deployment Architecture Diagram
This document describes the deployment architecture of the multi-tenant case management system, showing how services are containerized, scaled, and connected in production.

Components
API Server
Runs inside Docker container(s).

Stateless, horizontally scalable.

Exposed via load balancer.

Communicates with Database and Background Services.

Background Workers
Separate Docker containers for:

Email Scanning Worker

Outbound Email Service

Token Refresh Service

Scaled independently based on workload.

Database Cluster
Centralized relational database.

Tenant isolation via tenantId field.

Indexed for performance (inactive cases, notes, messages).

Optionally partitioned or sharded for large tenants.

Load Balancer
Distributes traffic across multiple API server instances.

Provides fault tolerance and high availability.

Authentication & Security
JWT authentication handled at API layer.

OAuth2 integration for Gmail API.

Secure token storage.

Audit logs persisted in Database.

Frontend
SPA (React/Angular/Vue) served via CDN or web server.

Connects to API endpoints through HTTPS.

Diagram (Text-Based)
+-------------------+        +-------------------+
|   Frontend SPA    | <----> |   Load Balancer   |
+-------------------+        +-------------------+
                                 |
                                 v
                         +-------------------+
                     +-------------------+
                             |
                             v
+-------------------+        +-------------------+

+-------------------+        +-------------------+


---

This deployment architecture ensures scalability, tenant isolation, and operational resilience by containerizing services, using load balancing, and supporting independent scaling of background workers.

