import './style.css'
import * as THREE from 'three'
import { io } from 'socket.io-client'

// Vibe Eyes Integration
interface VibeEyesConfig {
  serverUrl: string
  captureDelay: number
  autoCapture: boolean
}

class VibeEyesIntegration {
  private socket: any
  private config: VibeEyesConfig
  private captureInterval: number | null = null
  private canvasElements: HTMLCanvasElement[] = []

  constructor(config: VibeEyesConfig) {
    this.config = config
    this.initializeConnection()
  }

  private initializeConnection(): void {
    try {
      this.socket = io(this.config.serverUrl, {
        transports: ['websocket', 'polling']
      })

      this.socket.on('connect', () => {
        console.log('🚀 Vibe Eyes connected to cosmic monitoring system')
        if (this.config.autoCapture) {
          this.startCapturing()
        }
      })

      this.socket.on('disconnect', () => {
        console.log('🌌 Vibe Eyes disconnected from cosmic monitoring')
        this.stopCapturing()
      })

      this.socket.on('error', (error: any) => {
        console.warn('⚠️ Vibe Eyes connection error:', error)
      })
    } catch (error) {
      console.warn('⚠️ Vibe Eyes initialization failed:', error)
    }
  }

  public addCanvas(canvas: HTMLCanvasElement): void {
    if (!this.canvasElements.includes(canvas)) {
      this.canvasElements.push(canvas)
      console.log(`🎨 Added canvas to Vibe Eyes monitoring: ${canvas.id}`)
    }
  }

  public startCapturing(): void {
    if (this.captureInterval) return

    this.captureInterval = window.setInterval(() => {
      this.captureCanvasData()
    }, this.config.captureDelay)

    console.log('📸 Vibe Eyes capture started')
  }

  public stopCapturing(): void {
    if (this.captureInterval) {
      clearInterval(this.captureInterval)
      this.captureInterval = null
      console.log('⏹️ Vibe Eyes capture stopped')
    }
  }

  private captureCanvasData(): void {
    if (!this.socket?.connected) return

    this.canvasElements.forEach((canvas, index) => {
      try {
        const dataUrl = canvas.toDataURL('image/png', 0.8)
        const timestamp = Date.now()
        
        const captureData = {
          canvasId: canvas.id || `canvas-${index}`,
          dataUrl,
          timestamp,
          width: canvas.width,
          height: canvas.height,
          metadata: {
            scene: canvas.getAttribute('data-scene') || 'unknown',
            type: 'cosmic-animation'
          }
        }

        this.socket.emit('canvas-capture', captureData)
      } catch (error) {
        console.warn(`⚠️ Failed to capture canvas ${canvas.id}:`, error)
      }
    })
  }

  public logEvent(event: string, data?: any): void {
    if (this.socket?.connected) {
      this.socket.emit('debug-log', {
        timestamp: Date.now(),
        level: 'info',
        event,
        data,
        source: 'cosmic-journey'
      })
    }
  }

  public logError(error: string, details?: any): void {
    if (this.socket?.connected) {
      this.socket.emit('debug-log', {
        timestamp: Date.now(),
        level: 'error',
        event: 'error',
        message: error,
        details,
        source: 'cosmic-journey'
      })
    }
  }

  public disconnect(): void {
    this.stopCapturing()
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

// Language Controller
class LanguageController {
  private currentLanguage: 'he' | 'en' = 'he'

  get currentLang(): 'he' | 'en' {
    return this.currentLanguage
  }
  private translations: Record<string, Record<string, string>> = {
    he: {
      'loading': 'טוען מסע קוסמי...',
      'logo': 'nVision קוסמוס',
      'language-toggle': 'EN',
      'theme-toggle': '☀️',
      'hero-title': 'רמפת השיגור הקוסמית',
      'hero-subtitle': 'מסע אל העתיד הדיגיטלי',
      'hero-description': 'ברוכים הבאים למסע קוסמי דיגיטלי מרהיב. חקרו 11 עולמות אינטראקטיביים, גלו טכנולוגיות מתקדמות וחוו חדשנות בממדים חדשים.',
      'hero-cta': 'התחל מסע',
      'services-title': 'הכור המרכזי - שירותים',
      'services-subtitle': 'מקור האנרגיה הדיגיטלית',
      'services-description': 'גלו את מגוון השירותים המתקדמים שלנו. כל שירות הוא כוכב לכת הנע במסלול מושלם סביב הכור המרכזי של החדשנות והמצוינות.',
      'services-cta': 'חקור שירותים',
      'portfolio-title': 'חור התולעת - תיק עבודות',
      'portfolio-subtitle': 'מעבר בין ממדי הפרויקטים',
      'portfolio-description': 'עברו דרך חור התולעת הקוסמי וגלו את הפרויקטים המרהיבים שיצרנו. כל פרויקט הוא ממד נפרד של יצירתיות וחדשנות טכנולוגית.',
      'portfolio-cta': 'חקור פרויקטים',
      'ai-title': 'ערפילית הבינה המלאכותית',
      'ai-subtitle': 'מוח דיגיטלי קוסמי',
      'ai-description': 'גלו את כוח הבינה המלאכותית המתקדמת שלנו. כמו ערפילית קוסמית יוצרת כוכבים חדשים, הטכנולוגיות שלנו יוצרות פתרונות חכמים ומהפכניים.',
      'ai-cta': 'חקור AI',
      'blockchain-title': 'גלקסיית הבלוקצ\'יין',
      'blockchain-subtitle': 'רשת אמון אינסופית',
      'blockchain-description': 'נסעו דרך גלקסיית הבלוקצ\'יין, שם כל בלוק הוא כוכב המחובר ברשת אמון בלתי ניתנת לשבירה. טכנולוגיה מבוזרת היוצרת עתיד בטוח ושקוף.',
      'blockchain-cta': 'חקור בלוקצ\'יין',
      'cloud-title': 'קבוצת כוכבי הענן',
      'cloud-subtitle': 'תשתית דיגיטלית אינסופית',
      'cloud-description': 'עלו אל קבוצת כוכבי הענן הדיגיטלי, שם המידע זורם בחופשיות בין כוכבי הלכת. פתרונות ענן מתקדמים המספקים גמישות וביצועים ללא גבולות.',
      'cloud-cta': 'חקור ענן',
      'mobile-title': 'מסלול הנייד',
      'mobile-subtitle': 'חוויות בכף היד',
      'mobile-description': 'הצטרפו למסלול הנייד, שם אפליקציות מתקדמות מקיפות את כדור הארץ הדיגיטלי. פתרונות מובייל חדשניים המביאים את העתיד לכף היד שלכם.',
      'mobile-cta': 'חקור מובייל',
      'web-title': 'יקום הרשת',
      'web-subtitle': 'חוויות דיגיטליות אינסופיות',
      'web-description': 'חקרו את יקום הרשת האינסופי, שם אתרים ואפליקציות רשת יוצרים גלקסיות של חוויות דיגיטליות. טכנולוגיות רשת מתקדמות המחברות עולמות.',
      'web-cta': 'חקור רשת',
      'security-title': 'מגן האבטחה הקוסמי',
      'security-subtitle': 'הגנה דיגיטלית מתקדמת',
      'security-description': 'היכנסו למגן האבטחה הקוסמי, שם שכבות הגנה מתקדמות מגינות על הנכסים הדיגיטליים. פתרונות אבטחה חדשניים המבטיחים שלמות ופרטיות מוחלטת.',
      'security-cta': 'חקור אבטחה',
      'data-title': 'ממד הנתונים',
      'data-subtitle': 'אינטליגנציה מידע מתקדמת',
      'data-description': 'גלו את ממד הנתונים, שם מידע גולמי הופך לתובנות יקרות ערך. טכנולוגיות ניתוח נתונים מתקדמות החושפות דפוסים נסתרים ביקום הדיגיטלי.',
      'data-cta': 'חקור נתונים',
      'contact-title': 'פורטל התקשורת',
      'contact-subtitle': 'שער לעתיד הדיגיטלי',
      'contact-description': 'הגעתם לפורטל התקשורת הקוסמי. כאן מתחיל המסע האמיתי שלכם אל העתיד הדיגיטלי. צרו קשר ובואו נבנה יחד את החזון הטכנולוגי שלכם.',
      'contact-cta': 'צור קשר'
    },
    en: {
      'loading': 'Loading Cosmic Journey...',
      'logo': 'nVision Cosmos',
      'language-toggle': 'עב',
      'theme-toggle': '☀️',
      'hero-title': 'Cosmic Launch Pad',
      'hero-subtitle': 'Journey to the Digital Future',
      'hero-description': 'Welcome to an amazing digital cosmic journey. Explore 11 interactive worlds, discover advanced technologies and experience innovation in new dimensions.',
      'hero-cta': 'Start Journey',
      'services-title': 'Core Reactor - Services',
      'services-subtitle': 'Source of Digital Energy',
      'services-description': 'Discover our range of advanced services. Each service is a planet moving in perfect orbit around the central reactor of innovation and excellence.',
      'services-cta': 'Explore Services',
      'portfolio-title': 'Wormhole - Portfolio',
      'portfolio-subtitle': 'Passage Between Project Dimensions',
      'portfolio-description': 'Pass through the cosmic wormhole and discover the amazing projects we have created. Each project is a separate dimension of creativity and technological innovation.',
      'portfolio-cta': 'Explore Projects',
      'ai-title': 'AI Nebula',
      'ai-subtitle': 'Cosmic Digital Brain',
      'ai-description': 'Discover the power of our advanced artificial intelligence. Like a cosmic nebula creating new stars, our technologies create smart and revolutionary solutions.',
      'ai-cta': 'Explore AI',
      'blockchain-title': 'Blockchain Galaxy',
      'blockchain-subtitle': 'Infinite Trust Network',
      'blockchain-description': 'Travel through the blockchain galaxy, where each block is a star connected in an unbreakable trust network. Decentralized technology creating a secure and transparent future.',
      'blockchain-cta': 'Explore Blockchain',
      'cloud-title': 'Cloud Constellation',
      'cloud-subtitle': 'Infinite Digital Infrastructure',
      'cloud-description': 'Rise to the digital cloud constellation, where information flows freely between planets. Advanced cloud solutions providing flexibility and performance without limits.',
      'cloud-cta': 'Explore Cloud',
      'mobile-title': 'Mobile Orbit',
      'mobile-subtitle': 'Experiences in Your Palm',
      'mobile-description': 'Join the mobile orbit, where advanced applications orbit the digital Earth. Innovative mobile solutions bringing the future to your palm.',
      'mobile-cta': 'Explore Mobile',
      'web-title': 'Web Universe',
      'web-subtitle': 'Infinite Digital Experiences',
      'web-description': 'Explore the infinite web universe, where websites and web applications create galaxies of digital experiences. Advanced web technologies connecting worlds.',
      'web-cta': 'Explore Web',
      'security-title': 'Cosmic Security Shield',
      'security-subtitle': 'Advanced Digital Protection',
      'security-description': 'Enter the cosmic security shield, where advanced protection layers guard digital assets. Innovative security solutions ensuring complete integrity and privacy.',
      'security-cta': 'Explore Security',
      'data-title': 'Data Dimension',
      'data-subtitle': 'Advanced Information Intelligence',
      'data-description': 'Discover the data dimension, where raw information becomes valuable insights. Advanced data analysis technologies revealing hidden patterns in the digital universe.',
      'data-cta': 'Explore Data',
      'contact-title': 'Communication Portal',
      'contact-subtitle': 'Gateway to Digital Future',
      'contact-description': 'You have reached the cosmic communication portal. Here begins your real journey to the digital future. Contact us and let\'s build your technological vision together.',
      'contact-cta': 'Contact Us'
    }
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'he' ? 'en' : 'he'
    this.updateDOM()
  }

  private updateDOM(): void {
    const html = document.documentElement
    const isHebrew = this.currentLanguage === 'he'
    
    html.setAttribute('lang', this.currentLanguage)
    html.setAttribute('dir', isHebrew ? 'rtl' : 'ltr')
    
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate')!
      if (this.translations[this.currentLanguage][key]) {
        element.textContent = this.translations[this.currentLanguage][key]
      }
    })
  }
}

// Theme Controller
class ThemeController {
  private isDark: boolean = false

  get isDarkMode(): boolean {
    return this.isDark
  }

  toggleTheme(): void {
    this.isDark = !this.isDark
    document.body.classList.toggle('dark-theme', this.isDark)
    
    const themeToggle = document.getElementById('themeToggle')?.querySelector('span')
    if (themeToggle) {
      themeToggle.textContent = this.isDark ? '🌙' : '☀️'
    }
  }
}

// Scene Manager
class SceneManager {
  private scenes: Map<string, THREE.Scene> = new Map()
  private renderers: Map<string, THREE.WebGLRenderer> = new Map()
  private cameras: Map<string, THREE.PerspectiveCamera> = new Map()
  private animationFrames: Map<string, number> = new Map()
  private vibeEyes: VibeEyesIntegration | null = null

  setVibeEyes(vibeEyes: VibeEyesIntegration): void {
    this.vibeEyes = vibeEyes
  }

  initializeScene(sceneId: string, canvasId: string): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000, 0)
    
    // Add scene metadata to canvas for Vibe Eyes
    canvas.setAttribute('data-scene', sceneId)
    
    this.scenes.set(sceneId, scene)
    this.cameras.set(sceneId, camera)
    this.renderers.set(sceneId, renderer)

    // Add canvas to Vibe Eyes monitoring
    if (this.vibeEyes) {
      this.vibeEyes.addCanvas(canvas)
      this.vibeEyes.logEvent('scene-initialized', { sceneId, canvasId })
    }

    // Initialize specific scene content
    this.setupSceneContent(sceneId, scene, camera)
    this.startAnimation(sceneId)
  }

  private setupSceneContent(sceneId: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    switch (sceneId) {
      case 'hero':
        this.setupHeroScene(scene, camera)
        break
      case 'services':
        this.setupServicesScene(scene, camera)
        break
      case 'portfolio':
        this.setupPortfolioScene(scene, camera)
        break
      case 'ai':
        this.setupAIScene(scene, camera)
        break
      case 'blockchain':
        this.setupBlockchainScene(scene, camera)
        break
      case 'cloud':
        this.setupCloudScene(scene, camera)
        break
      case 'mobile':
        this.setupMobileScene(scene, camera)
        break
      case 'web':
        this.setupWebScene(scene, camera)
        break
      case 'security':
        this.setupSecurityScene(scene, camera)
        break
      case 'data':
        this.setupDataScene(scene, camera)
        break
      case 'contact':
        this.setupContactScene(scene, camera)
        break
    }
  }

  private setupHeroScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Starfield
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Rocket
    const rocketGeometry = new THREE.ConeGeometry(0.5, 3, 8)
    const rocketMaterial = new THREE.MeshBasicMaterial({ color: 0x38b6ff })
    const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial)
    rocket.position.set(0, 0, -10)
    scene.add(rocket)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    scene.add(ambientLight, directionalLight)

    camera.position.z = 5
  }

  private setupServicesScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Core reactor with multiple layers
    const coreGeometry = new THREE.SphereGeometry(2, 32, 32)
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff3e96,
      transparent: true,
      opacity: 0.9
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    core.userData = { type: 'core' }
    scene.add(core)

    // Inner plasma core
    const plasmaCoreGeometry = new THREE.SphereGeometry(1.5, 16, 16)
    const plasmaCoreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    })
    const plasmaCore = new THREE.Mesh(plasmaCoreGeometry, plasmaCoreMaterial)
    plasmaCore.userData = { type: 'plasma' }
    scene.add(plasmaCore)

    // Energy rings around core
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(2.5 + i * 0.5, 0.1, 8, 32)
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: [0x38b6ff, 0x9966ff, 0xffaa00][i],
        transparent: true,
        opacity: 0.7
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2 + (i * Math.PI / 6)
      ring.userData = { type: 'ring', index: i }
      scene.add(ring)
    }

    // Plasma particles around core
    const plasmaGeometry = new THREE.BufferGeometry()
    const plasmaCount = 300
    const plasmaPositions = new Float32Array(plasmaCount * 3)
    
    for (let i = 0; i < plasmaCount * 3; i += 3) {
      const radius = 3 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      plasmaPositions[i] = radius * Math.sin(phi) * Math.cos(theta)
      plasmaPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      plasmaPositions[i + 2] = radius * Math.cos(phi)
    }
    
    plasmaGeometry.setAttribute('position', new THREE.BufferAttribute(plasmaPositions, 3))
    const plasmaMaterial = new THREE.PointsMaterial({ 
      color: 0xff3e96, 
      size: 0.1,
      transparent: true,
      opacity: 0.8
    })
    const plasmaParticles = new THREE.Points(plasmaGeometry, plasmaMaterial)
    plasmaParticles.userData = { type: 'plasmaParticles' }
    scene.add(plasmaParticles)

    // Orbiting service planets
    const serviceColors = [0x38b6ff, 0x00ff88, 0xffaa00, 0xff0066]
    const serviceNames = ['AI', 'Cloud', 'Mobile', 'Web']
    for (let i = 0; i < 4; i++) {
      const serviceGeometry = new THREE.SphereGeometry(0.4, 16, 16)
      const serviceMaterial = new THREE.MeshBasicMaterial({ 
        color: serviceColors[i],
        transparent: true,
        opacity: 0.9
      })
      const service = new THREE.Mesh(serviceGeometry, serviceMaterial)
      
      const angle = (i / 4) * Math.PI * 2
      service.position.set(Math.cos(angle) * 6, 0, Math.sin(angle) * 6)
      service.userData = { type: 'service', index: i, name: serviceNames[i] }
      scene.add(service)

      // Service orbit trails
      const trailGeometry = new THREE.RingGeometry(5.8, 6.2, 32)
      const trailMaterial = new THREE.MeshBasicMaterial({ 
        color: serviceColors[i],
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      })
      const trail = new THREE.Mesh(trailGeometry, trailMaterial)
      trail.rotation.x = Math.PI / 2
      trail.userData = { type: 'trail', index: i }
      scene.add(trail)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    const pointLight = new THREE.PointLight(0xff3e96, 1, 100)
    pointLight.position.set(0, 0, 0)
    scene.add(ambientLight, pointLight)

    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)
  }