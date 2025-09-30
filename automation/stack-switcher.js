#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

class StackSwitcher {
    constructor() {
        this.workspaceRoot = process.cwd();
        this.configPath = path.join(this.workspaceRoot, '.vscode', 'ai-agent-config.json');
        this.settingsPath = path.join(this.workspaceRoot, '.vscode', 'settings.json');

        this.stacks = {
            'flutter': {
                name: 'Flutter (Cross-platform Mobile)',
                type: 'mobile',
                extensions: ['dart-code.dart-code', 'dart-code.flutter'],
                settings: {
                    'dart.flutterSdkPath': '',
                    'dart.debugExternalPackageLibraries': true,
                    'dart.debugSdkLibraries': false,
                    '[dart]': {
                        'editor.formatOnSave': true,
                        'editor.selectionHighlight': false
                    }
                },
                fileAssociations: {
                    '*.dart': 'dart',
                    'pubspec.yaml': 'yaml',
                    'analysis_options.yaml': 'yaml'
                },
                prompts: ['ui-generation', 'api-integration', 'testing-debugging'],
                snippets: ['ai-flutter-screen', 'ai-flutter-widget', 'ai-flutter-service']
            },
            'swift': {
                name: 'Swift (iOS Native)',
                type: 'mobile',
                extensions: ['sswg.swift-lang'],
                settings: {
                    '[swift]': {
                        'editor.formatOnSave': true,
                        'editor.insertSpaces': true,
                        'editor.tabSize': 4
                    },
                    'swift.path': '',
                    'swift.diagnostics': true
                },
                fileAssociations: {
                    '*.swift': 'swift',
                    '*.h': 'objective-c',
                    '*.m': 'objective-c'
                },
                prompts: ['ui-generation', 'api-integration', 'testing-debugging'],
                snippets: ['ai-swift-vc', 'ai-swift-view', 'ai-swift-service']
            },
            'android-native': {
                name: 'Android Native (Java/Kotlin)',
                type: 'mobile',
                extensions: ['redhat.java', 'vscjava.vscode-java-pack', 'mathiasfrohlich.kotlin'],
                settings: {
                    'java.home': '',
                    '[java]': {
                        'editor.formatOnSave': true,
                        'editor.insertSpaces': true,
                        'editor.tabSize': 4
                    },
                    '[kotlin]': {
                        'editor.formatOnSave': true,
                        'editor.insertSpaces': true,
                        'editor.tabSize': 4
                    }
                },
                fileAssociations: {
                    '*.java': 'java',
                    '*.kt': 'kotlin',
                    '*.xml': 'xml'
                },
                prompts: ['ui-generation', 'api-integration', 'testing-debugging'],
                snippets: ['ai-android-activity', 'ai-android-fragment', 'ai-android-service']
            },
            'angular': {
                name: 'Angular (Web Application)',
                type: 'web',
                extensions: ['angular.ng-template', 'johnpapa.angular2', 'ms-vscode.vscode-typescript-next'],
                settings: {
                    'typescript.preferences.importModuleSpecifier': 'relative',
                    'typescript.suggest.autoImports': true,
                    '[typescript]': {
                        'editor.formatOnSave': true,
                        'editor.codeActionsOnSave': {
                            'source.organizeImports': true,
                            'source.fixAll.eslint': true
                        }
                    },
                    '[html]': {
                        'editor.formatOnSave': true,
                        'editor.suggest.insertMode': 'replace'
                    }
                },
                fileAssociations: {
                    '*.ts': 'typescript',
                    '*.html': 'html',
                    '*.scss': 'scss',
                    '*.css': 'css'
                },
                prompts: ['ui-generation', 'api-integration', 'testing-debugging'],
                snippets: ['ai-ng-component', 'ai-ng-service', 'ai-ng-module']
            },
            'flutter-web': {
                name: 'Flutter Web (Cross-platform Web)',
                type: 'web',
                extensions: ['dart-code.dart-code', 'dart-code.flutter'],
                settings: {
                    'dart.flutterSdkPath': '',
                    'dart.flutterWebRenderer': 'canvaskit',
                    '[dart]': {
                        'editor.formatOnSave': true,
                        'editor.selectionHighlight': false
                    }
                },
                fileAssociations: {
                    '*.dart': 'dart',
                    'pubspec.yaml': 'yaml',
                    '*.html': 'html'
                },
                prompts: ['ui-generation', 'api-integration', 'testing-debugging'],
                snippets: ['ai-flutter-web-page', 'ai-flutter-responsive', 'ai-flutter-pwa']
            }
        };
    }

    async switchStack() {
        console.log(chalk.blue.bold('🔄 Tech Stack Switcher - AI Agent'));
        console.log(chalk.gray('Dynamically switch between technology stacks with preserved AI context\n'));

        try {
            const currentConfig = await this.getCurrentConfig();
            const currentStack = currentConfig.currentTechStack || 'none';

            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'targetStack',
                    message: `Current stack: ${currentStack}. Select new tech stack:`,
                    choices: Object.entries(this.stacks).map(([key, value]) => ({
                        name: `${value.name} ${key === currentStack ? '(current)' : ''}`,
                        value: key,
                        disabled: key === currentStack ? 'Already selected' : false
                    }))
                },
                {
                    type: 'confirm',
                    name: 'preserveProjects',
                    message: 'Preserve existing project files and configurations?',
                    default: true
                },
                {
                    type: 'checkbox',
                    name: 'switchComponents',
                    message: 'What should be updated for the new tech stack?',
                    choices: [
                        { name: 'VS Code Settings & Extensions', value: 'settings', checked: true },
                        { name: 'AI Prompts & Snippets', value: 'prompts', checked: true },
                        { name: 'File Associations', value: 'files', checked: true },
                        { name: 'Development Workflows', value: 'workflows', checked: true },
                        { name: 'Testing Configuration', value: 'testing', checked: true }
                    ]
                },
                {
                    type: 'confirm',
                    name: 'installExtensions',
                    message: 'Automatically install recommended VS Code extensions?',
                    default: true
                }
            ]);

            await this.performStackSwitch(answers, currentConfig);

        } catch (error) {
            console.error(chalk.red.bold('❌ Error switching tech stack:'), error.message);
            process.exit(1);
        }
    }

    async getCurrentConfig() {
        if (await fs.pathExists(this.configPath)) {
            return await fs.readJSON(this.configPath);
        }
        return {
            currentTechStack: 'none',
            projectType: 'unknown',
            aiPromptCategories: []
        };
    }

    async performStackSwitch(answers, currentConfig) {
        const { targetStack, preserveProjects, switchComponents, installExtensions } = answers;
        const stackConfig = this.stacks[targetStack];

        console.log(chalk.yellow(`\n🔧 Switching to ${stackConfig.name}...`));

        // Update AI agent configuration
        if (switchComponents.includes('settings')) {
            await this.updateAIConfig(targetStack, stackConfig, currentConfig);
        }

        // Update VS Code settings
        if (switchComponents.includes('settings')) {
            await this.updateVSCodeSettings(stackConfig);
        }

        // Update file associations
        if (switchComponents.includes('files')) {
            await this.updateFileAssociations(stackConfig);
        }

        // Update AI prompts and snippets
        if (switchComponents.includes('prompts')) {
            await this.updateAIPrompts(targetStack, stackConfig);
        }

        // Update development workflows
        if (switchComponents.includes('workflows')) {
            await this.updateWorkflows(targetStack, stackConfig);
        }

        // Update testing configuration
        if (switchComponents.includes('testing')) {
            await this.updateTestingConfig(targetStack, stackConfig);
        }

        // Install extensions if requested
        if (installExtensions) {
            await this.updateExtensionRecommendations(stackConfig);
        }

        // Create migration guide if preserving projects
        if (preserveProjects) {
            await this.createMigrationGuide(targetStack, currentConfig.currentTechStack);
        }

        console.log(chalk.green.bold(`\n✅ Successfully switched to ${stackConfig.name}!`));
        this.displaySwitchSummary(targetStack, stackConfig, switchComponents);
    }

    async updateAIConfig(targetStack, stackConfig, currentConfig) {
        const updatedConfig = {
            ...currentConfig,
            currentTechStack: targetStack,
            projectType: stackConfig.type,
            aiPromptCategories: stackConfig.prompts,
            stackSwitchHistory: [
                ...(currentConfig.stackSwitchHistory || []),
                {
                    from: currentConfig.currentTechStack,
                    to: targetStack,
                    timestamp: new Date().toISOString()
                }
            ],
            lastUpdated: new Date().toISOString()
        };

        await fs.writeJSON(this.configPath, updatedConfig, { spaces: 2 });
        console.log(chalk.green('📝 Updated AI agent configuration'));
    }

    async updateVSCodeSettings(stackConfig) {
        let settings = {};

        if (await fs.pathExists(this.settingsPath)) {
            settings = await fs.readJSON(this.settingsPath);
        }

        // Merge stack-specific settings
        Object.assign(settings, stackConfig.settings);

        // Update AI-specific settings
        settings['ai-agent'] = {
            ...settings['ai-agent'],
            currentStack: stackConfig.name,
            enabledFeatures: stackConfig.prompts
        };

        await fs.writeJSON(this.settingsPath, settings, { spaces: 2 });
        console.log(chalk.green('⚙️ Updated VS Code settings'));
    }

    async updateFileAssociations(stackConfig) {
        let settings = {};

        if (await fs.pathExists(this.settingsPath)) {
            settings = await fs.readJSON(this.settingsPath);
        }

        settings['files.associations'] = {
            ...settings['files.associations'],
            ...stackConfig.fileAssociations
        };

        await fs.writeJSON(this.settingsPath, settings, { spaces: 2 });
        console.log(chalk.green('📁 Updated file associations'));
    }

    async updateAIPrompts(targetStack, stackConfig) {
        const promptsDir = path.join(this.workspaceRoot, '.copilot-prompts');
        await fs.ensureDir(promptsDir);

        // Copy stack-specific prompts
        const sourcePrompts = path.join(this.workspaceRoot, 'ai-prompts', targetStack);
        const targetPrompts = path.join(promptsDir, 'current-stack');

        if (await fs.pathExists(sourcePrompts)) {
            await fs.copy(sourcePrompts, targetPrompts);
        }

        // Update snippets configuration
        const snippetsPath = path.join(this.workspaceRoot, '.vscode', 'ai-development.code-snippets');
        if (await fs.pathExists(snippetsPath)) {
            const snippets = await fs.readJSON(snippetsPath);

            // Add stack-specific snippets metadata
            snippets._metadata = {
                currentStack: targetStack,
                availableSnippets: stackConfig.snippets,
                lastUpdated: new Date().toISOString()
            };

            await fs.writeJSON(snippetsPath, snippets, { spaces: 2 });
        }

        console.log(chalk.green('🤖 Updated AI prompts and snippets'));
    }

    async updateWorkflows(targetStack, stackConfig) {
        const workflowsPath = path.join(this.workspaceRoot, '.vscode', 'ai-workflows.json');

        if (await fs.pathExists(workflowsPath)) {
            const workflows = await fs.readJSON(workflowsPath);

            // Update workflows for current stack
            workflows[`${targetStack}-development`] = {
                name: `${stackConfig.name} Development Workflow`,
                stack: targetStack,
                type: stackConfig.type,
                steps: this.getStackSpecificWorkflowSteps(targetStack),
                prompts: stackConfig.snippets,
                extensions: stackConfig.extensions
            };

            workflows._metadata = {
                currentStack: targetStack,
                lastUpdated: new Date().toISOString()
            };

            await fs.writeJSON(workflowsPath, workflows, { spaces: 2 });
        }

        console.log(chalk.green('🔄 Updated development workflows'));
    }

    async updateTestingConfig(targetStack, stackConfig) {
        const testingConfig = this.getStackSpecificTestingConfig(targetStack);
        const configPath = path.join(this.workspaceRoot, '.vscode', 'testing-config.json');

        await fs.writeJSON(configPath, {
            stack: targetStack,
            type: stackConfig.type,
            ...testingConfig,
            lastUpdated: new Date().toISOString()
        }, { spaces: 2 });

        console.log(chalk.green('🧪 Updated testing configuration'));
    }

    async updateExtensionRecommendations(stackConfig) {
        const extensionsPath = path.join(this.workspaceRoot, '.vscode', 'extensions.json');
        let extensions = { recommendations: [], unwantedRecommendations: [] };

        if (await fs.pathExists(extensionsPath)) {
            extensions = await fs.readJSON(extensionsPath);
        }

        // Add stack-specific extensions
        const newRecommendations = [
            ...new Set([...extensions.recommendations, ...stackConfig.extensions])
        ];

        extensions.recommendations = newRecommendations;

        await fs.writeJSON(extensionsPath, extensions, { spaces: 2 });
        console.log(chalk.green('🔌 Updated extension recommendations'));
    }

    async createMigrationGuide(targetStack, previousStack) {
        if (!previousStack || previousStack === 'none') return;

        const migrationGuide = `# Stack Migration Guide: ${previousStack} → ${targetStack}

## Migration Overview

You've switched from **${previousStack}** to **${targetStack}**. This guide helps you migrate existing code and understand the differences.

## Key Changes

### Development Environment
- **Extensions**: New VS Code extensions have been recommended for ${targetStack}
- **Settings**: Language-specific settings updated for optimal ${targetStack} development
- **File Associations**: File types now associated with ${targetStack} tools

### AI Assistance Updates
- **Prompts**: AI prompts updated for ${targetStack} best practices
- **Snippets**: Code snippets now generate ${targetStack} boilerplate
- **Context**: GitHub Copilot context updated for ${targetStack} patterns

## Migration Steps

### 1. Install New Extensions
Open VS Code Command Palette (\`Ctrl+Shift+P\`) and run:
\`\`\`
Extensions: Show Recommended Extensions
\`\`\`

### 2. Update Existing Code
${this.getMigrationSteps(previousStack, targetStack)}

### 3. Test Configuration
- Run the new development server/build tools
- Verify AI assistance is working with new stack
- Update any CI/CD configurations if needed

## AI Assistance Tips

### New Snippets Available
${this.stacks[targetStack].snippets.map(snippet => `- \`${snippet}\``).join('\n')}

### Updated Copilot Context
- Comments now optimized for ${targetStack} patterns
- Copilot Chat understands ${targetStack} best practices
- Code generation follows ${targetStack} conventions

## Need Help?

- Check the updated AI-USAGE-GUIDE.md for ${targetStack} specific tips
- Use \`@copilot\` in VS Code chat for migration assistance
- Review the new prompt files in \`.copilot-prompts/current-stack/\`

---
*Generated on ${new Date().toLocaleDateString()} during stack migration*
`;

        await fs.writeFile(path.join(this.workspaceRoot, 'MIGRATION-GUIDE.md'), migrationGuide);
        console.log(chalk.green('📚 Created migration guide'));
    }

    getStackSpecificWorkflowSteps(stack) {
        const workflows = {
            'flutter': [
                'Create widget with ai-flutter-screen',
                'Add state management with Provider/Riverpod',
                'Implement API integration',
                'Add responsive design',
                'Generate unit and widget tests',
                'Optimize for both iOS and Android'
            ],
            'swift': [
                'Create view controller with ai-swift-vc',
                'Setup Auto Layout constraints',
                'Implement networking layer',
                'Add iOS-specific features',
                'Create unit and UI tests',
                'Optimize for different iOS devices'
            ],
            'angular': [
                'Create component with ai-ng-component',
                'Setup reactive forms and services',
                'Implement routing and navigation',
                'Add responsive design',
                'Generate comprehensive tests',
                'Optimize for web performance'
            ]
        };

        return workflows[stack] || ['Create components', 'Add functionality', 'Test implementation'];
    }

    getStackSpecificTestingConfig(stack) {
        const configs = {
            'flutter': {
                testFramework: 'flutter_test',
                testTypes: ['unit', 'widget', 'integration'],
                commands: {
                    unit: 'flutter test',
                    widget: 'flutter test test/widget_test.dart',
                    integration: 'flutter drive --target=test_driver/app.dart'
                }
            },
            'swift': {
                testFramework: 'XCTest',
                testTypes: ['unit', 'ui', 'performance'],
                commands: {
                    unit: 'xcodebuild test -scheme YourApp -destination "platform=iOS Simulator,name=iPhone 14"',
                    ui: 'xcodebuild test -scheme YourAppUITests',
                    performance: 'xcodebuild test -scheme YourAppPerformanceTests'
                }
            },
            'angular': {
                testFramework: 'jasmine/karma',
                testTypes: ['unit', 'integration', 'e2e'],
                commands: {
                    unit: 'ng test',
                    integration: 'ng test --code-coverage',
                    e2e: 'ng e2e'
                }
            }
        };

        return configs[stack] || { testFramework: 'generic', testTypes: ['unit'], commands: {} };
    }

    getMigrationSteps(from, to) {
        // This would contain specific migration steps between stacks
        return `
### Code Structure
- Review existing component/class structure
- Update import statements and dependencies
- Adapt to new framework patterns

### Dependencies
- Update package manager files (pubspec.yaml, package.json, etc.)
- Install new framework-specific dependencies
- Remove old dependencies if not needed

### Testing
- Migrate existing tests to new framework testing patterns
- Update test configuration files
- Verify all tests pass with new stack
`;
    }

    displaySwitchSummary(targetStack, stackConfig, switchComponents) {
        console.log(chalk.blue.bold('\n🎯 Stack Switch Summary:'));
        console.log(chalk.white(`📱 New Stack: ${stackConfig.name}`));
        console.log(chalk.white(`📂 Project Type: ${stackConfig.type}`));
        console.log(chalk.white(`🔧 Components Updated: ${switchComponents.join(', ')}`));

        console.log(chalk.cyan.bold('\n📋 Next Steps:'));
        console.log(chalk.cyan('1. Reload VS Code window for settings to take effect'));
        console.log(chalk.cyan('2. Install recommended extensions if prompted'));
        console.log(chalk.cyan('3. Try AI snippets specific to your new stack'));
        console.log(chalk.cyan('4. Check MIGRATION-GUIDE.md for detailed migration steps'));

        console.log(chalk.green.bold('\n✨ Ready to develop with your new tech stack!'));
    }
}

// Run the stack switcher if called directly
if (require.main === module) {
    const switcher = new StackSwitcher();
    switcher.switchStack().catch(console.error);
}

module.exports = StackSwitcher;