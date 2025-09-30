import type { ViewerOptions } from 'viewerjs'

export interface ModuleOptions {
  /**
   * Default ViewerJS options
   */
  defaultOptions?: ViewerOptions
  
  /**
   * Auto-import ViewerJS components
   * @default true
   */
  autoImport?: boolean
  
  /**
   * Global CSS for ViewerJS
   * @default true
   */
  globalCSS?: boolean
}

export interface UseViewerOptions extends ViewerOptions {
  /**
   * Auto initialize viewer on mount
   * @default true
   */
  autoInit?: boolean
  
  /**
   * Auto destroy viewer on unmount
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

export interface ViewerProps {
  /**
   * ViewerJS options
   */
  options?: ViewerOptions
  
  /**
   * Auto initialize on mount
   * @default true
   */
  autoInit?: boolean
  
  /**
   * Auto destroy on unmount
   * @default true
   */
  autoDestroy?: boolean
}

export interface ViewerImageProps {
  /**
   * Image source URL
   */
  src: string
  
  /**
   * Image alt text
   */
  alt?: string
  
  /**
   * Image class
   */
  imageClass?: string | string[] | Record<string, boolean>
  
  /**
   * Image style
   */
  imageStyle?: string | Record<string, any>
  
  /**
   * ViewerJS options for this image
   */
  options?: ViewerOptions
  
  /**
   * Whether to show in viewer on click
   * @default true
   */
  clickToView?: boolean
  
  /**
   * Custom click handler
   */
  onClick?: (event: MouseEvent) => void
}

export interface ViewerGalleryProps {
  /**
   * Gallery images data
   */
  images?: Array<{
    src: string
    alt?: string
    title?: string
    [key: string]: any
  }>
  
  /**
   * ViewerJS options
   */
  options?: ViewerOptions
  
  /**
   * Auto initialize on mount
   * @default true
   */
  autoInit?: boolean
  
  /**
   * Auto destroy on unmount
   * @default true
   */
  autoDestroy?: boolean
  
  /**
   * Gallery layout class
   */
  galleryClass?: string | string[] | Record<string, boolean>
  
  /**
   * Gallery layout style
   */
  galleryStyle?: string | Record<string, any>
  
  /**
   * Image item class
   */
  imageClass?: string | string[] | Record<string, boolean>
  
  /**
   * Image item style
   */
  imageStyle?: string | Record<string, any>
  
  /**
   * Number of columns for grid layout
   * @default 4
   */
  columns?: number
  
  /**
   * Gap between images
   * @default '8px'
   */
  gap?: string
  
  /**
   * Image aspect ratio
   * @default '16/9'
   */
  aspectRatio?: string
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    viewer?: ModuleOptions
  }
  
  interface NuxtOptions {
    viewer?: ModuleOptions
  }
}

declare module 'nuxt/config' {
  interface NuxtConfig {
    viewer?: ModuleOptions
  }
}

declare module '#app' {
  interface NuxtApp {
    $viewer: {
      instances: Map<HTMLElement, any>
      create: (element: HTMLElement, options?: ViewerOptions) => any
      get: (element: HTMLElement) => any
      destroy: (element: HTMLElement) => void
      destroyAll: () => void
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $viewer: {
      instances: Map<HTMLElement, any>
      create: (element: HTMLElement, options?: ViewerOptions) => any
      get: (element: HTMLElement) => any
      destroy: (element: HTMLElement) => void
      destroyAll: () => void
    }
  }
}