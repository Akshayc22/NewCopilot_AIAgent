#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

class PromptManager {
    constructor() {
        this.promptsDir = path.join(process.cwd(), 'ai-prompts');
        this.configPath = path.join(process.cwd(), '.vscode', 'ai-agent-config.json');
    }

    async setupPrompts() {
        console.log(chalk.blue.bold('🤖 AI Prompt Manager - GitHub Copilot Integration'));
        console.log(chalk.gray('Configure AI prompts for enhanced development assistance\n'));

        const answers = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'techStacks',
                message: 'Select technology stacks to configure prompts for:',
                choices: [
                    { name: '📱 Flutter (Mobile)', value: 'flutter', checked: true },
                    { name: '🍎 Swift (iOS)', value: 'swift', checked: true },
                    { name: '🤖 Android Native', value: 'android', checked: false },
                    { name: '🌐 Angular (Web)', value: 'angular', checked: true },
                    { name: '🌍 Flutter Web', value: 'flutter-web', checked: false },
                    { name: '🔄 Shared/Cross-platform', value: 'shared', checked: true }
                ]
            },
            {
                type: 'checkbox',
                name: 'promptCategories',
                message: 'Select prompt categories to include:',
                choices: [
                    { name: '🎨 UI/UX Generation', value: 'ui-generation', checked: true },
                    { name: '🔌 API Integration', value: 'api-integration', checked: true },
                    { name: '🧪 Testing & Debugging', value: 'testing-debugging', checked: true },
                    { name: '🚀 Deployment & DevOps', value: 'deployment', checked: true },
                    { name: '⚡ Performance Optimization', value: 'performance', checked: true },
                    { name: '🔒 Security Implementation', value: 'security', checked: true }
                ]
            },
            {
                type: 'list',
                name: 'integrationMode',
                message: 'Choose GitHub Copilot integration mode:',
                choices: [
                    { name: 'VS Code Extension Integration (Recommended)', value: 'extension' },
                    { name: 'File-based Prompts in Project', value: 'files' },
                    { name: 'Both Extension and Files', value: 'both' }
                ]
            },
            {
                type: 'confirm',
                name: 'createCustomPrompts',
                message: 'Create custom prompt templates for your specific project needs?',
                default: true
            }
        ]);

        await this.configurePrompts(answers);
    }

    async configurePrompts(config) {
        const { techStacks, promptCategories, integrationMode, createCustomPrompts } = config;

        console.log(chalk.yellow('\n🔧 Configuring AI prompts...'));

        try {
            // Update AI agent configuration
            await this.updateAIConfig(techStacks, promptCategories, integrationMode);

            // Create VS Code settings for Copilot integration
            if (integrationMode === 'extension' || integrationMode === 'both') {
                await this.setupVSCodeIntegration(techStacks, promptCategories);
            }

            // Copy prompt files to project if needed
            if (integrationMode === 'files' || integrationMode === 'both') {
                await this.copyPromptFiles(techStacks, promptCategories);
            }

            // Create custom prompt templates
            if (createCustomPrompts) {
                await this.createCustomPromptTemplates(techStacks);
            }

            // Generate prompt usage guide
            await this.generateUsageGuide(config);

            console.log(chalk.green.bold('\n✅ AI prompts configured successfully!'));
            this.displayUsageInstructions(config);

        } catch (error) {
            console.error(chalk.red.bold('❌ Error configuring prompts:'), error.message);
            process.exit(1);
        }
    }

    async updateAIConfig(techStacks, promptCategories, integrationMode) {
        const config = await fs.readJSON(this.configPath);

        config.aiPromptCategories = promptCategories;
        config.enabledTechStacks = techStacks;
        config.copilotIntegration.mode = integrationMode;
        config.copilotIntegration.lastUpdated = new Date().toISOString();

        await fs.writeJSON(this.configPath, config, { spaces: 2 });
        console.log(chalk.green('📝 Updated AI agent configuration'));
    }

    async setupVSCodeIntegration(techStacks, promptCategories) {
        const vscodeDir = path.join(process.cwd(), '.vscode');
        await fs.ensureDir(vscodeDir);

        // Create VS Code settings for Copilot
        const settingsPath = path.join(vscodeDir, 'settings.json');
        let settings = {};

        if (await fs.pathExists(settingsPath)) {
            settings = await fs.readJSON(settingsPath);
        }

        // Configure GitHub Copilot settings
        settings['github.copilot.enable'] = {
            '*': true,
            'yaml': true,
            'plaintext': false,
            'markdown': true
        };

        settings['github.copilot.advanced'] = {
            'debug.overrideEngine': 'copilot',
            'debug.testOverrideProxyUrl': '',
            'debug.overrideProxyUrl': '',
            'length': 500
        };

        // Add prompt-specific settings
        settings['ai-prompts'] = {
            enabledStacks: techStacks,
            promptCategories: promptCategories,
            autoSuggest: true,
            contextAware: true
        };

        await fs.writeJSON(settingsPath, settings, { spaces: 2 });
        console.log(chalk.green('⚙️ Updated VS Code settings for Copilot integration'));

        // Create snippets for quick prompt access
        await this.createCopilotSnippets(techStacks, promptCategories);
    }

    async createCopilotSnippets(techStacks, promptCategories) {
        const snippetsDir = path.join(process.cwd(), '.vscode');
        const snippetsFile = path.join(snippetsDir, 'ai-prompts.code-snippets');

        const snippets = {
            'AI Flutter UI': {
                prefix: 'ai-flutter-ui',
                body: [
                    'Create a Flutter ${1:component_type} with:',
                    '- Material Design 3 components',
                    '- Responsive layout for mobile and tablet',
                    '- State management using ${2:Provider/Riverpod}',
                    '- ${3:specific_requirements}',
                    '',
                    'Include proper error handling and accessibility support.'
                ],
                description: 'Flutter UI generation prompt'
            },
            'AI API Integration': {
                prefix: 'ai-api',
                body: [
                    'Create ${1:platform} API service for ${2:feature_name} with:',
                    '- HTTP client with error handling',
                    '- Authentication and token management',
                    '- Type-safe response models',
                    '- Caching and offline support',
                    '- ${3:additional_requirements}'
                ],
                description: 'API integration prompt'
            },
            'AI Testing Setup': {
                prefix: 'ai-test',
                body: [
                    'Generate comprehensive tests for ${1:component_name} including:',
                    '- Unit tests with ${2:90}% coverage',
                    '- Integration tests for user workflows',
                    '- Mock external dependencies',
                    '- Error condition testing',
                    '- ${3:specific_test_requirements}'
                ],
                description: 'Testing generation prompt'
            }
        };

        await fs.writeJSON(snippetsFile, snippets, { spaces: 2 });
        console.log(chalk.green('📝 Created Copilot code snippets'));
    }

    async copyPromptFiles(techStacks, promptCategories) {
        const projectPromptsDir = path.join(process.cwd(), '.copilot-prompts');
        await fs.ensureDir(projectPromptsDir);

        for (const stack of techStacks) {
            const stackDir = path.join(this.promptsDir, stack);
            const targetDir = path.join(projectPromptsDir, stack);

            if (await fs.pathExists(stackDir)) {
                await fs.copy(stackDir, targetDir);
                console.log(chalk.green(`📋 Copied ${stack} prompts to project`));
            }
        }
    }

    async createCustomPromptTemplates(techStacks) {
        const customDir = path.join(process.cwd(), '.copilot-prompts', 'custom');
        await fs.ensureDir(customDir);

        const customTemplate = `# Custom AI Prompts for ${techStacks.join(', ')}

## Project-Specific Patterns
\`\`\`
Create [component type] following our project conventions:
- Use our custom design system components
- Follow our naming conventions: [describe your conventions]
- Implement our standard error handling patterns
- Include our required accessibility features
- Follow our code review checklist requirements

Project-specific requirements:
- [Add your specific requirements here]
- [Include any special patterns or practices]
- [Document any constraints or preferences]
\`\`\`

## Business Logic Patterns
\`\`\`
Implement [business feature] with:
- Our standard data validation rules
- Integration with our existing services
- Proper logging and monitoring
- Error handling according to our standards
- Performance requirements: [specify requirements]

Business context:
- [Describe your business domain]
- [Include any domain-specific terminology]
- [Document any compliance requirements]
\`\`\`

## Integration Patterns
\`\`\`
Create integration with [service name] following:
- Our API client patterns and error handling
- Our authentication and authorization flow
- Our data transformation and validation rules
- Our caching and performance optimization strategies
- Our monitoring and alerting requirements

Add any project-specific integration requirements here.
\`\`\`
`;

        await fs.writeFile(path.join(customDir, 'project-prompts.md'), customTemplate);
        console.log(chalk.green('📝 Created custom prompt templates'));
    }

    async generateUsageGuide(config) {
        const guideContent = `# AI Development Assistant - Usage Guide

## Quick Start

This project is configured with AI-powered development assistance using GitHub Copilot.

### Enabled Technology Stacks
${config.techStacks.map(stack => `- ${stack}`).join('\n')}

### Available Prompt Categories
${config.promptCategories.map(category => `- ${category}`).join('\n')}

## Using AI Prompts

### In VS Code with GitHub Copilot

1. **Code Snippets**: Type \`ai-\` and select from autocomplete options
2. **Copilot Chat**: Use \`@copilot\` and reference the prompts in \`.copilot-prompts/\`
3. **Comment-driven**: Write detailed comments describing what you want to build

### Example Usage

\`\`\`typescript
// AI: Create a responsive user profile component with form validation
// Include: profile image upload, social media links, bio text area
// Style: Material Design with dark mode support
// Validation: Email format, required fields, character limits
\`\`\`

### Best Practices

1. **Be Specific**: Include details about requirements, constraints, and preferences
2. **Provide Context**: Reference existing code patterns and architectural decisions
3. **Iterate**: Use Copilot Chat to refine and improve generated code
4. **Review**: Always review AI-generated code for security and performance

## Available Prompts

### UI Generation
- Component creation with responsive design
- Form handling with validation
- Animation and transition implementation
- Accessibility compliance

### API Integration
- RESTful service implementation
- Authentication and security
- Error handling and retry logic
- Data modeling and serialization

### Testing
- Unit test generation
- Integration test setup
- Mock creation and test data
- Performance and accessibility testing

### Performance & Security
- Code optimization techniques
- Security best practices
- Monitoring and debugging setup
- Deployment and DevOps automation

## Integration Mode: ${config.integrationMode}

${config.integrationMode === 'extension' ?
                'Prompts are integrated directly with VS Code and GitHub Copilot extension.' :
                config.integrationMode === 'files' ?
                    'Prompts are available as files in the .copilot-prompts/ directory.' :
                    'Prompts are available both as VS Code integration and file-based access.'
            }

## Need Help?

- Check the prompt files in \`.copilot-prompts/\` for detailed examples
- Use GitHub Copilot Chat with \`@copilot\` for interactive assistance
- Refer to the project README for architecture and patterns
- Update prompts in \`.copilot-prompts/custom/\` for project-specific needs

Happy coding with AI assistance! 🚀
`;

        await fs.writeFile(path.join(process.cwd(), 'AI-USAGE-GUIDE.md'), guideContent);
        console.log(chalk.green('📚 Generated AI usage guide'));
    }

    displayUsageInstructions(config) {
        console.log(chalk.blue.bold('\n🚀 Next Steps:'));
        console.log(chalk.white('1. Open VS Code and ensure GitHub Copilot extension is enabled'));
        console.log(chalk.white('2. Try typing "ai-" to see available code snippets'));
        console.log(chalk.white('3. Use Copilot Chat with @copilot for interactive assistance'));
        console.log(chalk.white('4. Check AI-USAGE-GUIDE.md for detailed instructions'));
        console.log(chalk.white('5. Customize prompts in .copilot-prompts/custom/ for your needs'));

        console.log(chalk.cyan.bold('\n📋 Available Commands:'));
        console.log(chalk.cyan('- Type "ai-flutter-ui" for Flutter UI generation'));
        console.log(chalk.cyan('- Type "ai-api" for API integration prompts'));
        console.log(chalk.cyan('- Type "ai-test" for testing setup prompts'));

        console.log(chalk.green.bold('\n✨ Your AI development assistant is ready!'));
    }
}

// Run the prompt manager if called directly
if (require.main === module) {
    const promptManager = new PromptManager();
    promptManager.setupPrompts().catch(console.error);
}

module.exports = PromptManager;