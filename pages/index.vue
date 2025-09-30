<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Nuxt ViewerJS Module Demo
      </h1>
      <p class="text-lg text-gray-600">
        A powerful image viewer module for Nuxt 3/4 based on ViewerJS
      </p>
    </div>

    <!-- Basic Viewer Component -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Viewer Component</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <Viewer
          :options="viewerOptions"
          @ready="onViewerReady"
          @view="onView"
          @viewed="onViewed"
        >
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              v-for="(image, index) in sampleImages"
              :key="index"
              :src="image.src"
              :alt="image.alt"
              :data-source="image.src"
              class="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </Viewer>
      </div>
    </section>

    <!-- ViewerImage Component -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">ViewerImage Component</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ViewerImage
            v-for="(image, index) in sampleImages.slice(0, 6)"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            :options="imageViewerOptions"
            class="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
            @view="onImageView"
          />
        </div>
      </div>
    </section>

    <!-- ViewerGallery Component -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">ViewerGallery Component</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <ViewerGallery
          :images="sampleImages"
          :options="galleryOptions"
          :columns="4"
          gap="12px"
          aspect-ratio="16/9"
          @ready="onGalleryReady"
          @view="onGalleryView"
        />
      </div>
    </section>

    <!-- Custom Gallery with Slot -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Custom Gallery with Slot</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <ViewerGallery
          :options="galleryOptions"
          :columns="3"
          gap="16px"
          aspect-ratio="1/1"
          @ready="onCustomGalleryReady"
        >
          <div
            v-for="(image, index) in sampleImages.slice(0, 9)"
            :key="index"
            class="relative group cursor-pointer"
            @click="() => customGalleryViewer?.view(index)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              :data-source="image.src"
              class="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        </ViewerGallery>
      </div>
    </section>

    <!-- Composable Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Composable Usage</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4">
          <button
            v-for="action in viewerActions"
            :key="action.name"
            @click="action.handler"
            class="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {{ action.name }}
          </button>
        </div>
        <div ref="composableContainer" class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            v-for="(image, index) in sampleImages.slice(0, 6)"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            :data-source="image.src"
            class="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </div>
    </section>

    <!-- Event Log -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Event Log</h2>
      <div class="bg-gray-100 rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Recent Events</h3>
          <button
            @click="clearEvents"
            class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
          >
            Clear
          </button>
        </div>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="text-sm bg-white p-2 rounded border-l-4 border-blue-500"
          >
            <span class="font-mono text-blue-600">{{ event.timestamp }}</span>
            <span class="ml-2">{{ event.message }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ViewerOptions } from 'viewerjs'

// Sample images for demonstration
const sampleImages = [
  {
    src: 'https://picsum.photos/800/600?random=1',
    alt: 'Sample Image 1'
  },
  {
    src: 'https://picsum.photos/800/600?random=2',
    alt: 'Sample Image 2'
  },
  {
    src: 'https://picsum.photos/800/600?random=3',
    alt: 'Sample Image 3'
  },
  {
    src: 'https://picsum.photos/800/600?random=4',
    alt: 'Sample Image 4'
  },
  {
    src: 'https://picsum.photos/800/600?random=5',
    alt: 'Sample Image 5'
  },
  {
    src: 'https://picsum.photos/800/600?random=6',
    alt: 'Sample Image 6'
  },
  {
    src: 'https://picsum.photos/800/600?random=7',
    alt: 'Sample Image 7'
  },
  {
    src: 'https://picsum.photos/800/600?random=8',
    alt: 'Sample Image 8'
  },
  {
    src: 'https://picsum.photos/800/600?random=9',
    alt: 'Sample Image 9'
  },
  {
    src: 'https://picsum.photos/800/600?random=10',
    alt: 'Sample Image 10'
  },
  {
    src: 'https://picsum.photos/800/600?random=11',
    alt: 'Sample Image 11'
  },
  {
    src: 'https://picsum.photos/800/600?random=12',
    alt: 'Sample Image 12'
  }
]

// Viewer options
const viewerOptions: ViewerOptions = {
  inline: false,
  button: true,
  navbar: true,
  title: true,
  toolbar: true,
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: true,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true,
  focus: true,
  loading: true,
  loop: true,
  backdrop: true,
  interval: 5000,
  minZoomRatio: 0.1,
  maxZoomRatio: 10,
  zIndex: 2015,
  zIndexInline: 2015,
  url: 'data-source'
}

const imageViewerOptions: ViewerOptions = {
  ...viewerOptions,
  title: false,
  toolbar: false
}

const galleryOptions: ViewerOptions = {
  ...viewerOptions,
  interval: 3000
}

// Event tracking
const events = ref<Array<{ timestamp: string; message: string }>>([])

const addEvent = (message: string) => {
  events.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    message
  })
  if (events.value.length > 50) {
    events.value = events.value.slice(0, 50)
  }
}

const clearEvents = () => {
  events.value = []
}

// Viewer instances
const customGalleryViewer = ref<any>()
const composableViewer = ref<any>()

// Composable usage
const composableContainer = ref<HTMLElement>()
const { init, show, hide, view, prev, next, zoom, rotate, reset } = useViewer({
  autoInit: false,
  autoDestroy: true
})

// Viewer actions for composable demo
const viewerActions = computed(() => [
  {
    name: 'Show Viewer',
    handler: () => {
      if (composableContainer.value && !composableViewer.value) {
        composableViewer.value = init(composableContainer.value, viewerOptions)
        addEvent('Composable viewer initialized')
      }
      show()
      addEvent('Show viewer')
    }
  },
  {
    name: 'Hide Viewer',
    handler: () => {
      hide()
      addEvent('Hide viewer')
    }
  },
  {
    name: 'View First',
    handler: () => {
      view(0)
      addEvent('View first image')
    }
  },
  {
    name: 'View Last',
    handler: () => {
      view(5)
      addEvent('View last image')
    }
  },
  {
    name: 'Previous',
    handler: () => {
      prev()
      addEvent('Previous image')
    }
  },
  {
    name: 'Next',
    handler: () => {
      next()
      addEvent('Next image')
    }
  },
  {
    name: 'Zoom In',
    handler: () => {
      zoom(1.5)
      addEvent('Zoom in')
    }
  },
  {
    name: 'Zoom Out',
    handler: () => {
      zoom(0.5)
      addEvent('Zoom out')
    }
  },
  {
    name: 'Rotate',
    handler: () => {
      rotate(90)
      addEvent('Rotate 90°')
    }
  },
  {
    name: 'Reset',
    handler: () => {
      reset()
      addEvent('Reset image')
    }
  }
])

// Event handlers
const onViewerReady = (viewer: any) => {
  addEvent('Basic viewer ready')
}

const onView = (event: any) => {
  addEvent(`Viewing image ${event.detail.index + 1}`)
}

const onViewed = (event: any) => {
  addEvent(`Viewed image ${event.detail.index + 1}`)
}

const onImageView = (viewer: any) => {
  addEvent('Image viewer opened')
}

const onGalleryReady = (viewer: any) => {
  addEvent('Gallery viewer ready')
}

const onGalleryView = (event: any) => {
  addEvent(`Gallery viewing image ${event.detail.index + 1}`)
}

const onCustomGalleryReady = (viewer: any) => {
  customGalleryViewer.value = viewer
  addEvent('Custom gallery ready')
}

// Initialize composable viewer on mount
onMounted(() => {
  if (composableContainer.value) {
    composableViewer.value = init(composableContainer.value, viewerOptions)
    addEvent('Composable viewer initialized on mount')
  }
})

// Page meta
useHead({
  title: 'Nuxt ViewerJS Module Demo',
  meta: [
    { name: 'description', content: 'A powerful image viewer module for Nuxt 3/4 based on ViewerJS' }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Custom styles for better presentation */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-16 {
  gap: 4rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

.text-center {
  text-align: center;
}

.text-gray-800 {
  color: rgb(31 41 55);
}

.text-gray-600 {
  color: rgb(75 85 99);
}

.text-blue-600 {
  color: rgb(37 99 235);
}

.text-white {
  color: rgb(255 255 255);
}

.bg-white {
  background-color: rgb(255 255 255);
}

.bg-gray-100 {
  background-color: rgb(243 244 246);
}

.bg-blue-500 {
  background-color: rgb(59 130 246);
}

.bg-red-500 {
  background-color: rgb(239 68 68);
}

.bg-black {
  background-color: rgb(0 0 0);
}

.bg-opacity-0 {
  background-color: rgb(0 0 0 / 0);
}

.bg-opacity-20 {
  background-color: rgb(0 0 0 / 0.2);
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.p-2 {
  padding: 0.5rem;
}

.p-6 {
  padding: 1.5rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.w-full {
  width: 100%;
}

.h-32 {
  height: 8rem;
}

.h-48 {
  height: 12rem;
}

.h-full {
  height: 100%;
}

.max-h-64 {
  max-height: 16rem;
}

.object-cover {
  object-fit: cover;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:opacity-80:hover {
  opacity: 0.8;
}

.hover\:bg-blue-600:hover {
  background-color: rgb(37 99 235);
}

.hover\:bg-red-600:hover {
  background-color: rgb(220 38 38);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.overflow-y-auto {
  overflow-y: auto;
}

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0.5rem;
}

.border-l-4 {
  border-left-width: 4px;
}

.border-blue-500 {
  border-color: rgb(59 130 246);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-0 {
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.group {
  /* Group utility class */
}

.group:hover .group-hover\:bg-opacity-20 {
  background-color: rgb(0 0 0 / 0.2);
}

.group:hover .group-hover\:shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.opacity-0 {
  opacity: 0;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.max-w-1200 {
  max-width: 1200px;
}
</style>