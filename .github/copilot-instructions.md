# GitHub Copilot AI Agent for Mobile & Web Development

This workspace is designed to transform GitHub Copilot into an intelligent development partner for mobile and web application development.

## Core Capabilities

- **Multi-Platform Project Generation**: Automated workspace creation for Flutter, Swift, Android Native, Angular, and Flutter Web
- **Context-Aware Development**: AI-powered assistance with project-specific prompts and patterns
- **Cross-Platform UI Generation**: Intelligent component generation across different frameworks
- **API Integration Automation**: Streamlined API client generation and integration
- **Testing & Debugging Support**: Automated test generation and debugging assistance
- **Deployment Automation**: End-to-end deployment workflows for mobile and web platforms

## AI Agent Instructions

When working in this workspace:

1. **Project Scaffolding**: Use the template generators in `/templates/` to create new projects
2. **AI Prompt Integration**: Leverage prompts from `/ai-prompts/` for context-aware assistance
3. **Tech Stack Switching**: Use `/automation/stack-switcher.js` to change technical stacks dynamically
4. **Workflow Automation**: Execute development workflows from `/automation/workflows/`

## Development Guidelines

- Always check the current project's tech stack configuration in `/.vscode/ai-agent-config.json`
- Use the appropriate AI prompts for the current development phase (scaffolding, development, testing, deployment)
- Leverage the automated scripts for repetitive tasks
- Follow the project-specific coding standards defined in each template

## Quick Start

1. Run `npm run create-project` to start the interactive project generator
2. Select your preferred tech stack (Flutter, Swift, Android, Angular, Flutter Web)
3. Follow the AI-guided development process
4. Use GitHub Copilot Chat with the pre-loaded prompts for enhanced assistance