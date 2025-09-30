const fs = require('fs-extra');
const path = require('path');

class FlutterTemplate {
    async generate(projectPath, config) {
        const { projectName, projectDescription, features } = config;

        // Create Flutter project structure
        await this.createDirectoryStructure(projectPath);

        // Generate pubspec.yaml
        await this.generatePubspec(projectPath, projectName, projectDescription, features);

        // Generate main.dart
        await this.generateMainDart(projectPath, features);

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
            'lib',
            'lib/screens',
            'lib/widgets',
            'lib/services',
            'lib/models',
            'lib/utils',
            'lib/providers',
            'test',
            'test/unit',
            'test/widget',
            'test/integration',
            'assets',
            'assets/images',
            'assets/fonts'
        ];

        for (const dir of dirs) {
            await fs.ensureDir(path.join(projectPath, dir));
        }
    }

    async generatePubspec(projectPath, projectName, description, features) {
        const dependencies = {
            flutter: { sdk: 'flutter' },
            cupertino_icons: '^1.0.2'
        };

        const devDependencies = {
            flutter_test: { sdk: 'flutter' },
            flutter_lints: '^2.0.0'
        };

        // Add feature-specific dependencies
        if (features.includes('api')) {
            dependencies.http = '^1.1.0';
            dependencies.dio = '^5.3.0';
        }

        if (features.includes('auth')) {
            dependencies.firebase_auth = '^4.10.0';
            dependencies.firebase_core = '^2.16.0';
        }

        if (features.includes('state')) {
            dependencies.provider = '^6.0.5';
            dependencies.riverpod = '^2.4.0';
        }

        if (features.includes('testing')) {
            devDependencies.mockito = '^5.4.2';
            devDependencies.integration_test = { sdk: 'flutter' };
        }

        const pubspecContent = `name: ${projectName.replace(/-/g, '_')}
description: ${description}

publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
${Object.entries(dependencies).map(([key, value]) =>
            `  ${key}: ${typeof value === 'string' ? value : JSON.stringify(value).replace(/"/g, '')}`
        ).join('\n')}

dev_dependencies:
${Object.entries(devDependencies).map(([key, value]) =>
            `  ${key}: ${typeof value === 'string' ? value : JSON.stringify(value).replace(/"/g, '')}`
        ).join('\n')}

flutter:
  uses-material-design: true
  
  assets:
    - assets/images/
  
  # fonts:
  #   - family: CustomFont
  #     fonts:
  #       - asset: assets/fonts/CustomFont-Regular.ttf
`;

        await fs.writeFile(path.join(projectPath, 'pubspec.yaml'), pubspecContent);
    }

    async generateMainDart(projectPath, features) {
        const hasAuth = features.includes('auth');
        const hasState = features.includes('state');

        const mainContent = `import 'package:flutter/material.dart';
${hasState ? "import 'package:provider/provider.dart';" : ''}
${hasAuth ? "import 'package:firebase_core/firebase_core.dart';" : ''}
${hasState ? "import 'providers/app_state_provider.dart';" : ''}
import 'screens/home_screen.dart';
${hasAuth ? "import 'services/auth_service.dart';" : ''}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  ${hasAuth ? 'await Firebase.initializeApp();' : ''}
  
  runApp(${hasState ? 'MyAppWithState()' : 'MyApp()'});
}

${hasState ? `class MyAppWithState extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppStateProvider()),
        ${hasAuth ? 'Provider(create: (_) => AuthService()),' : ''}
      ],
      child: MyApp(),
    );
  }
}` : ''}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AI-Powered Flutter App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}`;

        await fs.writeFile(path.join(projectPath, 'lib', 'main.dart'), mainContent);

        // Generate HomeScreen
        const homeScreenContent = `import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AI-Powered App'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(
              Icons.psychology,
              size: 80,
              color: Theme.of(context).primaryColor,
            ),
            SizedBox(height: 20),
            Text(
              'Welcome to your AI-powered Flutter app!',
              style: Theme.of(context).textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 10),
            Text(
              'Built with GitHub Copilot assistance',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                // TODO: Add navigation to next screen
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Ready for AI-assisted development!')),
                );
              },
              child: Text('Get Started'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Implement with GitHub Copilot assistance
        },
        tooltip: 'AI Action',
        child: Icon(Icons.auto_awesome),
      ),
    );
  }
}`;

        await fs.writeFile(path.join(projectPath, 'lib', 'screens', 'home_screen.dart'), homeScreenContent);
    }

    async generateApiLayer(projectPath) {
        const apiServiceContent = `import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://api.example.com';
  
  static Future<Map<String, dynamic>> get(String endpoint) async {
    try {
      final response = await http.get(
        Uri.parse('\$baseUrl/\$endpoint'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load data: \${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }
  
  static Future<Map<String, dynamic>> post(String endpoint, Map<String, dynamic> data) async {
    try {
      final response = await http.post(
        Uri.parse('\$baseUrl/\$endpoint'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(data),
      );
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to post data: \${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }
}`;

        await fs.writeFile(path.join(projectPath, 'lib', 'services', 'api_service.dart'), apiServiceContent);
    }

    async generateStateManagement(projectPath) {
        const stateProviderContent = `import 'package:flutter/foundation.dart';

class AppStateProvider with ChangeNotifier {
  bool _isLoading = false;
  String _currentUser = '';
  Map<String, dynamic> _appData = {};

  bool get isLoading => _isLoading;
  String get currentUser => _currentUser;
  Map<String, dynamic> get appData => _appData;

  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void setCurrentUser(String user) {
    _currentUser = user;
    notifyListeners();
  }

  void updateAppData(Map<String, dynamic> data) {
    _appData = {..._appData, ...data};
    notifyListeners();
  }

  void clearData() {
    _currentUser = '';
    _appData = {};
    notifyListeners();
  }
}`;

        await fs.writeFile(path.join(projectPath, 'lib', 'providers', 'app_state_provider.dart'), stateProviderContent);
    }

    async generateCopilotFiles(projectPath) {
        const readmeContent = `# AI-Powered Flutter Application

Built with GitHub Copilot assistance for intelligent development.

## Features

- 🤖 AI-assisted development with GitHub Copilot
- 📱 Cross-platform mobile application
- 🎨 Modern Material Design UI
- 🔧 Modular architecture
- 🧪 Comprehensive testing setup

## Getting Started

1. Ensure Flutter is installed
2. Run \`flutter pub get\` to install dependencies
3. Use GitHub Copilot for AI-assisted development
4. Run \`flutter run\` to start the app

## GitHub Copilot Integration

This project is optimized for GitHub Copilot usage:

- Use the AI prompts in \`.copilot-prompts/\` for context-aware assistance
- Leverage Copilot Chat for complex feature development
- Follow the established patterns for consistent AI suggestions

## Development with AI

### Recommended Copilot Prompts

- "Create a new screen with navigation"
- "Add API integration for [feature]"
- "Implement state management for [data]"
- "Generate unit tests for [component]"
- "Add error handling and loading states"

### AI-Assisted Workflows

1. **UI Development**: Use Copilot to generate responsive layouts
2. **API Integration**: Let AI create service classes and models
3. **State Management**: Generate providers and state logic
4. **Testing**: Create comprehensive test suites
5. **Documentation**: Generate inline documentation

## Architecture

\`\`\`
lib/
├── main.dart           # App entry point
├── screens/           # UI screens
├── widgets/           # Reusable components
├── services/          # API and business logic
├── models/            # Data models
├── providers/         # State management
└── utils/             # Helper functions
\`\`\`

## AI Development Tips

- Use descriptive variable names for better Copilot suggestions
- Add comments to guide AI understanding
- Leverage the pre-built templates for common patterns
- Use Copilot Chat for architectural decisions

Happy coding with AI assistance! 🚀
`;

        await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
    }
}

module.exports = new FlutterTemplate();