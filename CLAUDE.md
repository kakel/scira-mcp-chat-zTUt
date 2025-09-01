# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the production application with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `db:generate` - Generate Drizzle migrations
- `db:migrate` - Run database migrations
- `db:push` - Push schema changes directly to database
- `db:studio` - Open Drizzle Studio for database management

## Architecture Overview

This is a Next.js 15 AI chatbot application with Model Context Protocol (MCP) integration, using the AI SDK by Vercel.

### Core Components

- **Database**: PostgreSQL with Drizzle ORM, schema defined in `lib/db/schema.ts`
- **AI Providers**: Multiple AI providers (OpenAI, Anthropic, Groq, XAI) configured in `ai/providers.ts`
- **MCP Integration**: Full MCP server support with both SSE and stdio transports in `app/api/chat/route.ts`
- **Chat System**: Message handling with structured parts, tool calls, and attachments
- **UI**: shadcn/ui components with Tailwind CSS

### Key Architecture Patterns

- **MCP Server Management**: Dynamic MCP server configuration with automatic package installation for Python-based tools
- **Multi-Provider AI**: Configurable AI model switching with API key management via environment variables and localStorage
- **Database Schema**: Chat and message tables with JSON parts for flexible content storage
- **Reasoning Support**: Built-in support for thinking/reasoning models with token budgeting

### Database Structure

The application uses two main tables:
- `chats`: Stores chat metadata (id, userId, title, timestamps)
- `messages`: Stores individual messages with JSON parts for flexible content (text, tool calls, attachments)

### MCP Integration Details

MCP servers can be configured with:
- **SSE Transport**: For remote HTTP-based MCP servers
- **stdio Transport**: For local command-based MCP servers with automatic Python package installation

The system automatically handles package installation for Python-based MCP tools and converts `uvx` commands to `python3 -m uv run` patterns.