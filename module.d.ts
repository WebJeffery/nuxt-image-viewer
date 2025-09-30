import type { ModuleOptions } from './types'

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
      create: (element: HTMLElement, options?: any) => any
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
      create: (element: HTMLElement, options?: any) => any
      get: (element: HTMLElement) => any
      destroy: (element: HTMLElement) => void
      destroyAll: () => void
    }
  }
}

export {}