# Flutter API Integration Prompts

## REST API Service
```
Create a Flutter API service class for [API name] with:
- HTTP client using Dio or http package
- Automatic request/response logging for debugging
- Token-based authentication handling
- Request interceptors for common headers
- Response interceptors for error handling
- Retry logic for failed requests
- Offline caching capabilities
- Type-safe response models

Service should include:
- Generic methods for GET, POST, PUT, DELETE
- Upload/download progress tracking
- Request cancellation support
- Environment-based URL configuration
- SSL certificate pinning for security
```

## Data Models and Serialization
```
Generate Flutter data models for [API resource] with:
- JSON serialization using json_annotation
- Null safety and proper optional fields
- Data validation and sanitization
- Immutable model design using freezed
- Equality and hash code implementation
- Copy methods for state updates
- Factory constructors for different data sources

Model features:
- Nested object support
- List and map handling
- Date/time parsing and formatting
- Enum support with proper serialization
- Custom serialization for complex types
```

## State Management for API Data
```
Implement API data state management using [state solution] for:
- Loading states (idle, loading, success, error)
- Data caching and persistence
- Optimistic updates for better UX
- Real-time data synchronization
- Pagination and infinite scrolling
- Search and filtering capabilities
- Background data refresh

State features:
- Error recovery mechanisms
- Offline mode handling
- Data validation before state updates
- Selective data refreshing
- Memory management for large datasets
```

## WebSocket Integration
```
Create WebSocket connection handler for [real-time feature] with:
- Automatic connection management and reconnection
- Message queuing for offline scenarios
- Heartbeat/ping-pong for connection health
- Proper cleanup and resource management
- Error handling and connection status monitoring
- Message serialization and deserialization
- Channel-based message routing

WebSocket features:
- Connection state management
- Message acknowledgment system
- Rate limiting and throttling
- SSL/WSS support for secure connections
- Integration with state management solution
```

## GraphQL Integration
```
Implement GraphQL client for [API name] using:
- Type-safe query generation
- Caching strategies for optimal performance
- Error handling for network and GraphQL errors
- Subscription support for real-time updates
- Optimistic updates for mutations
- Query complexity analysis
- Automatic persisted queries

GraphQL features:
- Fragment composition for reusable queries
- Variable validation and type checking
- Batch query execution
- Schema introspection for development
- Integration with code generation tools
```

## Authentication Flow
```
Create authentication system with:
- Multiple authentication methods (email, social, biometric)
- Secure token storage using Flutter Secure Storage
- Automatic token refresh handling
- Session management and timeout handling
- Logout and cleanup procedures
- Deep linking for password reset flows
- Multi-factor authentication support

Authentication features:
- Biometric authentication integration
- Social login providers (Google, Apple, Facebook)
- OAuth 2.0 and OpenID Connect support
- Remember me functionality
- Account linking and unlinking
- Security event logging
```