# API v1 Documentation

Version 1 of the Finance Minimum API, providing NextAuth.js authentication with Authentik provider.

## Base URL
```
/api/v1
```

## Directory Structure

```
src/app/api/v1/
├── README.md              # This documentation
├── route.ts              # v1 index endpoint
└── auth/                 # Authentication module
    └── [...nextauth]/    # NextAuth.js dynamic route
        └── route.ts      # NextAuth.js handler for all auth endpoints
```

## API Index

### Get API Information
```
GET /api/v1
```

Returns information about available v1 endpoints and their capabilities.

**Response:**
```json
{
  "version": "v1",
  "description": "Finance Minimum API v1",
  "authentication": "NextAuth.js with Authentik provider",
  "endpoints": {
    "auth": {
      "nextauth": {
        "path": "/api/v1/auth/nextauth",
        "methods": ["GET", "POST"],
        "description": "NextAuth.js authentication endpoints (signin, callback, signout, session, etc.)",
        "provider": "Authentik",
        "note": "Handles all OAuth2 flow automatically"
      }
    }
  },
  "clientUsage": {
    "session": "useSession() hook from next-auth/react",
    "signIn": "signIn(\"authentik\") function",
    "signOut": "signOut() function"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Authentication Module (`/auth`)

The authentication module uses NextAuth.js with Authentik provider for secure OAuth2-based authentication.

### NextAuth.js Dynamic Route

#### `[...nextauth]/route.ts`
NextAuth.js handles all authentication endpoints through a single dynamic route that automatically provides:

**Available Endpoints:**
- `GET /api/v1/auth/nextauth/signin` - Sign in page
- `GET /api/v1/auth/nextauth/signin/authentik` - Authentik provider sign in
- `GET /api/v1/auth/nextauth/callback/authentik` - OAuth2 callback handler
- `GET /api/v1/auth/nextauth/signout` - Sign out page
- `POST /api/v1/auth/nextauth/signout` - Sign out API
- `GET /api/v1/auth/nextauth/session` - Get current session
- `GET /api/v1/auth/nextauth/csrf` - CSRF token
- `GET /api/v1/auth/nextauth/providers` - Available providers

**Configuration:**
- **Provider:** Authentik OAuth2
- **Session Strategy:** JWT
- **Custom Pages:** `/login` for sign in, `/login` for errors
- **Callbacks:** JWT and session callbacks for token management

### Client-Side Usage

#### React Hooks and Functions
```typescript
import { useSession, signIn, signOut } from 'next-auth/react';

// Get current session
const { data: session, status } = useSession();

// Sign in with Authentik
await signIn('authentik', { callbackUrl: '/dashboard' });

// Sign out
await signOut({ callbackUrl: '/' });
```

#### Session Provider Configuration
```typescript
<SessionProvider basePath="/api/v1/auth/nextauth">
  {children}
</SessionProvider>
```

## Authentication Flow

1. **User clicks login** → `signIn('authentik')` called
2. **NextAuth redirects** → `/api/v1/auth/nextauth/signin/authentik`
3. **Server redirects** → Authentik authorization page
4. **User authorizes** → Authentik redirects to `/api/v1/auth/nextauth/callback/authentik`
5. **NextAuth handles callback** → Exchanges code for tokens, creates session
6. **User redirected** → `/dashboard` with active session
7. **Session available** → `useSession()` returns user data

## Security Features

### NextAuth.js Built-in Security
- **CSRF Protection:** Automatic CSRF token generation and validation
- **Secure Cookies:** JWT tokens stored in httpOnly, secure cookies
- **State Parameter:** OAuth2 state parameter for CSRF protection
- **Session Management:** Automatic session refresh and cleanup

### JWT Configuration
- **Strategy:** JWT-based sessions (no database required)
- **Secure Storage:** Session tokens in httpOnly cookies
- **Custom Callbacks:** JWT and session callbacks for token management
- **Automatic Refresh:** Built-in token refresh handling

### Authentik Integration
- **OAuth2 Flow:** Standard authorization code flow
- **Provider Validation:** Authentik issuer validation
- **Scope Management:** Configurable OAuth2 scopes
- **User Info:** Automatic user profile fetching

## Error Handling

NextAuth.js provides built-in error handling with automatic redirects to the configured error page.

### Error Types
- **Configuration errors:** Missing or invalid environment variables
- **Provider errors:** Authentik connection or configuration issues
- **OAuth2 errors:** Authorization denied, invalid grants, etc.
- **Session errors:** Invalid or expired sessions

### Error Handling in Client
```typescript
// Check for errors in URL params
const searchParams = useSearchParams();
const error = searchParams.get('error');

// Handle session status
const { data: session, status } = useSession();
if (status === 'unauthenticated') {
  // Handle unauthenticated state
}
```

### Error Redirect
All authentication errors redirect to `/login?error=error_code` for user-friendly error display.

## Environment Configuration

Required environment variables:
```bash
OAUTH2_CLIENT_ID=your_client_id
OAUTH2_CLIENT_SECRET=your_client_secret
OAUTH2_REDIRECT_URI=http://localhost:3000/api/v1/auth/callback
OAUTH2_AUTHORIZATION_URL=https://provider.com/oauth/authorize
OAUTH2_TOKEN_URL=https://provider.com/oauth/token
OAUTH2_USER_INFO_URL=https://provider.com/api/user
OAUTH2_SCOPE=openid profile email
```

## Future Enhancements

Planned features for future versions:
- JWT token support
- Multi-provider OAuth2 support
- Session management endpoints
- User profile management
- API key authentication for service-to-service calls
