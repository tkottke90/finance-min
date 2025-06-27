# Finance Minimum API

This directory contains the RESTful API endpoints for the Finance Minimum application.

## API Structure

The API is organized using versioned endpoints to ensure backward compatibility and smooth evolution of the service.

```
src/app/api/
├── README.md           # This file - API documentation
├── route.ts           # API root endpoint - shows available versions
└── v1/                # Version 1 API endpoints
    ├── README.md      # v1 specific documentation
    ├── route.ts       # v1 index endpoint
    └── auth/          # Authentication endpoints
        ├── login/     # OAuth2 login initiation
        ├── callback/  # OAuth2 callback handler
        ├── config/    # Client configuration
        └── logout/    # User logout
```

## Available Versions

### Version 1 (v1) - Current
- **Base URL**: `/api/v1`
- **Status**: Active
- **Description**: Current stable version with OAuth2 authentication

## API Discovery

### Root Endpoint
```
GET /api
```

Returns information about available API versions and their status.

**Response:**
```json
{
  "name": "Finance Minimum API",
  "description": "RESTful API for Finance Minimum application",
  "versions": {
    "v1": {
      "path": "/api/v1",
      "status": "active",
      "description": "Current stable version"
    }
  },
  "documentation": {
    "v1": "/api/v1"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Versioning Strategy

- **Semantic Versioning**: Major versions (v1, v2, etc.) for breaking changes
- **Backward Compatibility**: Previous versions maintained during transition periods
- **Deprecation Policy**: 6-month notice before removing deprecated versions
- **Content Negotiation**: Future versions may support content-type based versioning

## Authentication

All API versions use OAuth2 for authentication. See the specific version documentation for implementation details.

## Error Handling

All API endpoints follow consistent error response format:

```json
{
  "error": "error_code",
  "message": "Human readable error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Rate Limiting

Currently no rate limiting is implemented. This may be added in future versions.

## CORS Policy

CORS is configured to allow requests from the same origin. Cross-origin requests may be supported in future versions.

## Development

When adding new endpoints:

1. **Choose appropriate version**: Add to existing version for non-breaking changes
2. **Create new version**: For breaking changes, create new version directory
3. **Update documentation**: Update both README files and route.ts responses
4. **Test thoroughly**: Ensure backward compatibility is maintained
5. **Update client code**: Update frontend to use new endpoints as needed

## Next.js API Routes

This API uses Next.js App Router API routes:
- Each `route.ts` file defines HTTP method handlers (GET, POST, etc.)
- Dynamic routes use `[param]` folder naming
- Middleware can be added via `middleware.ts` files
- TypeScript support with `NextRequest` and `NextResponse` types
