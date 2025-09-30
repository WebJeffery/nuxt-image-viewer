import { defineNuxtModule, addPlugin, createResolver, addComponent, addImports } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'

export interface ModuleOptions {
  /**
   * Default ViewerJS options
   */
  defaultOptions?: Record<string, any>
  
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

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/viewer',
    configKey: 'viewer',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0'
    }
  },
  defaults: {
    defaultOptions: {},
    autoImport: true,
    globalCSS: true
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Add global CSS
    if (options.globalCSS) {
      nuxt.options.css.push('viewerjs/dist/viewer.css')
    }

    // Add plugin
    addPlugin({
      src: resolver.resolve(runtimeDir, 'plugin.client'),
      mode: 'client'
    })

    // Add auto-imports
    if (options.autoImport) {
      addImports([
        {
          name: 'useViewer',
          from: resolver.resolve(runtimeDir, 'composables/useViewer')
        }
      ])

      addComponent({
        name: 'Viewer',
        filePath: resolver.resolve(runtimeDir, 'components/Viewer.vue')
      })

      addComponent({
        name: 'ViewerImage',
        filePath: resolver.resolve(runtimeDir, 'components/ViewerImage.vue')
      })

      addComponent({
        name: 'ViewerGallery',
        filePath: resolver.resolve(runtimeDir, 'components/ViewerGallery.vue')
      })
    }

    // Add runtime config
    nuxt.options.runtimeConfig.public.viewer = options.defaultOptions || {}
  }
})