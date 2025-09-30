# Shared Cross-Platform Development Prompts

## API Design and Documentation
```
Design REST API architecture for [application domain] with:
- RESTful resource naming conventions
- HTTP status codes and proper error responses
- API versioning strategy (URL path or header-based)
- Request/response pagination patterns
- Authentication and authorization patterns (JWT, OAuth2)
- Rate limiting and throttling considerations
- API documentation using OpenAPI/Swagger
- CORS configuration for web applications

API features:
- Bulk operations for efficiency
- Partial resource updates using PATCH
- Filtering, sorting, and search parameters
- Caching headers and ETags for performance
- Webhook support for real-time notifications
- API health checks and monitoring endpoints
```

## Database Design and ORM
```
Create database schema for [data domain] with:
- Normalized relational design with proper foreign keys
- Index optimization for query performance
- Migration scripts for schema changes
- Soft delete patterns for data retention
- Audit trails for data changes
- Connection pooling and transaction management
- Database seeding for development and testing

Database patterns:
- Repository pattern for data access abstraction
- Unit of Work pattern for transaction management
- Query optimization and N+1 problem prevention
- Caching strategies (Redis, in-memory)
- Read replicas for scaling read operations
- Database monitoring and performance tuning
```

## Security Implementation
```
Implement security measures for [application type] including:
- Input validation and sanitization
- SQL injection and XSS prevention
- CSRF protection with tokens
- Content Security Policy (CSP) headers
- Secure authentication flows
- Password hashing with salt (bcrypt, Argon2)
- Secure session management
- HTTPS enforcement and HSTS headers

Security features:
- Role-based access control (RBAC)
- API key management and rotation
- Rate limiting and DDoS protection
- Security headers implementation
- Vulnerability scanning integration
- Secure file upload handling
- Audit logging for security events
```

## Performance Optimization
```
Optimize application performance for [performance metric] by:
- Code splitting and lazy loading strategies
- Image optimization and compression
- Caching strategies (browser, CDN, server-side)
- Database query optimization
- Bundle size analysis and reduction
- Memory leak detection and prevention
- Network request optimization and batching

Performance techniques:
- Critical rendering path optimization
- Service worker implementation for offline support
- Progressive loading and skeleton screens
- Virtualization for large lists
- Compression (gzip, brotli) configuration
- Resource preloading and prefetching
- Performance monitoring and alerting
```

## Testing Strategies
```
Develop comprehensive testing strategy for [application type] with:
- Unit tests with high code coverage
- Integration tests for component interactions
- End-to-end tests for user workflows
- API contract testing with consumer-driven contracts
- Performance testing and load testing
- Security testing and vulnerability assessment
- Accessibility testing compliance

Testing infrastructure:
- Continuous integration pipeline setup
- Test data management and factories
- Mock services and test doubles
- Visual regression testing
- Cross-browser testing automation
- Mobile device testing on real devices
- Test reporting and quality gates
```

## DevOps and Deployment
```
Set up deployment pipeline for [environment type] with:
- Infrastructure as Code (Terraform, CloudFormation)
- Containerization with Docker and orchestration
- CI/CD pipeline with automated testing
- Blue-green or canary deployment strategies
- Environment configuration management
- Monitoring and alerting setup
- Backup and disaster recovery procedures

DevOps practices:
- GitOps workflow with automated deployments
- Secret management and configuration
- Log aggregation and analysis
- Health checks and uptime monitoring
- Auto-scaling based on metrics
- Database migration automation
- Security scanning in CI/CD pipeline
```