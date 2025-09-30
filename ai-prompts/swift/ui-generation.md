# iOS Swift UI Generation Prompts

## View Controller Creation
```
Create a new iOS view controller for [feature name] with:
- Modern UIKit components and Auto Layout constraints
- Responsive design that adapts to different iPhone and iPad sizes
- Proper view lifecycle management (viewDidLoad, viewWillAppear, etc.)
- Navigation controller integration with custom navigation items
- Loading states with activity indicators
- Error handling with user-friendly alerts
- Accessibility support with VoiceOver labels
- Follow iOS Human Interface Guidelines

Include:
- Navigation bar with contextual buttons
- Table view or collection view for data display
- Custom cells with proper reuse identifiers
- Pull-to-refresh functionality
- Search functionality if appropriate
- Empty state views for no data scenarios
```

## SwiftUI View Development
```
Generate a SwiftUI view for [component type] that:
- Uses declarative syntax with proper state management
- Implements responsive design with GeometryReader when needed
- Follows SwiftUI best practices for view composition
- Includes proper preview configurations for different devices
- Supports both light and dark mode appearance
- Uses environment objects for shared state
- Implements custom view modifiers for reusability

SwiftUI features:
- State and StateObject for local state management
- ObservableObject for complex state management
- Custom animations and transitions
- Gesture recognizers and interactive elements
- Navigation using NavigationView and NavigationLink
- List and LazyVGrid for data presentation
```

## Custom UI Components
```
Create reusable iOS UI components for [component purpose] with:
- IBDesignable and IBInspectable properties for Interface Builder
- Programmatic UI creation with constraint-based layout
- Theme support through appearance proxy or custom protocols
- Animation support for state changes
- Proper memory management and cleanup
- Configuration through delegation or closure-based APIs
- Support for different size classes and orientations

Component features:
- Custom drawing using Core Graphics when needed
- Touch handling and gesture recognition
- Keyboard handling and first responder management
- Dynamic Type support for accessibility
- Haptic feedback integration
- Custom transitions and presentations
```

## Table View and Collection View
```
Implement iOS table/collection view for [data type] with:
- Custom cell designs with Auto Layout
- Efficient cell reuse and configuration
- Section headers and footers with dynamic content
- Swipe actions for cell interactions
- Pull-to-refresh and infinite scrolling
- Search and filtering capabilities
- Batch updates and animated insertions/deletions

Advanced features:
- Diffable data source for iOS 13+
- Compositional layout for complex collection views
- Context menu integration for iOS 13+
- Drag and drop support
- Selection management for multi-selection
- Performance optimization for large datasets
```

## Animation and Core Graphics
```
Create iOS animations and custom drawing for [visual element] using:
- UIView animation blocks and keyframe animations
- Core Animation layers for complex animations
- Custom CALayer subclasses for specialized drawing
- Core Graphics for vector-based drawing
- UIBezierPath for shape creation and manipulation
- CAShapeLayer for animatable vector graphics
- Metal or Core Image for advanced visual effects

Animation types:
- View transitions and custom segues
- Loading animations and progress indicators
- Interactive gesture-driven animations
- Physics-based animations using UIDynamicAnimator
- Lottie integration for complex animations
- Particle systems using CAEmitterLayer
```