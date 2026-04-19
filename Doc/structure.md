See also: [Backend-API-and-Clean-Architecture.md](./Backend-API-and-Clean-Architecture.md) for the full REST map, env variables, and MongoDB notes.

project-root/
│
├── src/
│   ├── domain/                # Core business logic (entities, rules)
│   │   ├── entities/          # User, Tenant, Case, Note, etc.
│   │   ├── value-objects/     # Immutable domain values (e.g., EmailAddress)
│   │   └── services/          # Pure domain services (business rules)
│   │
│   ├── application/           # Use cases (application logic)
│   │   ├── use-cases/         # CreateCase, AssignAgent, SendReply
│   │   └── ports/             # Interfaces for repositories, email services
│   │
│   ├── infrastructure/        # External implementations
│   │   ├── database/          # Repositories (MongoDB, Postgres, etc.)
│   │   ├── email/             # Gmail API adapter
│   │   ├── auth/              # JWT, OAuth2
│   │   └── logging/           # Audit logs
│   │
│   ├── interface/             # Entry points (controllers, routes)
│   │   ├── http/              # Express routes/controllers
│   │   └── cli/               # Optional CLI commands
│   │
│   └── config/                # Environment configs, DI container
│
├── tests/                     # Unit and integration tests
│
├── package.json
└── README.md
