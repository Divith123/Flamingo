# Multi-Product Architecture

## Executive Summary

This document defines the technical architecture for the Flamingo Business Suite—a unified platform comprising 15 interconnected business software products. The architecture is designed to provide seamless integration between products while maintaining modularity, scalability, and developer experience.

---

## Architectural Principles

### 1. Unified Platform, Modular Design
- Single codebase with clear module boundaries
- Shared infrastructure and services
- Independent deployability of products
- Consistent APIs and data models

### 2. Event-Driven Communication
- Loose coupling between products
- Real-time data synchronization
- Audit trail for all cross-product events
- Idempotent event handling

### 3. API-First Design
- All functionality exposed via APIs
- Type-safe interfaces (tRPC)
- Comprehensive API documentation
- Versioning strategy for backward compatibility

### 4. Data Consistency
- Single source of truth for shared entities
- Eventual consistency for cross-product data
- Clear ownership boundaries
- Transactional integrity within bounded contexts

### 5. Security by Design
- Zero-trust architecture
- Defense in depth
- Principle of least privilege
- Comprehensive audit logging

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client Layer                                   │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│   Web App       │   Mobile App    │   Desktop App   │   Third-Party     │
│   (Next.js 16)  │   (Expo 55)     │   (Tauri 2)     │   (API Consumers) │
└────────┬────────┴────────┬────────┴────────┬────────┴─────────┬─────────┘
         │                 │                 │                   │
         └─────────────────┴────────┬────────┴───────────────────┘
                                    │
                          ┌─────────▼─────────┐
                          │   API Gateway     │
                          │   (Hono + tRPC)   │
                          └─────────┬─────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
┌────────▼────────┐      ┌─────────▼─────────┐      ┌────────▼────────┐
│  Product        │      │   Shared          │      │   Integration   │
│  Services       │      │   Services        │      │   Services      │
│                 │      │                   │      │                 │
│ ┌─────────────┐ │      │ ┌───────────────┐ │      │ ┌─────────────┐ │
│ │ Flamingo    │ │      │ │ Identity      │ │      │ │ Stripe      │ │
│ │ Books       │ │      │ │ (Better Auth) │ │      │ │ (Payments)  │ │
│ ├─────────────┤ │      ├───────────────┤ │      ├─────────────┤ │
│ │ Flamingo    │ │      │ │ Notification  │ │      │ │ Plaid       │ │
│ │ Expense     │ │      │ │ (Socket.io)   │ │      │ │ (Banking)   │ │
│ ├─────────────┤ │      ├───────────────┤ │      ├─────────────┤ │
│ │ Flamingo    │ │      │ │ Search        │ │      │ │ Shopify     │ │
│ │ Payroll     │ │      │ │ (MeiliSearch)│ │      │ │ (Commerce)  │ │
│ ├─────────────┤ │      ├───────────────┤ │      ├─────────────┤ │
│ │ ... (15     │ │      │ │ Queue         │ │      │ │ ... (20+    │ │
│ │ products)   │ │      │ │ (BullMQ)      │ │      │ │ integrations)│ │
│ └─────────────┘ │      └───────────────┘ │      └─────────────┘ │
└────────┬────────┘      └─────────┬─────────┘      └─────────┬─────────┘
         │                        │                          │
         └────────────────────────┼──────────────────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │     Data Layer             │
                    ├────────────────────────────┤
                    │ ┌────────────────────────┐ │
                    │ │ PostgreSQL (Drizzle)   │ │
                    │ │ - Primary Database     │ │
                    │ │ - Transactional Data   │ │
                    │ └────────────────────────┘ │
                    │ ┌────────────────────────┐ │
                    │ │ Redis (Upstash)        │ │
                    │ │ - Cache                │ │
                    │ │ - Session Store        │ │
                    │ │ - Rate Limiting        │ │
                    │ └────────────────────────┘ │
                    │ ┌────────────────────────┐ │
                    │ │ Cloudflare R2          │ │
                    │ │ - File Storage         │ │
                    │ │ - Document Storage     │ │
                    │ └────────────────────────┘ │
                    │ ┌────────────────────────┐ │
                    │ │ MeiliSearch            │ │
                    │ │ - Full-Text Search     │ │
                    │ │ - Product Search       │ │
                    │ └────────────────────────┘ │
                    └────────────────────────────┘
```

---

## Product Architecture

### Module Structure

Each Flamingo product follows a consistent module structure:

```
packages/
├── products/
│   ├── books/
│   │   ├── src/
│   │   │   ├── routers/          # tRPC routers
│   │   │   │   ├── invoices.ts
│   │   │   │   ├── bills.ts
│   │   │   │   ├── reports.ts
│   │   │   │   └── index.ts      # Router composition
│   │   │   ├── services/         # Business logic
│   │   │   │   ├── invoice-service.ts
│   │   │   │   ├── payment-service.ts
│   │   │   │   └── report-service.ts
│   │   │   ├── schemas/          # Zod schemas
│   │   │   │   ├── invoice-schema.ts
│   │   │   │   └── payment-schema.ts
│   │   │   ├── events/           # Event producers/consumers
│   │   │   │   ├── invoice-created.ts
│   │   │   │   └── payment-received.ts
│   │   │   ├── jobs/             # Background jobs
│   │   │   │   ├── recurring-invoices.ts
│   │   │   │   └── payment-reminders.ts
│   │   │   └── index.ts          # Public exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── expense/
│   ├── payroll/
│   └── ... (15 products total)
```

### Product Interface

All products implement a common interface:

```typescript
interface FlamingoProduct {
  // Metadata
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  version: string;
  
  // Configuration
  enabled: boolean;
  requiresSetup: boolean;
  setupUrl: string;
  
  // API
  router: AnyRouter; // tRPC router
  events: ProductEvents;
  jobs: ProductJobs;
  
  // Permissions
  permissions: Permission[];
  defaultRoles: Role[];
  
  // Navigation
  navigation: NavigationItem[];
  
  // Lifecycle
  onEnable: () => Promise<void>;
  onDisable: () => Promise<void>;
  onUninstall: () => Promise<void>;
}
```

---

## Shared Services

### 1. Identity & Access Management

**Technology**: Better Auth with Drizzle adapter

**Capabilities:**
```typescript
interface IdentityService {
  // Authentication
  authenticate(credentials: Credentials): Promise<Session>;
  validateSession(token: string): Promise<Session>;
  refreshSession(token: string): Promise<Session>;
  revokeSession(sessionId: string): Promise<void>;
  
  // User Management
  createUser(userData: CreateUserData): Promise<User>;
  updateUser(userId: string, updates: UpdateUserData): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  
  // Role & Permission Management
  assignRole(userId: string, roleId: string): Promise<void>;
  revokeRole(userId: string, roleId: string): Promise<void>;
  checkPermission(userId: string, permission: string): Promise<boolean>;
  
  // Organization Management
  createOrganization(data: CreateOrgData): Promise<Organization>;
  getOrganizationMembers(orgId: string): Promise<Member[]>;
  updateMemberRole(orgId: string, userId: string, roleId: string): Promise<void>;
}
```

**Database Schema:**
```typescript
// packages/auth/src/schema.ts
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified'),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').references(() => organizations.id),
  permissions: json('permissions').$type<Permission[]>().notNull(),
});

export const userRoles = pgTable('user_roles', {
  userId: uuid('user_id').references(() => users.id).notNull(),
  roleId: uuid('role_id').references(() => roles.id).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  primaryKey('user_id', 'role_id'),
});
```

### 2. Notification Service

**Technology**: Socket.io for real-time, Resend for email

**Capabilities:**
```typescript
interface NotificationService {
  // Real-time Notifications
  sendToUser(userId: string, notification: Notification): Promise<void>;
  sendToOrganization(orgId: string, notification: Notification): Promise<void>;
  sendToRole(orgId: string, roleId: string, notification: Notification): Promise<void>;
  
  // Email Notifications
  sendEmail(to: string, email: EmailTemplate): Promise<void>;
  sendBulkEmail(recipients: string[], email: EmailTemplate): Promise<void>;
  
  // SMS Notifications
  sendSMS(to: string, message: string): Promise<void>;
  
  // Push Notifications
  sendPush(userId: string, notification: PushNotification): Promise<void>;
  
  // Preferences
  getPreferences(userId: string): Promise<NotificationPreferences>;
  updatePreferences(userId: string, prefs: NotificationPreferences): Promise<void>;
  subscribe(userId: string, channel: string): Promise<void>;
  unsubscribe(userId: string, channel: string): Promise<void>;
}
```

**Event Integration:**
```typescript
// products/books/src/events/invoice-created.ts
export const invoiceCreatedEvent = {
  name: 'invoice.created',
  schema: z.object({
    invoiceId: z.string(),
    customerId: z.string(),
    amount: z.number(),
    dueDate: z.date(),
    createdBy: z.string(),
  }),
  handler: async (event) => {
    // Send notification to customer
    await notifications.sendToUser(event.customerId, {
      type: 'invoice_received',
      title: 'New Invoice Received',
      body: `Invoice #${event.invoiceId} for $${event.amount}`,
      action: {
        label: 'View Invoice',
        url: `/invoices/${event.invoiceId}`,
      },
    });
    
    // Send email
    await notifications.sendEmail(customer.email, {
      template: 'invoice-created',
      data: { invoice: event },
    });
  },
};
```

### 3. Search Service

**Technology**: MeiliSearch

**Capabilities:**
```typescript
interface SearchService {
  // Index Management
  index(document: SearchDocument): Promise<void>;
  bulkIndex(documents: SearchDocument[]): Promise<void>;
  deleteDocument(index: string, id: string): Promise<void>;
  
  // Search
  search(query: SearchQuery): Promise<SearchResults>;
  suggest(query: string): Promise<string[]>;
  
  // Multi-Index Search
  federatedSearch(queries: FederatedQuery): Promise<FederatedResults>;
}

interface SearchDocument {
  id: string;
  index: 'contacts' | 'invoices' | 'expenses' | 'products' | 'documents';
  data: Record<string, any>;
  metadata: {
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    tags?: string[];
  };
}
```

**Search Configuration:**
```typescript
// apps/server/src/lib/search.ts
import { MeiliSearch } from 'meilisearch';

export const searchClient = new MeiliSearch({
  host: env.MEILISEARCH_HOST,
  apiKey: env.MEILISEARCH_API_KEY,
});

export const searchIndexes = {
  contacts: searchClient.index('contacts'),
  invoices: searchClient.index('invoices'),
  expenses: searchClient.index('expenses'),
  products: searchClient.index('products'),
  documents: searchClient.index('documents'),
};

// Configure index settings
await searchIndexes.invoices.updateSettings({
  searchableAttributes: [
    'invoiceNumber',
    'customerName',
    'customerEmail',
    'description',
  ],
  filterableAttributes: ['status', 'dueDate', 'amount', 'createdAt'],
  sortableAttributes: ['amount', 'dueDate', 'createdAt'],
  rankingRules: [
    'words',
    'typo',
    'proximity',
    'attribute',
    'sort',
    'exactness',
  ],
});
```

### 4. Queue Service

**Technology**: BullMQ with Upstash Redis

**Capabilities:**
```typescript
interface QueueService {
  // Job Management
  addJob(queue: string, job: JobData): Promise<Job>;
  addBulkJobs(queue: string, jobs: JobData[]): Promise<Job[]>;
  
  // Job Processing
  processJob(job: Job): Promise<void>;
  retryJob(jobId: string): Promise<void>;
  failJob(jobId: string, reason: string): Promise<void>;
  
  // Queue Management
  getQueueStats(queue: string): Promise<QueueStats>;
  pauseQueue(queue: string): Promise<void>;
  resumeQueue(queue: string): Promise<void>;
  drainQueue(queue: string): Promise<void>;
  
  // Scheduled Jobs
  scheduleJob(cron: string, job: JobData): Promise<void>;
  cancelScheduledJob(jobId: string): Promise<void>;
}
```

**Queue Definitions:**
```typescript
// apps/server/src/lib/queues.ts
import { Queue, Worker } from 'bullmq';

export const queues = {
  // Email queue
  emails: new Queue('emails', {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
  }),
  
  // Payment processing queue
  payments: new Queue('payments', {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    },
  }),
  
  // Report generation queue
  reports: new Queue('reports', {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      timeout: 300000, // 5 minutes
    },
  }),
  
  // Data import/export queue
  imports: new Queue('imports', {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      timeout: 600000, // 10 minutes
    },
  }),
  
  // Notification queue
  notifications: new Queue('notifications', {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'fixed',
        delay: 1000,
      },
    },
  }),
};

// Workers
export const workers = {
  emails: new Worker('emails', processEmailJob, {
    connection: redisConnection,
    concurrency: 10,
  }),
  
  payments: new Worker('payments', processPaymentJob, {
    connection: redisConnection,
    concurrency: 5,
  }),
  
  reports: new Worker('reports', processReportJob, {
    connection: redisConnection,
    concurrency: 3,
  }),
};
```

---

## Data Integration Strategy

### Shared Data Model

**Core Entities (Shared Across Products):**
```typescript
// packages/db/src/schema/core.ts

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  settings: json('settings').$type<OrganizationSettings>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  type: varchar('type', { enum: ['customer', 'vendor', 'employee', 'other'] }).notNull(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  addresses: json('addresses').$type<Address[]>(),
  taxId: text('tax_id'),
  currency: varchar('currency', { length: 3 }).default('USD'),
  paymentTerms: integer('payment_terms').default(30),
  metadata: json('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  sku: text('sku'),
  type: varchar('type', { enum: ['product', 'service'] }).notNull(),
  price: decimal('price').notNull(),
  cost: decimal('cost'),
  currency: varchar('currency', { length: 3 }).default('USD'),
  taxCode: text('tax_code'),
  inventory: {
    trackInventory: boolean('track_inventory').default(false),
    quantity: integer('quantity').default(0),
    reorderPoint: integer('reorder_point'),
  },
  metadata: json('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chartOfAccounts = pgTable('chart_of_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  type: varchar('type', { enum: ['asset', 'liability', 'equity', 'income', 'expense'] }).notNull(),
  parentId: uuid('parent_id').references(() => chartOfAccounts.id),
  currency: varchar('currency', { length: 3 }).default('USD'),
  taxCode: text('tax_code'),
  system: boolean('system').default(false), // System accounts can't be deleted
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### Event-Driven Synchronization

**Event Bus Architecture:**
```typescript
// apps/server/src/lib/event-bus.ts
import { EventEmitter } from 'events';

class EventBus extends EventEmitter {
  async publish<T>(event: DomainEvent<T>): Promise<void> {
    // Persist event for audit trail
    await this.persistEvent(event);
    
    // Publish to message queue for async processing
    await this.publishToQueue(event);
    
    // Emit for real-time listeners
    this.emit(event.type, event);
  }
  
  async subscribe<T>(
    eventType: string,
    handler: EventHandler<T>
  ): Promise<Subscription> {
    // Register handler
    this.on(eventType, handler);
    
    // Create subscription record
    return this.createSubscription(eventType, handler);
  }
}

export const eventBus = new EventBus();

// Domain Event Interface
interface DomainEvent<T = any> {
  id: string;
  type: string;
  aggregateType: string;
  aggregateId: string;
  data: T;
  metadata: {
    userId: string;
    organizationId: string;
    timestamp: Date;
    correlationId?: string;
    causationId?: string;
  };
}
```

**Cross-Product Event Flow:**
```
┌─────────────────┐
│ Invoice Created │ (Books product)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Event Bus     │
└────────┬────────┘
         │
    ┌────┴────┬────────────┬──────────────┐
    │         │            │              │
    ▼         ▼            ▼              ▼
┌────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐
│ AR     │ │ Notify │ │ Update  │ │ Sync to  │
│ Update │ │ Customer│ │ Analytics│ │ Data     │
│        │ │        │ │         │ │ Warehouse│
└────────┘ └────────┘ └─────────┘ └──────────┘
```

### Data Ownership Boundaries

| Entity | Owner Product | Read Access | Write Access |
|--------|--------------|-------------|--------------|
| Contacts | Core | All products | Core, Books, Commerce |
| Products | Core/Inventory | All products | Core, Inventory, Commerce |
| Chart of Accounts | Books | Books, ERP | Books |
| Invoices | Books/Invoice | Books, Invoice, Core | Books, Invoice |
| Expenses | Expense | Expense, Books, Core | Expense |
| Employees | Payroll | Payroll, Core | Payroll |
| Orders | Commerce | Commerce, Books, Inventory | Commerce |
| Inventory | Inventory | Inventory, Commerce, Books | Inventory |

---

## Security & Compliance

### Authentication Flow

```typescript
// Authentication middleware
export async function authMiddleware(
  request: Request,
  next: NextFunction
) {
  // Extract token from Authorization header or cookie
  const token = extractToken(request);
  
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }
  
  // Validate session
  const session = await auth.validateSession(token);
  
  if (!session) {
    throw new UnauthorizedError('Invalid or expired token');
  }
  
  // Attach user to request context
  request.user = session.user;
  request.organization = session.organization;
  
  next();
}

// tRPC context with authentication
export async function createTRPCContext(opts: CreateContextOptions) {
  const session = await getSessionFromHeader(opts);
  
  return {
    ...opts,
    session,
    user: session?.user ?? null,
    organization: session?.organization ?? null,
    db,
    eventBus,
    notifications,
  };
}
```

### Authorization Patterns

**Role-Based Access Control (RBAC):**
```typescript
// Permission checker
export function createPermissionChecker(user: User, organization: Organization) {
  return {
    can: (action: string, resource: string, context?: any): boolean => {
      const userRoles = getUserRoles(user.id, organization.id);
      
      for (const role of userRoles) {
        const permissions = getPermissionsForRole(role.id);
        
        for (const permission of permissions) {
          if (
            permission.action === action &&
            permission.resource === resource &&
            matchesConditions(permission.conditions, context)
          ) {
            return true;
          }
        }
      }
      
      return false;
    },
    
    cannot: (action: string, resource: string, context?: any): boolean => {
      return !can(action, resource, context);
    },
  };
}

// Usage in tRPC procedure
const invoiceRouter = router({
  create: protectedProcedure
    .input(CreateInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      const can = createPermissionChecker(ctx.user, ctx.organization);
      
      if (!can('create', 'invoice')) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to create invoices',
        });
      }
      
      return createInvoice(input);
    }),
});
```

### Audit Logging

```typescript
// Audit log schema
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull(),
  userId: uuid('user_id'),
  action: text('action').notNull(),
  resource: text('resource').notNull(),
  resourceId: uuid('resource_id'),
  changes: json('changes').$type<{
    before: Record<string, any>;
    after: Record<string, any>;
  }>(),
  metadata: json('metadata').$type<{
    ipAddress: string;
    userAgent: string;
    correlationId: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Audit log decorator
export function auditLog(options: AuditLogOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      
      // Record audit log
      await auditLogs.insert({
        organizationId: this.organizationId,
        userId: this.userId,
        action: options.action,
        resource: options.resource,
        resourceId: result?.id,
        changes: options.recordChanges ? {
          before: options.getBefore?.(args),
          after: result,
        } : undefined,
        metadata: {
          ipAddress: this.ipAddress,
          userAgent: this.userAgent,
          correlationId: this.correlationId,
        },
      });
      
      return result;
    };
    
    return descriptor;
  };
}
```

---

## Scalability Considerations

### Horizontal Scaling

**Stateless Services:**
- All application servers are stateless
- Session state stored in Redis
- No sticky sessions required
- Auto-scaling based on CPU/memory metrics

**Database Scaling:**
- Read replicas for reporting queries
- Connection pooling (PgBouncer)
- Query optimization and indexing
- Partitioning for large tables (time-based)

**Caching Strategy:**
```typescript
// Multi-level caching
class CacheService {
  async get<T>(key: string): Promise<T | null> {
    // Level 1: In-memory cache (fastest)
    const inMemory = await this.memoryCache.get(key);
    if (inMemory) return inMemory;
    
    // Level 2: Redis cache (fast)
    const redis = await this.redisCache.get(key);
    if (redis) {
      // Populate L1 cache
      await this.memoryCache.set(key, redis, 60);
      return redis;
    }
    
    // Level 3: Database (slow)
    const db = await this.database.get(key);
    if (db) {
      // Populate L2 cache
      await this.redisCache.set(key, db, 300);
      return db;
    }
    
    return null;
  }
}
```

### Performance Optimization

**Query Optimization:**
```typescript
// Use indexes effectively
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  customerId: uuid('customer_id').notNull(),
  status: varchar('status').notNull(),
  dueDate: date('due_date').notNull(),
  amount: decimal('amount').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  orgCustomerIdx: index('org_customer_idx').on(table.organizationId, table.customerId),
  statusDueIdx: index('status_due_idx').on(table.status, table.dueDate),
  createdAtIdx: index('created_at_idx').on(table.createdAt),
}));

// Use efficient queries
const invoices = await db.query.invoices.findMany({
  where: and(
    eq(invoices.organizationId, orgId),
    eq(invoices.status, 'pending'),
    lte(invoices.dueDate, new Date()),
  ),
  columns: {
    // Only select needed columns
    id: true,
    invoiceNumber: true,
    amount: true,
    dueDate: true,
  },
  with: {
    // Eager load relations
    customer: {
      columns: { name: true, email: true },
    },
  },
  limit: 50,
});
```

---

## Monitoring & Observability

### Logging Strategy

```typescript
// Structured logging with Pino
import pino from 'pino';

export const logger = pino({
  level: env.LOG_LEVEL || 'info',
  transport: env.PINO_PRETTY === 'true' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  } : undefined,
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    environment: env.NODE_ENV,
    service: 'flamingo-server',
  },
});

// Usage with correlation IDs
export function createRequestLogger(requestId: string) {
  return logger.child({ requestId });
}

// Log context with user and organization
logger.child({
  userId: user.id,
  organizationId: organization.id,
  action: 'invoice.create',
}).info({ invoiceId: invoice.id, amount: invoice.amount }, 'Invoice created');
```

### Metrics Collection

```typescript
// Prometheus metrics
import { Counter, Histogram, Gauge } from 'prom-client';

export const metrics = {
  // Request metrics
  httpRequestDuration: new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
  }),
  
  // Business metrics
  invoicesCreated: new Counter({
    name: 'invoices_created_total',
    help: 'Total number of invoices created',
    labelNames: ['organization_id'],
  }),
  
  paymentsProcessed: new Counter({
    name: 'payments_processed_total',
    help: 'Total number of payments processed',
    labelNames: ['status', 'payment_method'],
  }),
  
  // System metrics
  activeUsers: new Gauge({
    name: 'active_users',
    help: 'Number of currently active users',
    labelNames: ['organization_id'],
  }),
  
  queueSize: new Gauge({
    name: 'queue_size',
    help: 'Current size of job queues',
    labelNames: ['queue_name'],
  }),
};
```

### Error Tracking

```typescript
// Sentry integration
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE || 0.1,
  profilesSampleRate: env.SENTRY_PROFILES_SAMPLE_RATE || 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Postgres(),
  ],
});

// Error handling middleware
export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Log error
  logger.error({
    err: error,
    userId: request.user?.id,
    organizationId: request.organization?.id,
    path: request.path,
    method: request.method,
  }, 'Unhandled error');
  
  // Report to Sentry
  Sentry.captureException(error, {
    extra: {
      userId: request.user?.id,
      organizationId: request.organization?.id,
      path: request.path,
    },
  });
  
  // Send error response
  response.status(500).json({
    error: {
      message: env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : error.message,
      code: 'INTERNAL_ERROR',
    },
  });
}
```

---

## Conclusion

The Flamingo Business Suite architecture is designed to provide a unified, scalable, and secure platform for all 15 products. By following event-driven patterns, maintaining clear data ownership boundaries, and implementing comprehensive security and observability, the platform can scale to support businesses of all sizes while maintaining high performance and reliability.

Key architectural decisions:
1. **Monorepo with modular products**: Single codebase with clear boundaries
2. **Event-driven communication**: Loose coupling between products
3. **Shared services**: Common infrastructure for auth, notifications, search, queues
4. **Type-safe APIs**: tRPC for end-to-end type safety
5. **PostgreSQL primary database**: Drizzle ORM for type-safe queries
6. **Redis for caching and queues**: Upstash for managed Redis
7. **MeiliSearch for full-text search**: Fast, relevant search across products
8. **Comprehensive observability**: Logging, metrics, and error tracking

This architecture provides the foundation for building a world-class business software platform that can compete with established players while maintaining the agility to innovate rapidly.
