import type { ViewerOptions } from 'viewerjs'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      viewer: {
        // Global ViewerJS instance management
        instances: new Map(),
        
        // Create new viewer instance
        create(element: HTMLElement, options?: ViewerOptions) {
          const Viewer = require('viewerjs').default
          const viewer = new Viewer(element, options)
          this.instances.set(element, viewer)
          return viewer
        },
        
        // Get viewer instance
        get(element: HTMLElement) {
          return this.instances.get(element)
        },
        
        // Destroy viewer instance
        destroy(element: HTMLElement) {
          const viewer = this.instances.get(element)
          if (viewer) {
            viewer.destroy()
            this.instances.delete(element)
          }
        },
        
        // Destroy all instances
        destroyAll() {
          this.instances.forEach((viewer) => {
            viewer.destroy()
          })
          this.instances.clear()
        }
      }
    }
  }
})