# Flutter UI Generation Prompts

## Screen Creation
```
Create a new Flutter screen for [feature name] with:
- Modern Material Design 3 components
- Responsive layout that works on both mobile and tablet
- Proper state management using Provider/Riverpod
- Navigation integration with named routes
- Loading states and error handling
- Accessibility labels for screen readers
- Follow Flutter best practices for widget composition

Include:
- AppBar with contextual actions
- Main content area with scrollable content
- FloatingActionButton if needed for primary action
- Bottom navigation or drawer if part of main flow
- Snackbar or dialog for user feedback
```

## Component Development
```
Generate a reusable Flutter widget for [component type] that:
- Accepts customizable properties through constructor
- Uses const constructors where possible
- Implements proper key handling for widget rebuilds
- Includes comprehensive documentation
- Follows single responsibility principle
- Supports theming through Theme.of(context)
- Has built-in error boundaries and null safety

Widget should include:
- Clear parameter validation
- Default values for optional parameters
- Proper dispose methods if using controllers
- Animation support where appropriate
```

## Forms and Input
```
Create a Flutter form for [form purpose] with:
- Form validation using Flutter's built-in validators
- Custom validation rules where needed
- Proper keyboard types for different input fields
- Focus management and navigation between fields
- Save/submit functionality with loading states
- Error display and user feedback
- Auto-save capabilities if appropriate

Include form fields for:
- Text inputs with proper formatting
- Dropdowns with search functionality
- Date/time pickers
- File upload capabilities
- Checkbox and radio button groups
```

## Animation and Transitions
```
Implement Flutter animations for [animation type] with:
- Smooth 60fps performance
- Proper animation controllers and disposal
- Curve-based easing for natural motion
- Responsive animations that scale with device capabilities
- Accessibility considerations (respect reduced motion preferences)
- Memory-efficient implementation

Animation types:
- Page transitions and route animations
- Micro-interactions for buttons and cards
- Loading animations and progress indicators
- Gesture-based animations (swipe, drag, pinch)
- Staggered list animations
```

## Data Visualization
```
Create Flutter data visualization components for [data type] using:
- Custom painters for performance-critical graphics
- Charts and graphs with interactive capabilities
- Responsive design that adapts to screen sizes
- Accessibility features for data interpretation
- Color schemes that work in light/dark modes
- Export capabilities (PDF, image, data)

Visualization features:
- Interactive legends and tooltips
- Zoom and pan capabilities
- Real-time data updates
- Multiple chart types (bar, line, pie, scatter)
- Data filtering and grouping options
```