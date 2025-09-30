const fs = require('fs-extra');
const path = require('path');

class AngularTemplate {
    async generate(projectPath, config) {
        const { projectName, projectDescription, features } = config;

        // Create Angular project structure
        await this.createDirectoryStructure(projectPath);

        // Generate Angular configuration files
        await this.generateAngularJson(projectPath, projectName);
        await this.generatePackageJson(projectPath, projectName, projectDescription, features);
        await this.generateTsConfig(projectPath);

        // Generate application files
        await this.generateAppModule(projectPath, features);
        await this.generateAppComponent(projectPath);
        await this.generateMainTs(projectPath);

        // Generate additional files based on features
        if (features.includes('api')) await this.generateApiLayer(projectPath);
        if (features.includes('auth')) await this.generateAuthSystem(projectPath);
        if (features.includes('state')) await this.generateStateManagement(projectPath);
        if (features.includes('testing')) await this.generateTestFramework(projectPath);

        // Generate GitHub Copilot specific files
        await this.generateCopilotFiles(projectPath);
    }

    async createDirectoryStructure(projectPath) {
        const dirs = [
            'src',
            'src/app',
            'src/app/components',
            'src/app/services',
            'src/app/models',
            'src/app/guards',
            'src/app/interceptors',
            'src/assets',
            'src/environments',
            'e2e',
            'e2e/src'
        ];

        for (const dir of dirs) {
            await fs.ensureDir(path.join(projectPath, dir));
        }
    }

    async generatePackageJson(projectPath, projectName, description, features) {
        const packageJson = {
            name: projectName,
            version: '0.0.0',
            description: description,
            scripts: {
                ng: 'ng',
                start: 'ng serve',
                build: 'ng build',
                watch: 'ng build --watch --configuration development',
                test: 'ng test',
                lint: 'ng lint',
                e2e: 'ng e2e'
            },
            private: true,
            dependencies: {
                '@angular/animations': '^16.0.0',
                '@angular/common': '^16.0.0',
                '@angular/compiler': '^16.0.0',
                '@angular/core': '^16.0.0',
                '@angular/forms': '^16.0.0',
                '@angular/platform-browser': '^16.0.0',
                '@angular/platform-browser-dynamic': '^16.0.0',
                '@angular/router': '^16.0.0',
                rxjs: '~7.8.0',
                tslib: '^2.3.0',
                'zone.js': '~0.13.0'
            },
            devDependencies: {
                '@angular-devkit/build-angular': '^16.0.0',
                '@angular/cli': '~16.0.0',
                '@angular/compiler-cli': '^16.0.0',
                '@types/jasmine': '~4.3.0',
                '@types/node': '^18.7.0',
                jasmine: '~4.6.0',
                'karma': '~6.4.0',
                'karma-chrome-launcher': '~3.2.0',
                'karma-coverage': '~2.2.0',
                'karma-jasmine': '~5.1.0',
                'karma-jasmine-html-reporter': '~2.1.0',
                typescript: '~5.0.0'
            }
        };

        // Add feature-specific dependencies
        if (features.includes('api')) {
            packageJson.dependencies['@angular/common/http'] = '^16.0.0';
        }

        if (features.includes('auth')) {
            packageJson.dependencies['@angular/fire'] = '^7.6.0';
            packageJson.dependencies['firebase'] = '^10.0.0';
        }

        if (features.includes('state')) {
            packageJson.dependencies['@ngrx/store'] = '^16.0.0';
            packageJson.dependencies['@ngrx/effects'] = '^16.0.0';
            packageJson.dependencies['@ngrx/store-devtools'] = '^16.0.0';
        }

        await fs.writeJSON(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    }

    async generateAngularJson(projectPath, projectName) {
        const angularJson = {
            '$schema': './node_modules/@angular/cli/lib/config/schema.json',
            version: 1,
            newProjectRoot: 'projects',
            projects: {
                [projectName]: {
                    projectType: 'application',
                    schematics: {},
                    root: '',
                    sourceRoot: 'src',
                    prefix: 'app',
                    architect: {
                        build: {
                            builder: '@angular-devkit/build-angular:browser',
                            options: {
                                outputPath: 'dist/' + projectName,
                                index: 'src/index.html',
                                main: 'src/main.ts',
                                polyfills: ['zone.js'],
                                tsConfig: 'tsconfig.app.json',
                                assets: ['src/favicon.ico', 'src/assets'],
                                styles: ['src/styles.css'],
                                scripts: []
                            }
                        },
                        serve: {
                            builder: '@angular-devkit/build-angular:dev-server',
                            configurations: {
                                production: {
                                    buildTarget: projectName + ':build:production'
                                },
                                development: {
                                    buildTarget: projectName + ':build:development'
                                }
                            },
                            defaultConfiguration: 'development'
                        },
                        test: {
                            builder: '@angular-devkit/build-angular:karma',
                            options: {
                                polyfills: ['zone.js', 'zone.js/testing'],
                                tsConfig: 'tsconfig.spec.json',
                                assets: ['src/favicon.ico', 'src/assets'],
                                styles: ['src/styles.css'],
                                scripts: []
                            }
                        }
                    }
                }
            }
        };

        await fs.writeJSON(path.join(projectPath, 'angular.json'), angularJson, { spaces: 2 });
    }

    async generateAppModule(projectPath, features) {
        const imports = [
            'NgModule',
            'BrowserModule'
        ];
        const moduleImports = ['BrowserModule'];
        const providers = [];

        if (features.includes('api')) {
            imports.push('HttpClientModule');
            moduleImports.push('HttpClientModule');
        }

        if (features.includes('auth')) {
            imports.push('AngularFireModule');
            imports.push('AngularFireAuthModule');
        }

        const appModuleContent = `import { ${imports.join(', ')} } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
${features.includes('api') ? "import { HttpClientModule } from '@angular/common/http';" : ''}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ${moduleImports.join(',\n    ')},
    AppRoutingModule
  ],
  providers: [${providers.join(', ')}],
  bootstrap: [AppComponent]
})
export class AppModule { }`;

        await fs.writeFile(path.join(projectPath, 'src', 'app', 'app.module.ts'), appModuleContent);

        // Generate app-routing.module.ts
        const routingContent = `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }`;

        await fs.writeFile(path.join(projectPath, 'src', 'app', 'app-routing.module.ts'), routingContent);
    }

    async generateAppComponent(projectPath) {
        const componentTs = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AI-Powered Angular App';
  subtitle = 'Built with GitHub Copilot assistance';
  
  onAIActionClick() {
    // TODO: Implement with GitHub Copilot assistance
    console.log('AI action triggered - ready for Copilot development!');
  }
}`;

        const componentHtml = `<div class="container">
  <header class="header">
    <h1>{{ title }}</h1>
    <p class="subtitle">{{ subtitle }}</p>
  </header>
  
  <main class="main-content">
    <div class="welcome-section">
      <div class="ai-icon">🤖</div>
      <h2>Welcome to your AI-powered Angular application!</h2>
      <p>This project is optimized for GitHub Copilot development assistance.</p>
      
      <button class="ai-button" (click)="onAIActionClick()">
        Get Started with AI
      </button>
    </div>
    
    <div class="features-section">
      <h3>AI Development Features</h3>
      <ul class="features-list">
        <li>✨ Context-aware code suggestions</li>
        <li>🚀 Automated component generation</li>
        <li>🔧 Intelligent refactoring assistance</li>
        <li>🧪 Test generation and debugging</li>
      </ul>
    </div>
  </main>
  
  <router-outlet></router-outlet>
</div>`;

        const componentCss = `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2em;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.welcome-section {
  text-align: center;
  background: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.ai-icon {
  font-size: 4em;
  margin-bottom: 20px;
}

.ai-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.ai-button:hover {
  background: #2980b9;
}

.features-section {
  width: 100%;
  max-width: 600px;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 10px 0;
  font-size: 1.1em;
  color: #2c3e50;
}`;

        await fs.writeFile(path.join(projectPath, 'src', 'app', 'app.component.ts'), componentTs);
        await fs.writeFile(path.join(projectPath, 'src', 'app', 'app.component.html'), componentHtml);
        await fs.writeFile(path.join(projectPath, 'src', 'app', 'app.component.css'), componentCss);
    }

    async generateMainTs(projectPath) {
        const mainContent = `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`;

        await fs.writeFile(path.join(projectPath, 'src', 'main.ts'), mainContent);

        // Generate index.html
        const indexContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AI-Powered Angular App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>`;

        await fs.writeFile(path.join(projectPath, 'src', 'index.html'), indexContent);
    }

    async generateApiLayer(projectPath) {
        const apiServiceContent = `import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(\`\${this.baseUrl}/\${endpoint}\`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(\`\${this.baseUrl}/\${endpoint}\`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(\`\${this.baseUrl}/\${endpoint}\`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(\`\${this.baseUrl}/\${endpoint}\`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}`;

        await fs.writeFile(path.join(projectPath, 'src', 'app', 'services', 'api.service.ts'), apiServiceContent);
    }

    async generateCopilotFiles(projectPath) {
        const readmeContent = `# AI-Powered Angular Application

Built with GitHub Copilot assistance for intelligent web development.

## Features

- 🤖 AI-assisted development with GitHub Copilot
- 🌐 Modern Angular web application
- 🎨 Responsive design with CSS Grid/Flexbox
- 🏗️ Component-based architecture
- 🧪 Comprehensive testing setup

## Requirements

- Node.js 16+
- Angular CLI 16+
- TypeScript 5.0+

## Getting Started

1. Install dependencies: \`npm install\`
2. Start development server: \`ng serve\`
3. Use GitHub Copilot for AI-assisted development
4. Navigate to \`http://localhost:4200\`

## GitHub Copilot Integration

This project is optimized for GitHub Copilot usage:

- Use the AI prompts in \`.copilot-prompts/\` for context-aware assistance
- Leverage Copilot Chat for complex feature development
- Follow Angular best practices for consistent AI suggestions

## Development with AI

### Recommended Copilot Prompts

- "Create a new component with routing"
- "Add HTTP service for API integration"
- "Implement reactive forms"
- "Generate unit tests for [component]"
- "Add state management with NgRx"

### AI-Assisted Workflows

1. **Component Development**: Use Copilot to generate components and templates
2. **Service Layer**: Let AI create service classes and HTTP integrations
3. **Routing**: Generate route configurations and guards
4. **Testing**: Create comprehensive test suites
5. **Styling**: Generate responsive CSS and animations

## Architecture

\`\`\`
src/
├── app/
│   ├── components/          # Reusable components
│   ├── services/           # Business logic and API
│   ├── models/             # TypeScript interfaces
│   ├── guards/             # Route guards
│   └── interceptors/       # HTTP interceptors
├── assets/                 # Static assets
└── environments/           # Environment configs
\`\`\`

## Available Scripts

- \`ng serve\` - Start development server
- \`ng build\` - Build for production
- \`ng test\` - Run unit tests
- \`ng e2e\` - Run end-to-end tests
- \`ng lint\` - Lint code

## AI Development Tips

- Use TypeScript interfaces and types for better Copilot suggestions
- Add JSDoc comments to guide AI understanding
- Leverage Angular CLI schematics with Copilot assistance
- Use Copilot Chat for architectural decisions

Happy Angular coding with AI assistance! 🚀
`;

        await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
    }
}

module.exports = new AngularTemplate();