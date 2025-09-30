const fs = require('fs-extra');
const path = require('path');

class SwiftTemplate {
    async generate(projectPath, config) {
        const { projectName, projectDescription, features } = config;

        // Create iOS project structure
        await this.createDirectoryStructure(projectPath);

        // Generate project files
        await this.generateProjectFile(projectPath, projectName);
        await this.generateAppDelegate(projectPath, features);
        await this.generateViewController(projectPath);
        await this.generateStoryboard(projectPath);
        await this.generateInfoPlist(projectPath, projectName);

        // Generate additional files based on features
        if (features.includes('api')) await this.generateAPILayer(projectPath);
        if (features.includes('auth')) await this.generateAuthSystem(projectPath);
        if (features.includes('testing')) await this.generateTestFramework(projectPath);

        // Generate GitHub Copilot specific files
        await this.generateCopilotFiles(projectPath);
    }

    async createDirectoryStructure(projectPath) {
        const projectName = path.basename(projectPath);
        const dirs = [
            `${projectName}`,
            `${projectName}/Models`,
            `${projectName}/Views`,
            `${projectName}/Controllers`,
            `${projectName}/Services`,
            `${projectName}/Utils`,
            `${projectName}/Resources`,
            `${projectName}Tests`,
            `${projectName}UITests`,
            `${projectName}.xcodeproj`
        ];

        for (const dir of dirs) {
            await fs.ensureDir(path.join(projectPath, dir));
        }
    }

    async generateProjectFile(projectPath, projectName) {
        // Generate unique UUIDs for Xcode project objects
        const generateUUID = () => Math.random().toString(36).substr(2, 24).toUpperCase().padEnd(24, '0');

        const projectId = generateUUID();
        const mainGroupId = generateUUID();
        const appGroupId = generateUUID();
        const testsGroupId = generateUUID();
        const uiTestsGroupId = generateUUID();
        const productsGroupId = generateUUID();

        const appDelegateId = generateUUID();
        const viewControllerId = generateUUID();
        const storyboardId = generateUUID();
        const infoPlistId = generateUUID();
        const testFileId = generateUUID();
        const uiTestFileId = generateUUID();

        const appTargetId = generateUUID();
        const testTargetId = generateUUID();
        const uiTestTargetId = generateUUID();

        const appProductId = generateUUID();
        const testProductId = generateUUID();
        const uiTestProductId = generateUUID();

        const buildConfigDebugId = generateUUID();
        const buildConfigReleaseId = generateUUID();
        const configListProjectId = generateUUID();
        const configListAppId = generateUUID();
        const configListTestId = generateUUID();
        const configListUITestId = generateUUID();

        const buildPhaseSourcesId = generateUUID();
        const buildPhaseResourcesId = generateUUID();
        const buildFileAppDelegateId = generateUUID();
        const buildFileViewControllerId = generateUUID();
        const buildFileStoryboardId = generateUUID();

        const pbxprojContent = `// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 56;
	objects = {

/* Begin PBXBuildFile section */
		${buildFileAppDelegateId} /* AppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = ${appDelegateId} /* AppDelegate.swift */; };
		${buildFileViewControllerId} /* ViewController.swift in Sources */ = {isa = PBXBuildFile; fileRef = ${viewControllerId} /* ViewController.swift */; };
		${buildFileStoryboardId} /* Main.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = ${storyboardId} /* Main.storyboard */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
		${appDelegateId} /* AppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AppDelegate.swift; sourceTree = "<group>"; };
		${viewControllerId} /* ViewController.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ViewController.swift; sourceTree = "<group>"; };
		${storyboardId} /* Main.storyboard */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; path = Main.storyboard; sourceTree = "<group>"; };
		${infoPlistId} /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
		${appProductId} /* ${projectName}.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = ${projectName}.app; sourceTree = BUILT_PRODUCTS_DIR; };
		${testProductId} /* ${projectName}Tests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = ${projectName}Tests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		${uiTestProductId} /* ${projectName}UITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = ${projectName}UITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		${testFileId} /* ${projectName}Tests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ${projectName}Tests.swift; sourceTree = "<group>"; };
		${uiTestFileId} /* ${projectName}UITests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ${projectName}UITests.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXGroup section */
		${mainGroupId} = {
			isa = PBXGroup;
			children = (
				${appGroupId} /* ${projectName} */,
				${testsGroupId} /* ${projectName}Tests */,
				${uiTestsGroupId} /* ${projectName}UITests */,
				${productsGroupId} /* Products */,
			);
			sourceTree = "<group>";
		};
		${appGroupId} /* ${projectName} */ = {
			isa = PBXGroup;
			children = (
				${appDelegateId} /* AppDelegate.swift */,
				${viewControllerId} /* ViewController.swift */,
				${storyboardId} /* Main.storyboard */,
				${infoPlistId} /* Info.plist */,
			);
			path = ${projectName};
			sourceTree = "<group>";
		};
		${testsGroupId} /* ${projectName}Tests */ = {
			isa = PBXGroup;
			children = (
				${testFileId} /* ${projectName}Tests.swift */,
			);
			path = ${projectName}Tests;
			sourceTree = "<group>";
		};
		${uiTestsGroupId} /* ${projectName}UITests */ = {
			isa = PBXGroup;
			children = (
				${uiTestFileId} /* ${projectName}UITests.swift */,
			);
			path = ${projectName}UITests;
			sourceTree = "<group>";
		};
		${productsGroupId} /* Products */ = {
			isa = PBXGroup;
			children = (
				${appProductId} /* ${projectName}.app */,
				${testProductId} /* ${projectName}Tests.xctest */,
				${uiTestProductId} /* ${projectName}UITests.xctest */,
			);
			name = Products;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		${appTargetId} /* ${projectName} */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = ${configListAppId} /* Build configuration list for PBXNativeTarget "${projectName}" */;
			buildPhases = (
				${buildPhaseSourcesId} /* Sources */,
				${buildPhaseResourcesId} /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ${projectName};
			productName = ${projectName};
			productReference = ${appProductId} /* ${projectName}.app */;
			productType = "com.apple.product-type.application";
		};
		${testTargetId} /* ${projectName}Tests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = ${configListTestId} /* Build configuration list for PBXNativeTarget "${projectName}Tests" */;
			buildPhases = (
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ${projectName}Tests;
			productName = ${projectName}Tests;
			productReference = ${testProductId} /* ${projectName}Tests.xctest */;
			productType = "com.apple.product-type.bundle.unit-test";
		};
		${uiTestTargetId} /* ${projectName}UITests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = ${configListUITestId} /* Build configuration list for PBXNativeTarget "${projectName}UITests" */;
			buildPhases = (
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ${projectName}UITests;
			productName = ${projectName}UITests;
			productReference = ${uiTestProductId} /* ${projectName}UITests.xctest */;
			productType = "com.apple.product-type.bundle.ui-testing";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		${projectId} /* Project object */ = {
			isa = PBXProject;
			attributes = {
				BuildIndependentTargetsInParallel = 1;
				LastSwiftUpdateCheck = 1500;
				LastUpgradeCheck = 1500;
			};
			buildConfigurationList = ${configListProjectId} /* Build configuration list for PBXProject "${projectName}" */;
			compatibilityVersion = "Xcode 14.0";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = ${mainGroupId};
			productRefGroup = ${productsGroupId} /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				${appTargetId} /* ${projectName} */,
				${testTargetId} /* ${projectName}Tests */,
				${uiTestTargetId} /* ${projectName}UITests */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		${buildPhaseResourcesId} /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				${buildFileStoryboardId} /* Main.storyboard in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		${buildPhaseSourcesId} /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				${buildFileViewControllerId} /* ViewController.swift in Sources */,
				${buildFileAppDelegateId} /* AppDelegate.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		${buildConfigDebugId} /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 16.0;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
			};
			name = Debug;
		};
		${buildConfigReleaseId} /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 16.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		${configListProjectId} /* Build configuration list for PBXProject "${projectName}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				${buildConfigDebugId} /* Debug */,
				${buildConfigReleaseId} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		${configListAppId} /* Build configuration list for PBXNativeTarget "${projectName}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				${buildConfigDebugId} /* Debug */,
				${buildConfigReleaseId} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		${configListTestId} /* Build configuration list for PBXNativeTarget "${projectName}Tests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				${buildConfigDebugId} /* Debug */,
				${buildConfigReleaseId} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		${configListUITestId} /* Build configuration list for PBXNativeTarget "${projectName}UITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				${buildConfigDebugId} /* Debug */,
				${buildConfigReleaseId} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = ${projectId} /* Project object */;
}`;

        await fs.writeFile(path.join(projectPath, `${projectName}.xcodeproj`, 'project.pbxproj'), pbxprojContent);
    }

    async generateAppDelegate(projectPath, features) {
        const projectName = path.basename(projectPath);
        const appDelegateContent = `import UIKit
${features.includes('auth') ? 'import Firebase' : ''}

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        ${features.includes('auth') ? 'FirebaseApp.configure()' : '// App initialization'}
        
        // Setup for AI-assisted development
        setupAIConfiguration()
        
        return true
    }
    
    private func setupAIConfiguration() {
        // Configuration optimized for GitHub Copilot assistance
        print("🤖 AI-powered iOS app initialized")
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }
}`;

        await fs.writeFile(path.join(projectPath, projectName, 'AppDelegate.swift'), appDelegateContent);
    }

    async generateViewController(projectPath) {
        const projectName = path.basename(projectPath);
        const viewControllerContent = `import UIKit

class ViewController: UIViewController {
    
    // MARK: - IBOutlets
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var subtitleLabel: UILabel!
    @IBOutlet weak var aiButton: UIButton!
    
    // MARK: - Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupAIAssistance()
    }
    
    // MARK: - UI Setup
    private func setupUI() {
        // UI configuration optimized for Copilot suggestions
        titleLabel.text = "AI-Powered iOS App"
        titleLabel.font = UIFont.systemFont(ofSize: 24, weight: .bold)
        titleLabel.textAlignment = .center
        
        subtitleLabel.text = "Built with GitHub Copilot assistance"
        subtitleLabel.font = UIFont.systemFont(ofSize: 16, weight: .regular)
        subtitleLabel.textColor = .systemGray
        subtitleLabel.textAlignment = .center
        
        aiButton.setTitle("Get Started with AI", for: .normal)
        aiButton.backgroundColor = .systemBlue
        aiButton.layer.cornerRadius = 8
        aiButton.titleLabel?.font = UIFont.systemFont(ofSize: 16, weight: .medium)
    }
    
    private func setupAIAssistance() {
        // Configuration for enhanced Copilot integration
        view.backgroundColor = .systemBackground
        
        // Add accessibility for better AI understanding
        titleLabel.accessibilityLabel = "Main app title"
        subtitleLabel.accessibilityLabel = "App description"
        aiButton.accessibilityLabel = "Action button for AI features"
    }
    
    // MARK: - Actions
    @IBAction func aiButtonTapped(_ sender: UIButton) {
        // TODO: Implement with GitHub Copilot assistance
        showAIFeatureAlert()
    }
    
    private func showAIFeatureAlert() {
        let alert = UIAlertController(
            title: "AI Assistant Ready",
            message: "Your app is ready for AI-powered development with GitHub Copilot!",
            preferredStyle: .alert
        )
        
        alert.addAction(UIAlertAction(title: "Continue", style: .default) { _ in
            // TODO: Navigate to main features
        })
        
        present(alert, animated: true)
    }
}`;

        await fs.writeFile(path.join(projectPath, projectName, 'ViewController.swift'), viewControllerContent);
    }

    async generateStoryboard(projectPath) {
        const projectName = path.basename(projectPath);
        const storyboardContent = `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21701" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="BYZ-38-t0r">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21679"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="System colors in document view" minToolsVersion="11.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <scene sceneID="tne-QT-ifu">
            <objects>
                <viewController id="BYZ-38-t0r" customClass="ViewController" customModule="${projectName}" customModuleProvider="target" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="8bC-Xf-vdC">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="AI-Powered iOS App" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="title-label">
                                <rect key="frame" x="50" y="300" width="293" height="30"/>
                                <fontDescription key="fontDescription" type="boldSystem" pointSize="24"/>
                                <color key="textColor" systemColor="labelColor"/>
                                <nil key="highlightedColor"/>
                            </label>
                            <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Built with GitHub Copilot assistance" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="subtitle-label">
                                <rect key="frame" x="50" y="350" width="293" height="20"/>
                                <fontDescription key="fontDescription" type="system" pointSize="16"/>
                                <color key="textColor" systemColor="secondaryLabelColor"/>
                                <nil key="highlightedColor"/>
                            </label>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="6Tk-OE-BBY"/>
                        <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                        <constraints>
                            <constraint firstItem="title-label" firstAttribute="centerX" secondItem="8bC-Xf-vdC" secondAttribute="centerX" id="title-centerX"/>
                            <constraint firstItem="title-label" firstAttribute="centerY" secondItem="8bC-Xf-vdC" secondAttribute="centerY" constant="-100" id="title-centerY"/>
                            <constraint firstItem="subtitle-label" firstAttribute="centerX" secondItem="8bC-Xf-vdC" secondAttribute="centerX" id="subtitle-centerX"/>
                            <constraint firstItem="subtitle-label" firstAttribute="top" secondItem="title-label" secondAttribute="bottom" constant="20" id="subtitle-top"/>
                        </constraints>
                    </view>
                    <connections>
                        <outlet property="titleLabel" destination="title-label" id="title-outlet"/>
                        <outlet property="subtitleLabel" destination="subtitle-label" id="subtitle-outlet"/>
                    </connections>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="dkx-z0-nzz" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="100" y="-2"/>
        </scene>
    </scenes>
    <resources>
        <systemColor name="labelColor">
            <color white="0.0" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
        </systemColor>
        <systemColor name="secondaryLabelColor">
            <color red="0.23529411764705882" green="0.23529411764705882" blue="0.2627450980392157" alpha="0.59999999999999998" colorSpace="custom" customColorSpace="sRGB"/>
        </systemColor>
        <systemColor name="systemBackgroundColor">
            <color white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
        </systemColor>
    </resources>
</document>`;

        await fs.writeFile(path.join(projectPath, projectName, 'Main.storyboard'), storyboardContent);
    }

    async generateInfoPlist(projectPath, projectName) {
        const infoPlistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>$(DEVELOPMENT_LANGUAGE)</string>
	<key>CFBundleDisplayName</key>
	<string>${projectName}</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
	<key>CFBundleShortVersionString</key>
	<string>1.0</string>
	<key>CFBundleVersion</key>
	<string>1</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>UIApplicationSceneManifest</key>
	<dict>
		<key>UIApplicationSupportsMultipleScenes</key>
		<false/>
		<key>UISceneConfigurations</key>
		<dict>
			<key>UIWindowSceneSessionRoleApplication</key>
			<array>
				<dict>
					<key>UISceneConfigurationName</key>
					<string>Default Configuration</string>
					<key>UISceneDelegateClassName</key>
					<string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
					<key>UISceneStoryboardFile</key>
					<string>Main</string>
				</dict>
			</array>
		</dict>
	</dict>
	<key>UIApplicationSupportsIndirectInputEvents</key>
	<true/>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIMainStoryboardFile</key>
	<string>Main</string>
	<key>UIRequiredDeviceCapabilities</key>
	<array>
		<string>armv7</string>
	</array>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UISupportedInterfaceOrientations~ipad</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationPortraitUpsideDown</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
</dict>
</plist>`;

        await fs.writeFile(path.join(projectPath, projectName, 'Info.plist'), infoPlistContent);
    }

    async generateAuthSystem(projectPath) {
        const projectName = path.basename(projectPath);

        const authManagerContent = `import Foundation
import UIKit

class AuthManager {
    static let shared = AuthManager()
    private init() {}
    
    // MARK: - Authentication Methods
    // These methods are optimized for GitHub Copilot assistance
    
    func signIn(email: String, password: String, completion: @escaping (Result<User, AuthError>) -> Void) {
        // TODO: Implement sign in logic with Copilot assistance
        // Copilot will help generate authentication flow
    }
    
    func signUp(email: String, password: String, completion: @escaping (Result<User, AuthError>) -> Void) {
        // TODO: Implement sign up logic with Copilot assistance  
        // Copilot will help generate user registration flow
    }
    
    func signOut(completion: @escaping (Result<Void, AuthError>) -> Void) {
        // TODO: Implement sign out logic with Copilot assistance
        // Copilot will help generate logout flow
    }
    
    func getCurrentUser() -> User? {
        // TODO: Implement get current user logic with Copilot assistance
        return nil
    }
}

// MARK: - Models
struct User {
    let id: String
    let email: String
    let displayName: String?
}

enum AuthError: Error {
    case invalidCredentials
    case networkError
    case userNotFound
    case weakPassword
    case emailAlreadyInUse
}`;

        await fs.writeFile(path.join(projectPath, projectName, 'Services', 'AuthManager.swift'), authManagerContent);
    }

    async generateTestFramework(projectPath) {
        const projectName = path.basename(projectPath);

        const testContent = `import XCTest
@testable import ${projectName}

class ${projectName}Tests: XCTestCase {
    
    override func setUpWithError() throws {
        // Setup code optimized for GitHub Copilot assistance
        // Copilot will help generate test setup
    }
    
    override func tearDownWithError() throws {
        // Cleanup code optimized for GitHub Copilot assistance  
        // Copilot will help generate test cleanup
    }
    
    func testExample() throws {
        // Example test optimized for GitHub Copilot assistance
        // Copilot will help generate test cases
        XCTAssertTrue(true, "This is a sample test")
    }
    
    func testPerformanceExample() throws {
        // Performance test optimized for GitHub Copilot assistance
        // Copilot will help generate performance tests
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
}`;

        await fs.writeFile(path.join(projectPath, `${projectName}Tests`, `${projectName}Tests.swift`), testContent);

        const uiTestContent = `import XCTest

class ${projectName}UITests: XCTestCase {
    
    override func setUpWithError() throws {
        // UI test setup optimized for GitHub Copilot assistance
        // Copilot will help generate UI test setup
        continueAfterFailure = false
    }
    
    override func tearDownWithError() throws {
        // UI test cleanup optimized for GitHub Copilot assistance
        // Copilot will help generate UI test cleanup
    }
    
    func testExample() throws {
        // UI test example optimized for GitHub Copilot assistance
        // Copilot will help generate UI test cases
        let app = XCUIApplication()
        app.launch()
        
        // Add UI test assertions here
        XCTAssertTrue(app.staticTexts["AI-Powered iOS App"].exists)
    }
    
    func testLaunchPerformance() throws {
        // Performance test optimized for GitHub Copilot assistance
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, watchOS 7.0, *) {
            measure(metrics: [XCTApplicationLaunchMetric()]) {
                XCUIApplication().launch()
            }
        }
    }
}`;

        await fs.writeFile(path.join(projectPath, `${projectName}UITests`, `${projectName}UITests.swift`), uiTestContent);
    }

    async generateAPILayer(projectPath) {
        const projectName = path.basename(projectPath);
        const apiServiceContent = `import Foundation

class APIService {
    static let shared = APIService()
    private let baseURL = "https://api.example.com"
    
    private init() {}
    
    // MARK: - Generic API Methods
    func get<T: Codable>(endpoint: String, responseType: T.Type, completion: @escaping (Result<T, APIError>) -> Void) {
        guard let url = URL(string: "\\(baseURL)/\\(endpoint)") else {
            completion(.failure(.invalidURL))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.networkError(error)))
                return
            }
            
            guard let data = data else {
                completion(.failure(.noData))
                return
            }
            
            do {
                let decodedResponse = try JSONDecoder().decode(responseType, from: data)
                completion(.success(decodedResponse))
            } catch {
                completion(.failure(.decodingError(error)))
            }
        }.resume()
    }
    
    func post<T: Codable, U: Codable>(endpoint: String, body: T, responseType: U.Type, completion: @escaping (Result<U, APIError>) -> Void) {
        guard let url = URL(string: "\\(baseURL)/\\(endpoint)") else {
            completion(.failure(.invalidURL))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONEncoder().encode(body)
        } catch {
            completion(.failure(.encodingError(error)))
            return
        }
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.networkError(error)))
                return
            }
            
            guard let data = data else {
                completion(.failure(.noData))
                return
            }
            
            do {
                let decodedResponse = try JSONDecoder().decode(responseType, from: data)
                completion(.success(decodedResponse))
            } catch {
                completion(.failure(.decodingError(error)))
            }
        }.resume()
    }
}

// MARK: - API Error Types
enum APIError: Error, LocalizedError {
    case invalidURL
    case noData
    case networkError(Error)
    case decodingError(Error)
    case encodingError(Error)
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Invalid URL"
        case .noData:
            return "No data received"
        case .networkError(let error):
            return "Network error: \\(error.localizedDescription)"
        case .decodingError(let error):
            return "Decoding error: \\(error.localizedDescription)"
        case .encodingError(let error):
            return "Encoding error: \\(error.localizedDescription)"
        }
    }
}`;

        await fs.writeFile(path.join(projectPath, projectName, 'Services', 'APIService.swift'), apiServiceContent);
    }

    async generateCopilotFiles(projectPath) {
        const readmeContent = `# AI-Powered iOS Application

Built with GitHub Copilot assistance for intelligent iOS development.

## Features

- 🤖 AI-assisted development with GitHub Copilot
- 📱 Native iOS application
- 🎨 Modern iOS design patterns
- 🏗️ Clean architecture with MVVM
- 🧪 Comprehensive testing setup

## Requirements

- iOS 14.0+
- Xcode 14.0+
- Swift 5.0+

## Getting Started

1. Open the project in Xcode
2. Use GitHub Copilot for AI-assisted development
3. Build and run the project
4. Start developing with AI assistance!

## GitHub Copilot Integration

This project is optimized for GitHub Copilot usage:

- Use the AI prompts in \`.copilot-prompts/\` for context-aware assistance
- Leverage Copilot Chat for complex feature development
- Follow iOS best practices for consistent AI suggestions

## Development with AI

### Recommended Copilot Prompts

- "Create a new view controller with navigation"
- "Add Core Data integration"
- "Implement networking layer"
- "Generate unit tests for [component]"
- "Add SwiftUI components"

### AI-Assisted Workflows

1. **UI Development**: Use Copilot to generate view controllers and UI components
2. **API Integration**: Let AI create service classes and data models
3. **Core Data**: Generate managed object models and contexts
4. **Testing**: Create comprehensive test suites
5. **Architecture**: Implement MVVM patterns

## Architecture

\`\`\`
${path.basename(projectPath)}/
├── AppDelegate.swift      # App lifecycle
├── Controllers/          # View controllers
├── Views/               # Custom views and UI
├── Models/              # Data models
├── Services/            # API and business logic
├── Utils/               # Helper classes
└── Resources/           # Assets and resources
\`\`\`

## AI Development Tips

- Use descriptive method and variable names for better Copilot suggestions
- Add documentation comments to guide AI understanding
- Leverage the pre-built patterns for common iOS tasks
- Use Copilot Chat for architectural decisions

Happy iOS coding with AI assistance! 🚀
`;

        await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
    }
}

module.exports = new SwiftTemplate();