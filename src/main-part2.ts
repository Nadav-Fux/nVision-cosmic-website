      const trailGeometry = new THREE.RingGeometry(5.8, 6.2, 32)
      const trailMaterial = new THREE.MeshBasicMaterial({ 
        color: serviceColors[i],
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      })
      const trail = new THREE.Mesh(trailGeometry, trailMaterial)
      trail.rotation.x = Math.PI / 2
      scene.add(trail)
    }

    // Energy beams connecting core to services
    for (let i = 0; i < 4; i++) {
      const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 6, 8)
      const beamMaterial = new THREE.MeshBasicMaterial({ 
        color: serviceColors[i],
        transparent: true,
        opacity: 0.6
      })
      const beam = new THREE.Mesh(beamGeometry, beamMaterial)
      
      const angle = (i / 4) * Math.PI * 2
      beam.position.set(Math.cos(angle) * 3, 0, Math.sin(angle) * 3)
      beam.lookAt(Math.cos(angle) * 6, 0, Math.sin(angle) * 6)
      beam.userData = { type: 'beam', index: i }
      scene.add(beam)
    }

    camera.position.set(0, 8, 12)
    camera.lookAt(0, 0, 0)
  }

  private setupPortfolioScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Wormhole effect with fallback
    try {
      const wormholeGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100)
      const wormholeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x9966ff,
        transparent: true,
        opacity: 0.7
      })
      const wormhole = new THREE.Mesh(wormholeGeometry, wormholeMaterial)
      scene.add(wormhole)
    } catch (error) {
      // Fallback to ring geometry if TorusGeometry fails
      const fallbackGeometry = new THREE.RingGeometry(2.5, 3.5, 32)
      const fallbackMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x9966ff,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      })
      const fallbackWormhole = new THREE.Mesh(fallbackGeometry, fallbackMaterial)
      scene.add(fallbackWormhole)
    }

    // Particle system
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0x9966ff, 
      size: 0.1,
      transparent: true,
      opacity: 0.8
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 8
  }

  private setupAIScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // AI Brain Core
    const brainGeometry = new THREE.IcosahedronGeometry(2, 2)
    const brainMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    })
    const brain = new THREE.Mesh(brainGeometry, brainMaterial)
    scene.add(brain)

    // Neural Network Connections
    for (let i = 0; i < 20; i++) {
      const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8)
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x38b6ff })
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      
      node.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      scene.add(node)
    }

    camera.position.set(0, 0, 8)
  }

  private setupBlockchainScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Blockchain Blocks
    const blockColors = [0x38b6ff, 0xff3e96, 0x9966ff, 0x00ff88]
    for (let i = 0; i < 8; i++) {
      const blockGeometry = new THREE.BoxGeometry(1, 1, 1)
      const blockMaterial = new THREE.MeshBasicMaterial({ 
        color: blockColors[i % blockColors.length],
        transparent: true,
        opacity: 0.8
      })
      const block = new THREE.Mesh(blockGeometry, blockMaterial)
      
      block.position.set(i * 2 - 7, 0, 0)
      scene.add(block)

      // Connection lines
      if (i > 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3((i - 1) * 2 - 7, 0, 0),
          new THREE.Vector3(i * 2 - 7, 0, 0)
        ])
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
      }
    }

    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)
  }

  private setupCloudScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Cloud Particles
    const cloudGeometry = new THREE.BufferGeometry()
    const cloudCount = 800
    const positions = new Float32Array(cloudCount * 3)
    
    for (let i = 0; i < cloudCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 20
    }
    
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const cloudMaterial = new THREE.PointsMaterial({ 
      color: 0x38b6ff, 
      size: 0.3,
      transparent: true,
      opacity: 0.6
    })
    const cloud = new THREE.Points(cloudGeometry, cloudMaterial)
    scene.add(cloud)

    // Data Streams
    for (let i = 0; i < 5; i++) {
      const streamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 15, 8)
      const streamMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.5
      })
      const stream = new THREE.Mesh(streamGeometry, streamMaterial)
      
      stream.position.set(
        (Math.random() - 0.5) * 15,
        0,
        (Math.random() - 0.5) * 15
      )
      stream.rotation.z = Math.random() * Math.PI
      scene.add(stream)
    }

    camera.position.set(0, 8, 12)
  }

  private setupMobileScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Mobile devices orbiting Earth
    const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32)
    const earthMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x38b6ff,
      transparent: true,
      opacity: 0.8
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Mobile devices
    const deviceColors = [0xff3e96, 0x9966ff, 0x00ff88, 0xffaa00]
    for (let i = 0; i < 6; i++) {
      const deviceGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.1)
      const deviceMaterial = new THREE.MeshBasicMaterial({ color: deviceColors[i % deviceColors.length] })
      const device = new THREE.Mesh(deviceGeometry, deviceMaterial)
      
      const angle = (i / 6) * Math.PI * 2
      device.position.set(Math.cos(angle) * 3, Math.sin(angle * 0.5) * 0.5, Math.sin(angle) * 3)
      scene.add(device)
    }

    camera.position.set(0, 2, 6)
    camera.lookAt(0, 0, 0)
  }

  private setupWebScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Web universe with interconnected nodes
    const centerGeometry = new THREE.SphereGeometry(1, 32, 32)
    const centerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x9966ff,
      transparent: true,
      opacity: 0.9
    })
    const center = new THREE.Mesh(centerGeometry, centerMaterial)
    scene.add(center)

    // Web nodes
    for (let i = 0; i < 12; i++) {
      const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16)
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x38b6ff })
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      
      const phi = Math.acos(-1 + (2 * i) / 12)
      const theta = Math.sqrt(12 * Math.PI) * phi
      
      node.position.setFromSphericalCoords(4, phi, theta)
      scene.add(node)

      // Connection lines
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        node.position
      ])
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }

    camera.position.set(0, 0, 8)
  }

  private setupSecurityScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Security shield layers
    for (let i = 0; i < 4; i++) {
      const shieldGeometry = new THREE.SphereGeometry(2 + i * 0.5, 32, 32)
      const shieldMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.2 - i * 0.03,
        wireframe: true
      })
      const shield = new THREE.Mesh(shieldGeometry, shieldMaterial)
      scene.add(shield)
    }

    // Security nodes
    for (let i = 0; i < 8; i++) {
      const nodeGeometry = new THREE.OctahedronGeometry(0.3)
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff3e96 })
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      
      const angle = (i / 8) * Math.PI * 2
      node.position.set(Math.cos(angle) * 4, Math.sin(angle * 2) * 1, Math.sin(angle) * 4)
      scene.add(node)
    }

    camera.position.set(0, 3, 8)
    camera.lookAt(0, 0, 0)
  }

  private setupDataScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Data dimension with floating cubes
    for (let x = -3; x <= 3; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -3; z <= 3; z++) {
          if (Math.random() > 0.7) {
            const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
            const cubeMaterial = new THREE.MeshBasicMaterial({ 
              color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
              transparent: true,
              opacity: 0.8
            })
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.set(x * 1.5, y * 1.5, z * 1.5)
            scene.add(cube)
          }
        }
      }
    }

    // Data flow lines
    for (let i = 0; i < 20; i++) {
      const points = []
      for (let j = 0; j < 10; j++) {
        points.push(new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10
        ))
      }
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x38b6ff,
        transparent: true,
        opacity: 0.4
      })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }

    camera.position.set(0, 0, 10)
  }

  private setupContactScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    // Communication portal
    try {
      const portalGeometry = new THREE.TorusGeometry(2.5, 0.3, 16, 100)
      const portalMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x9966ff,
        transparent: true,
        opacity: 0.8
      })
      const portal = new THREE.Mesh(portalGeometry, portalMaterial)
      scene.add(portal)
    } catch (error) {
      // Fallback ring
      const fallbackGeometry = new THREE.RingGeometry(2.2, 2.8, 32)
      const fallbackMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x9966ff,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      })
      const fallbackPortal = new THREE.Mesh(fallbackGeometry, fallbackMaterial)
      scene.add(fallbackPortal)
    }
    // Energy particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 300
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0xff3e96, 
      size: 0.2,
      transparent: true,
      opacity: 0.9
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Communication Beams
    for (let i = 0; i < 4; i++) {
      const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 8, 8)
      const beamMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.7
      })
      const beam = new THREE.Mesh(beamGeometry, beamMaterial)
      
      const angle = (i / 4) * Math.PI * 2
      beam.position.set(Math.cos(angle) * 2, 0, Math.sin(angle) * 2)
      beam.rotation.z = angle + Math.PI / 2
      scene.add(beam)
    }

    camera.position.set(0, 0, 8)
  }

  private startAnimation(sceneId: string): void {
    const scene = this.scenes.get(sceneId)
    const camera = this.cameras.get(sceneId)
    const renderer = this.renderers.get(sceneId)
    
    if (!scene || !camera || !renderer) return

    // Log animation start
    if (this.vibeEyes) {
      this.vibeEyes.logEvent('animation-started', { sceneId })
    }

    const animate = () => {
      const frameId = requestAnimationFrame(animate)
      this.animationFrames.set(sceneId, frameId)

      // Scene-specific animations
      this.updateSceneAnimation(sceneId, scene)
      
      renderer.render(scene, camera)
    }
    
    animate()
  }

  private updateSceneAnimation(sceneId: string, scene: THREE.Scene): void {
    const time = Date.now() * 0.001
    
    switch (sceneId) {
      case 'hero':
        this.animateHeroScene(scene, time)
        break
      case 'services':
        this.animateServicesScene(scene, time)
        break
      case 'portfolio':
        this.animatePortfolioScene(scene, time)
        break
      case 'ai':
        this.animateAIScene(scene, time)
        break