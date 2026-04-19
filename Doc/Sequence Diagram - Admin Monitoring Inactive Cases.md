Sequence Diagram - Admin Monitoring Inactive Cases

This document provides a text-based sequence diagram showing how an Admin monitors cases with no reply, ordered by inactivity.

Participants

Admin

System API

Database

Agent

Flow

Admin logs into the system.

System API queries the Database for cases with no reply, ordered by last update time.

Database returns the list of inactive cases.

System API displays the list to the Admin.

Admin reviews cases:

Assigns an Agent if unassigned.

Adds internal notes for prioritization.

Escalates cases if inactivity exceeds threshold.

Agent receives assignment and begins handling the case.

Diagram (Text-Based)

Admin → System API: Login and request inactive casesSystem API → Database: Query cases with no reply ordered by last updateDatabase → System API: Return inactive cases listSystem API → Admin: Display inactive cases dashboardAdmin → System API: Assign agent / add notes / escalateSystem API → Agent: Notify assignment and case details

This sequence diagram illustrates the daily monitoring workflow for Admins, ensuring SLA compliance by tracking and addressing inactive cases.