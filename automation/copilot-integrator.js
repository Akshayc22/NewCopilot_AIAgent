#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class CopilotIntegrator {
    constructor() {
        this.workspaceRoot = process.cwd();
        this.vscodeDir = path.join(this.workspaceRoot, '.vscode');
        this.configPath = path.join(this.vscodeDir, 'ai-agent-config.json');
    }

    async setupCopilotIntegration() {
        console.log(chalk.blue.bold('🤖 GitHub Copilot Integration Setup'));
        console.log(chalk.gray('Configuring advanced AI assistance for development\n'));

        try {
            await this.createCopilotConfiguration();
            await this.setupIntelliSenseEnhancements();
            await this.createContextualPrompts();
            await this.setupWorkspaceSnippets();
            await this.configureLanguageSupport();
            await this.createCopilotWorkflows();

            console.log(chalk.green.bold('\n✅ GitHub Copilot integration setup complete!'));
            this.displayIntegrationGuide();

        } catch (error) {
            console.error(chalk.red.bold('❌ Error setting up Copilot integration:'), error.message);
            process.exit(1);
        }
    }

    async createCopilotConfiguration() {
        const copilotConfig = {
            version: '1.0.0',
            aiAssistant: {
                provider: 'github-copilot',
                mode: 'enhanced',
                contextAware: true,
                features: {
                    inlineSuggestions: true,
                    chatAssistance: true,
                    codeCompletion: true,
                    documentationGeneration: true,
                    testGeneration: true,
                    refactoring: true
                }
            },
            promptEngineering: {
                useCustomPrompts: true,
                contextualHints: true,
                domainSpecificPatterns: true,
                architecturalGuidance: true
            },
            codeGeneration: {
                followProjectPatterns: true,
                includeErrorHandling: true,
                generateDocumentation: true,
                includeTests: true,
                optimizePerformance: true
            },
            supportedLanguages: [
                'dart',
                'swift',
                'typescript',
                'javascript',
                'html',
                'css',
                'scss',
                'json',
                'yaml',
                'markdown'
            ]
        };

        const configFile = path.join(this.vscodeDir, 'copilot-config.json');
        await fs.writeJSON(configFile, copilotConfig, { spaces: 2 });
        console.log(chalk.green('📝 Created Copilot configuration'));
    }

    async setupIntelliSenseEnhancements() {
        const intellisenseConfig = {
            'typescript.suggest.completeFunctionCalls': true,
            'typescript.suggest.includeAutomaticOptionalChainCompletions': true,
            'javascript.suggest.completeFunctionCalls': true,
            'editor.parameterHints.enabled': true,
            'editor.quickSuggestions': {
                'other': true,
                'comments': true,
                'strings': true
            },
            'editor.wordBasedSuggestions': true,
            'editor.suggest.snippetsPreventQuickSuggestions': false,
            'editor.acceptSuggestionOnCommitCharacter': true,
            'editor.acceptSuggestionOnEnter': 'smart'
        };

        const settingsPath = path.join(this.vscodeDir, 'settings.json');
        let settings = {};

        if (await fs.pathExists(settingsPath)) {
            settings = await fs.readJSON(settingsPath);
        }

        Object.assign(settings, intellisenseConfig);
        await fs.writeJSON(settingsPath, settings, { spaces: 2 });
        console.log(chalk.green('⚡ Enhanced IntelliSense configuration'));
    }

    async createContextualPrompts() {
        const contextualPrompts = {
            'flutter-widget': {
                trigger: 'class.*extends StatefulWidget|class.*extends StatelessWidget',
                prompt: 'AI Context: This is a Flutter widget. Consider Material Design guidelines, state management, and responsive design.',
                suggestions: [
                    'Add proper key handling',
                    'Include accessibility labels',
                    'Consider different screen sizes',
                    'Add error boundaries',
                    'Follow Flutter best practices'
                ]
            },
            'swift-viewcontroller': {
                trigger: 'class.*UIViewController|class.*NSViewController',
                prompt: 'AI Context: This is an iOS view controller. Consider iOS Human Interface Guidelines, memory management, and view lifecycle.',
                suggestions: [
                    'Implement proper lifecycle methods',
                    'Add accessibility support',
                    'Handle memory management',
                    'Follow iOS design patterns',
                    'Consider different device sizes'
                ]
            },
            'angular-component': {
                trigger: '@Component\\(|export class.*Component',
                prompt: 'AI Context: This is an Angular component. Consider reactive patterns, change detection, and accessibility.',
                suggestions: [
                    'Use OnPush change detection when possible',
                    'Implement OnDestroy for cleanup',
                    'Add proper input/output types',
                    'Include accessibility attributes',
                    'Follow Angular style guide'
                ]
            },
            'api-service': {
                trigger: 'class.*Service|interface.*API',
                prompt: 'AI Context: This is an API service. Consider error handling, retry logic, typing, and performance.',
                suggestions: [
                    'Add comprehensive error handling',
                    'Implement retry logic',
                    'Use proper TypeScript types',
                    'Add request/response logging',
                    'Consider caching strategies'
                ]
            }
        };

        const promptsFile = path.join(this.vscodeDir, 'contextual-prompts.json');
        await fs.writeJSON(promptsFile, contextualPrompts, { spaces: 2 });
        console.log(chalk.green('🎯 Created contextual prompts'));
    }

    async setupWorkspaceSnippets() {
        const snippets = {
            // Flutter Snippets
            'AI Flutter Screen': {
                prefix: 'ai-flutter-screen',
                body: [
                    'import \\'package:flutter/material.dart\\';',
                    '',
                    'class ${1:ScreenName}Screen extends StatefulWidget {',
                    '  const ${1:ScreenName}Screen({Key? key}) : super(key: key);',
                    '',
                    '  @override',
                    '  State<${1:ScreenName}Screen> createState() => _${1:ScreenName}ScreenState();',
                    '}',
                    '',
                    'class _${1:ScreenName}ScreenState extends State<${1:ScreenName}Screen> {',
                    '  @override',
                    '  Widget build(BuildContext context) {',
                    '    return Scaffold(',
                    '      appBar: AppBar(',
                    '        title: const Text(\\'${2:Screen Title}\\'),',
                    '      ),',
                    '      body: const Center(',
                    '        child: Column(',
                    '          mainAxisAlignment: MainAxisAlignment.center,',
                    '          children: <Widget>[',
                    '            ${3:// AI: Add your widgets here}',
                    '          ],',
                    '        ),',
                    '      ),',
                    '    );',
                    '  }',
                    '}'
                ],
                description: 'AI-optimized Flutter screen template'
            },

            // Swift Snippets
            'AI Swift ViewController': {
                prefix: 'ai-swift-vc',
                body: [
                    'import UIKit',
                    '',
                    'class ${1:ViewController}: UIViewController {',
                    '    ',
                    '    // MARK: - IBOutlets',
                    '    ${2:// AI: Add your outlets here}',
                    '    ',
                    '    // MARK: - Properties',
                    '    ${3:// AI: Add your properties here}',
                    '    ',
                    '    // MARK: - Lifecycle',
                    '    override func viewDidLoad() {',
                    '        super.viewDidLoad()',
                    '        setupUI()',
                    '        setupConstraints()',
                    '    }',
                    '    ',
                    '    // MARK: - Setup',
                    '    private func setupUI() {',
                    '        ${4:// AI: Configure UI elements}',
                    '    }',
                    '    ',
                    '    private func setupConstraints() {',
                    '        ${5:// AI: Setup Auto Layout constraints}',
                    '    }',
                    '    ',
                    '    // MARK: - Actions',
                    '    ${6:// AI: Add your actions here}',
                    '}'
                ],
                description: 'AI-optimized Swift view controller template'
            },

            // Angular Snippets
            'AI Angular Component': {
                prefix: 'ai-ng-component',
                body: [
                    'import { Component, OnInit, OnDestroy } from \\'@angular/core\\';',
                    'import { Subject } from \\'rxjs\\';',
                    'import { takeUntil } from \\'rxjs/operators\\';',
                    '',
                    '@Component({',
                    '  selector: \\'app-${1:component-name}\\',',
                    '  templateUrl: \\'./${1:component-name}.component.html\\',',
                    '  styleUrls: [\\'./${1:component-name}.component.scss\\']',
                    '})',
                    'export class ${2:ComponentName}Component implements OnInit, OnDestroy {',
                    '  private destroy$ = new Subject<void>();',
                    '',
                    '  constructor() { }',
                    '',
                    '  ngOnInit(): void {',
                    '    ${3:// AI: Initialize component}',
                    '  }',
                    '',
                    '  ngOnDestroy(): void {',
                    '    this.destroy$.next();',
                    '    this.destroy$.complete();',
                    '  }',
                    '',
                    '  ${4:// AI: Add your methods here}',
                    '}'
                ],
                description: 'AI-optimized Angular component template'
            },

            // API Service Snippets
            'AI API Service': {
                prefix: 'ai-api-service',
                body: [
                    'import { Injectable } from \\'@angular/core\\';',
                    'import { HttpClient, HttpErrorResponse } from \\'@angular/common/http\\';',
                    'import { Observable, throwError } from \\'rxjs\\';',
                    'import { catchError, retry, timeout } from \\'rxjs/operators\\';',
                    '',
                    '@Injectable({',
                    '  providedIn: \\'root\\'',
                    '})',
                    'export class ${1:ServiceName}Service {',
                    '  private readonly baseUrl = \\'${2:https://api.example.com}\\';',
                    '  private readonly timeoutMs = 10000;',
                    '',
                    '  constructor(private http: HttpClient) { }',
                    '',
                    '  ${3:// AI: Add your API methods here}',
                    '',
                    '  private handleError(error: HttpErrorResponse): Observable<never> {',
                    '    console.error(\\'API Error: \\', error);',
                    '    return throwError(() => new Error(\\'Something went wrong; please try again later.\\'));',
                    '  }',
                    '}'
                ],
                description: 'AI-optimized API service template'
            },

            // Testing Snippets
            'AI Test Suite': {
                prefix: 'ai-test-suite',
                body: [
                    'describe(\\'${1:ComponentName}\\', () => {',
                    '  let ${2:component}: ${1:ComponentName};',
                    '  let ${3:fixture}: ComponentFixture<${1:ComponentName}>;',
                    '',
                    '  beforeEach(async () => {',
                    '    await TestBed.configureTestingModule({',
                    '      declarations: [${1:ComponentName}],',
                    '      imports: [${4:// AI: Add required imports}],',
                    '      providers: [${5:// AI: Add required providers}]',
                    '    }).compileComponents();',
                    '',
                    '    ${3:fixture} = TestBed.createComponent(${1:ComponentName});',
                    '    ${2:component} = ${3:fixture}.componentInstance;',
                    '    ${3:fixture}.detectChanges();',
                    '  });',
                    '',
                    '  it(\\'should create\\', () => {',
                    '    expect(${2:component}).toBeTruthy();',
                    '  });',
                    '',
                    '  ${6:// AI: Add your test cases here}',
                    '});'
                ],
                description: 'AI-optimized test suite template'
            }
        };

        const snippetsFile = path.join(this.vscodeDir, 'ai-development.code-snippets');
        await fs.writeJSON(snippetsFile, snippets, { spaces: 2 });
        console.log(chalk.green('📝 Created AI development snippets'));
    }

    async configureLanguageSupport() {
        const languageConfig = {
            '[dart]': {
                'editor.formatOnSave': true,
                'editor.selectionHighlight': false,
                'editor.suggest.snippetsPreventQuickSuggestions': false,
                'editor.suggestSelection': 'first',
                'editor.tabCompletion': 'onlySnippets'
            },
            '[swift]': {
                'editor.formatOnSave': true,
                'editor.insertSpaces': true,
                'editor.tabSize': 4
            },
            '[typescript]': {
                'editor.formatOnSave': true,
                'editor.codeActionsOnSave': {
                    'source.organizeImports': true,
                    'source.fixAll.eslint': true
                }
            },
            '[javascript]': {
                'editor.formatOnSave': true,
                'editor.codeActionsOnSave': {
                    'source.organizeImports': true,
                    'source.fixAll.eslint': true
                }
            },
            '[html]': {
                'editor.formatOnSave': true,
                'editor.suggest.insertMode': 'replace'
            },
            '[scss]': {
                'editor.formatOnSave': true,
                'editor.suggest.insertMode': 'replace'
            }
        };

        const settingsPath = path.join(this.vscodeDir, 'settings.json');
        let settings = {};

        if (await fs.pathExists(settingsPath)) {
            settings = await fs.readJSON(settingsPath);
        }

        Object.assign(settings, languageConfig);
        await fs.writeJSON(settingsPath, settings, { spaces: 2 });
        console.log(chalk.green('🌐 Configured language-specific settings'));
    }

    async createCopilotWorkflows() {
        const workflows = {
            'component-creation': {
                name: 'AI Component Creation Workflow',
                steps: [
                    'Generate component scaffold with AI snippet',
                    'Add AI-generated business logic',
                    'Create corresponding test file',
                    'Generate documentation',
                    'Review with Copilot Chat'
                ],
                prompts: [
                    'ai-flutter-screen for Flutter components',
                    'ai-swift-vc for iOS view controllers',
                    'ai-ng-component for Angular components'
                ]
            },
            'api-integration': {
                name: 'AI API Integration Workflow',
                steps: [
                    'Create API service with ai-api-service snippet',
                    'Generate data models with Copilot',
                    'Add error handling and retry logic',
                    'Create integration tests',
                    'Document API endpoints'
                ],
                prompts: [
                    'Use contextual prompts for service classes',
                    'Ask Copilot for error handling patterns',
                    'Generate comprehensive tests'
                ]
            },
            'testing-setup': {
                name: 'AI Testing Setup Workflow',
                steps: [
                    'Generate test structure with ai-test-suite',
                    'Create mock data with Copilot',
                    'Add comprehensive test cases',
                    'Setup integration tests',
                    'Configure continuous testing'
                ],
                prompts: [
                    'Use ai-test-suite for test scaffolding',
                    'Ask Copilot for edge case scenarios',
                    'Generate test data factories'
                ]
            }
        };

        const workflowsFile = path.join(this.vscodeDir, 'ai-workflows.json');
        await fs.writeJSON(workflowsFile, workflows, { spaces: 2 });
        console.log(chalk.green('🔄 Created AI development workflows'));

        // Create workflow documentation
        const workflowDoc = `# AI Development Workflows

## Component Creation Workflow

1. **Start with AI Snippet**
   - Type \`ai-flutter-screen\`, \`ai-swift-vc\`, or \`ai-ng-component\`
   - Customize the generated scaffold

2. **Enhance with Copilot Chat**
   - Use \`@copilot\` to add business logic
   - Ask for specific functionality implementation

3. **Generate Tests**
   - Use \`ai-test-suite\` snippet
   - Ask Copilot to generate edge case tests

4. **Documentation**
   - Let Copilot generate JSDoc/documentation comments
   - Create README sections for complex components

## API Integration Workflow

1. **Service Creation**
   - Use \`ai-api-service\` snippet
   - Customize for your API requirements

2. **Data Models**
   - Ask Copilot to generate TypeScript interfaces
   - Include proper validation and serialization

3. **Error Handling**
   - Use contextual prompts for robust error handling
   - Implement retry logic and offline support

4. **Testing**
   - Generate API tests with mock data
   - Test error scenarios and edge cases

## Best Practices

- **Be Specific**: Provide detailed context in comments
- **Iterate**: Use Copilot Chat to refine generated code
- **Review**: Always review AI-generated code for security and performance
- **Learn**: Study the generated code to understand patterns

## Keyboard Shortcuts

- \`Ctrl+I\` (Cmd+I): Copilot inline chat
- \`Ctrl+Shift+I\` (Cmd+Shift+I): Copilot chat panel
- \`Tab\`: Accept Copilot suggestion
- \`Esc\`: Dismiss Copilot suggestion
`;

        await fs.writeFile(path.join(this.workspaceRoot, 'AI-WORKFLOWS.md'), workflowDoc);
        console.log(chalk.green('📚 Created AI workflow documentation'));
    }

    displayIntegrationGuide() {
        console.log(chalk.blue.bold('\n🚀 GitHub Copilot Integration Complete!'));

        console.log(chalk.yellow.bold('\n📋 What was configured:'));
        console.log(chalk.white('✅ Advanced VS Code settings for Copilot'));
        console.log(chalk.white('✅ Contextual prompts for better suggestions'));
        console.log(chalk.white('✅ AI development snippets and templates'));
        console.log(chalk.white('✅ Language-specific IntelliSense enhancements'));
        console.log(chalk.white('✅ Development workflows and documentation'));

        console.log(chalk.cyan.bold('\n🎯 Quick Start:'));
        console.log(chalk.cyan('1. Ensure GitHub Copilot extension is installed and active'));
        console.log(chalk.cyan('2. Try typing "ai-" to see available snippets'));
        console.log(chalk.cyan('3. Use Ctrl+I (Cmd+I) for inline Copilot chat'));
        console.log(chalk.cyan('4. Use @copilot in chat for context-aware assistance'));

        console.log(chalk.green.bold('\n✨ AI-powered development is now ready!'));
        console.log(chalk.gray('Check AI-WORKFLOWS.md for detailed usage instructions'));
    }
}

// Run the integrator if called directly
if (require.main === module) {
    const integrator = new CopilotIntegrator();
    integrator.setupCopilotIntegration().catch(console.error);
}

module.exports = CopilotIntegrator;