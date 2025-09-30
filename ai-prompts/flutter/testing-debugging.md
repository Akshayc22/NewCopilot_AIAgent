# Flutter Testing Prompts

## Unit Testing
```
Generate comprehensive unit tests for [class/function name] including:
- Test all public methods and edge cases
- Mock external dependencies using mockito
- Test error conditions and exception handling
- Verify state changes and side effects
- Use descriptive test names that explain the scenario
- Group related tests using group() function
- Setup and teardown for test isolation

Test coverage should include:
- Happy path scenarios
- Boundary value testing
- Null safety and error conditions
- Async operation testing
- State management testing
- Data model validation
```

## Widget Testing
```
Create widget tests for [widget name] that verify:
- Widget renders correctly with different inputs
- User interactions trigger expected behavior
- State changes reflect in the UI properly
- Accessibility features work as expected
- Animation states and transitions
- Form validation and submission
- Navigation and routing behavior

Widget testing approach:
- Use testWidgets() for each test scenario
- Pump and settle for animations
- Find widgets using key, text, or type
- Simulate user gestures (tap, drag, scroll)
- Verify widget properties and state
- Test different screen sizes and orientations
```

## Integration Testing
```
Develop integration tests for [feature flow] covering:
- End-to-end user workflows
- Cross-screen navigation flows
- API integration with mock backends
- Database operations and data persistence
- Device-specific functionality (camera, location, etc.)
- Performance under realistic conditions
- Memory usage and resource management

Integration test setup:
- Use integration_test package
- Mock external services appropriately
- Test on multiple device configurations
- Verify offline/online behavior
- Test app lifecycle events
- Include accessibility testing
```

## Performance Testing
```
Create performance tests to measure:
- Widget build times and frame rates
- Memory usage and garbage collection
- Network request performance
- Large list rendering performance
- Image loading and caching efficiency
- Animation smoothness
- App startup time and cold/warm start performance

Performance monitoring:
- Use Flutter's performance overlay
- Measure time to interactive
- Track memory leaks and retention
- Monitor CPU usage patterns
- Test scrolling performance on long lists
- Benchmark custom painting operations
```

## Test Automation
```
Set up automated testing pipeline for:
- Continuous integration with GitHub Actions
- Automated test execution on multiple devices
- Code coverage reporting and enforcement
- Performance regression detection
- Visual regression testing for UI changes
- Accessibility compliance testing

Automation features:
- Parallel test execution
- Test result reporting and notifications
- Failed test debugging artifacts
- Test data management and cleanup
- Device farm integration for real device testing
- Screenshot comparison for visual tests
```

## Debugging and Troubleshooting
```
Implement debugging tools and practices for:
- Flutter Inspector integration
- Custom logging and debugging output
- Error tracking and crash reporting
- Performance profiling and flame graphs
- Network request debugging and monitoring
- State management debugging tools
- Memory leak detection and analysis

Debugging setup:
- Structured logging with different levels
- Remote debugging capabilities
- Development vs production debugging modes
- Error boundary implementation
- User feedback collection for issues
- Analytics for understanding user behavior
```