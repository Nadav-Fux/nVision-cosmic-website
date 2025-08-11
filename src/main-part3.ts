      case 'blockchain':
        this.animateBlockchainScene(scene, time)
        break
      case 'cloud':
        this.animateCloudScene(scene, time)
        break
      case 'mobile':
        this.animateMobileScene(scene, time)
        break
      case 'web':
        this.animateWebScene(scene, time)
        break
      case 'security':
        this.animateSecurityScene(scene, time)
        break
      case 'data':
        this.animateDataScene(scene, time)
        break
      case 'contact':
        this.animateContactScene(scene, time)
        break
    }
  }

  private animateHeroScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.ConeGeometry) {
        // Rocket animation
        child.rotation.y = time
        child.position.y = Math.sin(time) * 0.5
        child.position.x = Math.sin(time * 0.5) * 0.2
      } else if (child instanceof THREE.Points) {
        // Stars rotation
        child.rotation.y = time * 0.1
        child.rotation.x = time * 0.05
      }
    })
  }

  private animateServicesScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry instanceof THREE.SphereGeometry) {
          // Core reactor - different animations for different spheres
          if (child.scale.x < 0.8) {
            // Inner plasma core - intense pulsing and rotation
            child.rotation.y = time * 2
            child.rotation.x = time * 1.5
            child.scale.setScalar(0.5 + Math.sin(time * 4) * 0.2)
          } else {
            // Main core - steady pulsing
            child.rotation.y = time * 0.5
            child.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
          }
        } else if (child.geometry instanceof THREE.TorusGeometry) {
          // Energy rings - rotating at different speeds
          child.rotation.x = time * (1 + child.position.y * 0.5)
          child.rotation.y = time * (0.8 + child.position.y * 0.3)
          child.scale.setScalar(1 + Math.sin(time * 3 + child.position.y) * 0.05)
        } else if (child.geometry instanceof THREE.BoxGeometry) {
          // Orbiting services
          const angle = time + child.position.x
          child.position.x = Math.cos(angle) * 5
          child.position.z = Math.sin(angle) * 5
          child.position.y = Math.sin(time * 2 + angle) * 0.5
          child.rotation.y = time * 2
        } else if (child.geometry instanceof THREE.CylinderGeometry) {
          // Energy beams - pulsing and rotating
          child.rotation.z += 0.02
          child.scale.y = 1 + Math.sin(time * 4 + child.rotation.z) * 0.3
          const material = child.material as THREE.MeshBasicMaterial
          material.opacity = 0.6 + Math.sin(time * 5 + child.rotation.z) * 0.3
        }
      } else if (child instanceof THREE.Points) {
        // Plasma particles - swirling motion
        child.rotation.y = time * 0.8
        child.rotation.x = time * 0.6
        const positions = child.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          const radius = Math.sqrt(positions[i] * positions[i] + positions[i + 2] * positions[i + 2])
          const angle = Math.atan2(positions[i + 2], positions[i]) + time * 0.5
          positions[i] = Math.cos(angle) * radius
          positions[i + 2] = Math.sin(angle) * radius
          positions[i + 1] += Math.sin(time * 3 + radius) * 0.02
        }
        child.geometry.attributes.position.needsUpdate = true
      }
    })
  }

  private animatePortfolioScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
        // Wormhole rotation
        child.rotation.x = time * 0.3
        child.rotation.y = time * 0.2
        child.scale.setScalar(1 + Math.sin(time * 1.5) * 0.05)
      } else if (child instanceof THREE.Points) {
        // Particle flow
        child.rotation.z = time * 0.1
        const positions = child.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time + positions[i + 1]) * 0.01
          positions[i + 2] += Math.cos(time + positions[i]) * 0.01
        }
        child.geometry.attributes.position.needsUpdate = true
      }
    })
  }

  private animateAIScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry instanceof THREE.IcosahedronGeometry) {
          // AI Brain pulsing and rotating
          child.rotation.x = time * 0.2
          child.rotation.y = time * 0.15
          child.scale.setScalar(1 + Math.sin(time * 3) * 0.1)
        } else if (child.geometry instanceof THREE.SphereGeometry) {
          // Neural nodes floating
          child.position.x += Math.sin(time * 0.5 + child.position.y) * 0.02
          child.position.y += Math.cos(time * 0.3 + child.position.z) * 0.02
          child.position.z += Math.sin(time * 0.4 + child.position.x) * 0.02
          child.rotation.y = time * 2
        }
      }
    })
  }

  private animateBlockchainScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry) {
        // Blockchain blocks animation
        child.rotation.y = time * 0.5
        child.position.y = Math.sin(time + child.position.x) * 0.3
        child.scale.setScalar(1 + Math.sin(time * 2 + child.position.x) * 0.05)
      } else if (child instanceof THREE.Line) {
        // Connection lines pulsing
        const material = child.material as THREE.LineBasicMaterial
        material.opacity = 0.5 + Math.sin(time * 3) * 0.3
      }
    })
  }

  private animateCloudScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Points) {
        // Cloud particles flowing
        child.rotation.y = time * 0.1
        const positions = child.geometry.attributes.position.array as Float32Array
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(time * 0.5 + positions[i]) * 0.01
        }
        child.geometry.attributes.position.needsUpdate = true
      } else if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry) {
        // Data streams
        child.rotation.y = time * 0.3
        child.scale.y = 1 + Math.sin(time * 2 + child.position.x) * 0.2
      }
    })
  }

  private animateMobileScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry instanceof THREE.SphereGeometry) {
          // Earth rotation
          child.rotation.y = time * 0.2
          child.rotation.x = Math.sin(time * 0.1) * 0.1
        } else if (child.geometry instanceof THREE.BoxGeometry) {
          // Mobile devices orbiting
          const angle = time * 0.5 + child.position.x
          child.position.x = Math.cos(angle) * 3
          child.position.z = Math.sin(angle) * 3
          child.position.y = Math.sin(time * 2 + angle) * 0.5
          child.rotation.y = time * 2
        }
      }
    })
  }

  private animateWebScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
        // Network nodes
        child.rotation.y = time * 0.3
        child.position.y += Math.sin(time * 0.5 + child.position.x) * 0.01
        child.scale.setScalar(1 + Math.sin(time * 2 + child.position.x) * 0.1)
      } else if (child instanceof THREE.Line) {
        // Network connections pulsing
        const material = child.material as THREE.LineBasicMaterial
        material.opacity = 0.2 + Math.sin(time * 2 + child.position.x) * 0.3
      }
    })
  }

  private animateSecurityScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry instanceof THREE.SphereGeometry) {
          // Security shields
          child.rotation.x = time * 0.1
          child.rotation.y = time * 0.15
          child.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03)
        } else if (child.geometry instanceof THREE.OctahedronGeometry) {
          // Security nodes orbiting
          const angle = time * 0.8 + child.position.x
          child.position.x = Math.cos(angle) * 4
          child.position.z = Math.sin(angle) * 4
          child.rotation.y = time * 3
          child.position.y = Math.sin(time * 2 + angle) * 0.3
        }
      }
    })
  }

  private animateDataScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry) {
        // Data cubes
        child.rotation.x = time * 0.2 + child.position.x
        child.rotation.y = time * 0.3 + child.position.y
        child.rotation.z = time * 0.1 + child.position.z
        child.scale.setScalar(1 + Math.sin(time * 2 + child.position.x + child.position.y) * 0.1)
      } else if (child instanceof THREE.Line) {
        // Data flow lines
        const material = child.material as THREE.LineBasicMaterial
        material.opacity = 0.3 + Math.sin(time * 3 + child.position.x) * 0.4
      }
    })
  }

  private animateContactScene(scene: THREE.Scene, time: number): void {
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry instanceof THREE.TorusGeometry) {
          // Portal ring
          child.rotation.x = time * 0.2
          child.rotation.y = time * 0.3
          child.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
        } else if (child.geometry instanceof THREE.CylinderGeometry) {
          // Communication beams
          child.rotation.z = time * 0.5 + child.position.x
          child.scale.y = 1 + Math.sin(time * 3 + child.position.x) * 0.3
        }
      } else if (child instanceof THREE.Points) {
        // Energy particles
        child.rotation.y = time * 0.2
        const positions = child.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time * 0.5 + positions[i + 1]) * 0.02
          positions[i + 2] += Math.cos(time * 0.5 + positions[i]) * 0.02
        }
        child.geometry.attributes.position.needsUpdate = true
      }
    })
  }

  resizeScene(sceneId: string): void {
    const camera = this.cameras.get(sceneId)
    const renderer = this.renderers.get(sceneId)
    const canvas = renderer?.domElement
    
    if (!camera || !renderer || !canvas) return
    
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  }
}

// Game Animation System
class GameAnimationSystem {
  private achievements: string[] = []
  
  showAchievement(message: string): void {
    const notification = document.getElementById('achievementNotification')
    const text = document.getElementById('achievementText')
    
    if (notification && text) {
      text.textContent = message
      notification.classList.add('show')
      
      setTimeout(() => {
        notification.classList.remove('show')
      }, 3000)
    }
    
    this.achievements.push(message)
  }
  
  updateProgress(sceneId: string, progress: number): void {
    const progressBar = document.getElementById(`${sceneId}Progress`)
    if (progressBar) {
      progressBar.style.width = `${progress}%`
    }
  }
}

// Main Application
class CosmicJourneyApp {
  private languageController: LanguageController
  private themeController: ThemeController
  private sceneManager: SceneManager
  private gameSystem: GameAnimationSystem
  private vibeEyes: VibeEyesIntegration | null = null
  private isInitialized: boolean = false

  constructor() {
    this.languageController = new LanguageController()
    this.themeController = new ThemeController()
    this.sceneManager = new SceneManager()
    this.gameSystem = new GameAnimationSystem()
    
    // Initialize Vibe Eyes (optional - only if server is available)
    this.initializeVibeEyes()
  }

  private initializeVibeEyes(): void {
    try {
      this.vibeEyes = new VibeEyesIntegration({
        serverUrl: 'ws://localhost:8869',
        captureDelay: 2000, // Capture every 2 seconds
        autoCapture: true
      })
      
      this.sceneManager.setVibeEyes(this.vibeEyes)
      
      // Log app initialization
      this.vibeEyes.logEvent('cosmic-app-initialized', {
        timestamp: Date.now(),
        version: '1.0.0',
        features: ['11-cosmic-scenes', 'three-js-animations', 'hebrew-english', 'dark-light-mode']
      })
      
      console.log('🌌 Vibe Eyes integration initialized for cosmic monitoring')
    } catch (error) {
      console.warn('⚠️ Vibe Eyes server not available, continuing without monitoring:', error)
    }
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return
    
    try {
      // Hide loading screen
      const loadingScreen = document.getElementById('loadingScreen')
      if (loadingScreen) {
        loadingScreen.style.display = 'none'
      }
      
      // Setup event listeners
      this.setupEventListeners()
      
      // Initialize scenes
      this.initializeScenes()
      
      // Setup resize handler
      this.setupResizeHandler()
      
      this.isInitialized = true
      this.gameSystem.showAchievement('🚀 מסע קוסמי התחיל!')
      
    } catch (error) {
      console.error('Failed to initialize cosmic journey:', error)
    }
  }

  private setupEventListeners(): void {
    // Language toggle
    const languageToggle = document.getElementById('languageToggle')
    languageToggle?.addEventListener('click', () => {
      this.languageController.toggleLanguage()
      this.gameSystem.showAchievement('🌍 שפה הוחלפה!')
      this.vibeEyes?.logEvent('language-toggle', { language: this.languageController.currentLang })
    })

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle')
    themeToggle?.addEventListener('click', () => {
      this.themeController.toggleTheme()
      this.gameSystem.showAchievement('🎨 ערכת נושא הוחלפה!')
      this.vibeEyes?.logEvent('theme-toggle', { isDark: this.themeController.isDarkMode })
    })

    // Scene navigation
    document.querySelectorAll('.interactive-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).getAttribute('onclick')
        if (target) {
          this.vibeEyes?.logEvent('scene-navigation', { target })
          this.gameSystem.showAchievement('✨ סצנה חדשה נטענת!')
        }
      })
    })

    // Global error handling
    window.addEventListener('error', (event) => {
      this.vibeEyes?.logError('javascript-error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      this.vibeEyes?.logError('unhandled-promise-rejection', {
        reason: event.reason
      })
    })
  }

  private initializeScenes(): void {
    // Initialize all 11 cosmic scenes
    const sceneCanvases = [
      { id: 'hero', canvas: 'heroCanvas' },
      { id: 'services', canvas: 'servicesCanvas' },
      { id: 'portfolio', canvas: 'portfolioCanvas' },
      { id: 'ai', canvas: 'aiCanvas' },
      { id: 'blockchain', canvas: 'blockchainCanvas' },
      { id: 'cloud', canvas: 'cloudCanvas' },
      { id: 'mobile', canvas: 'mobileCanvas' },
      { id: 'web', canvas: 'webCanvas' },
      { id: 'security', canvas: 'securityCanvas' },
      { id: 'data', canvas: 'dataCanvas' },
      { id: 'contact', canvas: 'contactCanvas' }
    ]

    sceneCanvases.forEach(({ id, canvas }) => {
      this.sceneManager.initializeScene(id, canvas)
      this.gameSystem.updateProgress(id, 100)
    })
  }

  private setupResizeHandler(): void {
    window.addEventListener('resize', () => {
      ['hero', 'services', 'portfolio', 'ai', 'blockchain', 'cloud', 'mobile', 'web', 'security', 'data', 'contact'].forEach(sceneId => {
        this.sceneManager.resizeScene(sceneId)
      })
    })
  }
}

// Global navigation function
(window as any).navigateToScene = (sceneId: string) => {
  const targetElement = document.getElementById(sceneId)
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}

// Initialize application
const app = new CosmicJourneyApp()

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.initialize())
} else {
  app.initialize()
}