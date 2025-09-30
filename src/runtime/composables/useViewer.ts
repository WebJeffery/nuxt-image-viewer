import type { ViewerOptions } from 'viewerjs'
import type { Ref } from 'vue'

export interface UseViewerOptions extends ViewerOptions {
  /**
   * Auto initialize viewer on mount
   * @default true
   */
  autoInit?: boolean
  
  /**
   * Destroy viewer on unmount
   * @default true
   */
  autoDestroy?: boolean
}

export interface UseViewerReturn {
  /**
   * Viewer instance
   */
  viewer: Ref<any>
  
  /**
   * Initialize viewer
   */
  init: (element: HTMLElement, options?: ViewerOptions) => any
  
  /**
   * Destroy viewer
   */
  destroy: () => void
  
  /**
   * Show viewer
   */
  show: (index?: number) => void
  
  /**
   * Hide viewer
   */
  hide: () => void
  
  /**
   * View specific image
   */
  view: (index: number) => void
  
  /**
   * Previous image
   */
  prev: () => void
  
  /**
   * Next image
   */
  next: () => void
  
  /**
   * Zoom in
   */
  zoom: (ratio: number) => void
  
  /**
   * Rotate image
   */
  rotate: (degree: number) => void
  
  /**
   * Scale image
   */
  scale: (scaleX: number, scaleY?: number) => void
  
  /**
   * Move image
   */
  move: (x: number, y: number) => void
  
  /**
   * Reset image
   */
  reset: () => void
  
  /**
   * Update viewer options
   */
  update: (options: ViewerOptions) => void
  
  /**
   * Get viewer options
   */
  getOptions: () => ViewerOptions
  
  /**
   * Get current image index
   */
  getCurrentIndex: () => number
  
  /**
   * Get total images count
   */
  getTotalImages: () => number
}

export function useViewer(options: UseViewerOptions = {}): UseViewerReturn {
  const { $viewer } = useNuxtApp()
  const viewer = ref(null)
  const element = ref<HTMLElement | null>(null)
  
  const {
    autoInit = true,
    autoDestroy = true,
    ...viewerOptions
  } = options

  const init = (el: HTMLElement, opts?: ViewerOptions) => {
    if (!el) return null
    
    element.value = el
    const mergedOptions = { ...viewerOptions, ...opts }
    viewer.value = $viewer.create(el, mergedOptions)
    
    return viewer.value
  }

  const destroy = () => {
    if (element.value && viewer.value) {
      $viewer.destroy(element.value)
      viewer.value = null
      element.value = null
    }
  }

  const show = (index?: number) => {
    if (viewer.value) {
      if (typeof index === 'number') {
        viewer.value.view(index)
      } else {
        viewer.value.show()
      }
    }
  }

  const hide = () => {
    if (viewer.value) {
      viewer.value.hide()
    }
  }

  const view = (index: number) => {
    if (viewer.value) {
      viewer.value.view(index)
    }
  }

  const prev = () => {
    if (viewer.value) {
      viewer.value.prev()
    }
  }

  const next = () => {
    if (viewer.value) {
      viewer.value.next()
    }
  }

  const zoom = (ratio: number) => {
    if (viewer.value) {
      viewer.value.zoom(ratio)
    }
  }

  const rotate = (degree: number) => {
    if (viewer.value) {
      viewer.value.rotate(degree)
    }
  }

  const scale = (scaleX: number, scaleY?: number) => {
    if (viewer.value) {
      viewer.value.scale(scaleX, scaleY)
    }
  }

  const move = (x: number, y: number) => {
    if (viewer.value) {
      viewer.value.move(x, y)
    }
  }

  const reset = () => {
    if (viewer.value) {
      viewer.value.reset()
    }
  }

  const update = (opts: ViewerOptions) => {
    if (viewer.value) {
      viewer.value.update(opts)
    }
  }

  const getOptions = () => {
    return viewer.value ? viewer.value.options : {}
  }

  const getCurrentIndex = () => {
    return viewer.value ? viewer.value.index : -1
  }

  const getTotalImages = () => {
    return viewer.value ? viewer.value.length : 0
  }

  // Auto cleanup on unmount
  if (autoDestroy) {
    onUnmounted(() => {
      destroy()
    })
  }

  return {
    viewer: readonly(viewer),
    init,
    destroy,
    show,
    hide,
    view,
    prev,
    next,
    zoom,
    rotate,
    scale,
    move,
    reset,
    update,
    getOptions,
    getCurrentIndex,
    getTotalImages
  }
}