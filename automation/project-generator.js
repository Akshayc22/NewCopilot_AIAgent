#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

class ProjectGenerator {
    constructor() {
        this.templates = {
            'flutter': require('../templates/mobile/flutter-template'),
            'swift': require('../templates/mobile/swift-template'),
            'angular': require('../templates/web/angular-template')
        };
    }

    async generateProject() {
        console.log(chalk.blue.bold('🚀 GitHub Copilot AI Agent - Project Generator'));
        console.log(chalk.gray('Transform your development experience with AI-powered assistance\n'));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'techStack',
                message: 'Select your preferred technology stack:',
                choices: [
                    { name: '📱 Flutter (Cross-platform Mobile)', value: 'flutter' },
                    { name: '🍎 Swift (iOS Native)', value: 'swift' },
                    { name: '🤖 Android Native (Java/Kotlin)', value: 'android-native' },
                    { name: '🌐 Angular (Web Application)', value: 'angular' },
                    { name: '🌍 Flutter Web (Cross-platform Web)', value: 'flutter-web' }
                ]
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'Enter your project name:',
                default: 'my-ai-app',
                validate: (input) => {
                    if (input.length < 3) return 'Project name must be at least 3 characters long';
                    if (!/^[a-z0-9-_]+$/.test(input)) return 'Project name should only contain lowercase letters, numbers, hyphens, and underscores';
                    return true;
                }
            },
            {
                type: 'input',
                name: 'projectDescription',
                message: 'Project description (optional):',
                default: 'AI-powered application built with GitHub Copilot'
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Select features to include:',
                choices: [
                    { name: 'API Integration Templates', value: 'api', checked: true },
                    { name: 'Authentication System', value: 'auth', checked: true },
                    { name: 'State Management', value: 'state', checked: true },
                    { name: 'Testing Framework', value: 'testing', checked: true },
                    { name: 'CI/CD Configuration', value: 'cicd', checked: false },
                    { name: 'Analytics Integration', value: 'analytics', checked: false }
                ]
            },
            {
                type: 'confirm',
                name: 'aiPrompts',
                message: 'Include AI development prompts for GitHub Copilot?',
                default: true
            }
        ]);

        await this.createProject(answers);
    }

    async createProject(config) {
        const { techStack, projectName, projectDescription, features, aiPrompts } = config;

        console.log(chalk.yellow(`\n🔧 Creating ${techStack} project: ${projectName}...`));

        try {
            // Create project directory
            const projectPath = path.join(process.cwd(), 'projects', projectName);
            await fs.ensureDir(projectPath);

            // Update AI agent configuration
            await this.updateAIConfig(techStack, projectName);

            // Generate project using template
            const template = this.templates[techStack];
            await template.generate(projectPath, config);

            // Copy AI prompts if requested
            if (aiPrompts) {
                await this.copyAIPrompts(projectPath, techStack);
            }

            // Initialize version control
            process.chdir(projectPath);
            execSync('git init', { stdio: 'inherit' });
            execSync('git add .', { stdio: 'inherit' });
            execSync('git commit -m "Initial commit: AI-generated project"', { stdio: 'inherit' });

            console.log(chalk.green.bold(`\n✅ Project '${projectName}' created successfully!`));
            console.log(chalk.cyan(`📁 Location: ${projectPath}`));
            console.log(chalk.cyan(`🤖 Tech Stack: ${techStack}`));
            console.log(chalk.cyan(`🎯 Features: ${features.join(', ')}`));

            console.log(chalk.blue.bold('\n🚀 Next Steps:'));
            console.log(chalk.white(`1. cd projects/${projectName}`));
            console.log(chalk.white('2. Open in VS Code with GitHub Copilot enabled'));
            console.log(chalk.white('3. Use Copilot Chat with the provided AI prompts'));
            console.log(chalk.white('4. Start developing with AI assistance!'));

        } catch (error) {
            console.error(chalk.red.bold('❌ Error creating project:'), error.message);
            process.exit(1);
        }
    }

    async updateAIConfig(techStack, projectName) {
        const configPath = path.join(process.cwd(), '.vscode', 'ai-agent-config.json');
        const config = await fs.readJSON(configPath);

        config.currentTechStack = techStack;
        config.projectType = ['flutter', 'swift', 'android-native'].includes(techStack) ? 'mobile' : 'web';
        config.lastProject = {
            name: projectName,
            techStack,
            createdAt: new Date().toISOString()
        };

        await fs.writeJSON(configPath, config, { spaces: 2 });
    }

    async copyAIPrompts(projectPath, techStack) {
        const promptsSource = path.join(process.cwd(), 'ai-prompts', techStack);
        const promptsDestination = path.join(projectPath, '.copilot-prompts');

        if (await fs.pathExists(promptsSource)) {
            await fs.copy(promptsSource, promptsDestination);
            console.log(chalk.green('📝 AI prompts copied to project'));
        }
    }
}

// Run the generator if called directly
if (require.main === module) {
    const generator = new ProjectGenerator();
    generator.generateProject().catch(console.error);
}

module.exports = ProjectGenerator;