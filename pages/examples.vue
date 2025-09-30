<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        ViewerJS Examples
      </h1>
      <p class="text-lg text-gray-600">
        Various usage examples and configurations
      </p>
    </div>

    <!-- Inline Viewer -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Inline Viewer</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <Viewer
          :options="inlineOptions"
          @ready="onInlineReady"
        >
          <div class="flex justify-center">
            <img
              src="https://picsum.photos/600/400?random=1"
              alt="Inline Viewer Image"
              data-source="https://picsum.photos/1200/800?random=1"
              class="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Viewer>
      </div>
    </section>

    <!-- Minimal Viewer -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Minimal Viewer (No Toolbar)</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <Viewer
          :options="minimalOptions"
          @ready="onMinimalReady"
        >
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img
              v-for="(image, index) in sampleImages.slice(0, 6)"
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

    <!-- Slideshow Gallery -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Slideshow Gallery</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <ViewerGallery
          :images="sampleImages.slice(0, 8)"
          :options="slideshowOptions"
          :columns="4"
          gap="8px"
          aspect-ratio="4/3"
          @ready="onSlideshowReady"
        />
        <div class="mt-4 text-center">
          <button
            @click="startSlideshow"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-2"
          >
            Start Slideshow
          </button>
          <button
            @click="stopSlideshow"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Stop Slideshow
          </button>
        </div>
      </div>
    </section>

    <!-- Custom Styled Gallery -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Custom Styled Gallery</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <ViewerGallery
          :images="sampleImages.slice(0, 9)"
          :options="customOptions"
          :columns="3"
          gap="20px"
          aspect-ratio="1/1"
          gallery-class="custom-gallery"
          image-class="custom-image"
          @ready="onCustomReady"
        />
      </div>
    </section>

    <!-- Responsive Gallery -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Responsive Gallery</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <ViewerGallery
          :images="sampleImages"
          :options="responsiveOptions"
          :columns="6"
          gap="12px"
          aspect-ratio="16/9"
          @ready="onResponsiveReady"
        />
      </div>
    </section>

    <!-- Programmatic Control -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Programmatic Control</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4 flex flex-wrap gap-2">
          <button
            v-for="action in programmaticActions"
            :key="action.name"
            @click="action.handler"
            :class="action.class"
            class="px-4 py-2 rounded transition-colors"
          >
            {{ action.name }}
          </button>
        </div>
        <div ref="programmaticContainer" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            v-for="(image, index) in sampleImages.slice(0, 8)"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            :data-source="image.src"
            class="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </div>
    </section>

    <!-- Event Handling -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Event Handling</h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <Viewer
          :options="eventOptions"
          @ready="onEventReady"
          @show="onEventShow"
          @shown="onEventShown"
          @hide="onEventHide"
          @hidden="onEventHidden"
          @view="onEventView"
          @viewed="onEventViewed"
          @zoom="onEventZoom"
          @rotate="onEventRotate"
          @play="onEventPlay"
          @stop="onEventStop"
        >
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img
              v-for="(image, index) in sampleImages.slice(0, 6)"
              :key="index"
              :src="image.src"
              :alt="image.alt"
              :data-source="image.src"
              class="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </Viewer>
        <div class="mt-4">
          <h3 class="text-lg font-medium mb-2">Event Log:</h3>
          <div class="bg-gray-100 p-4 rounded max-h-40 overflow-y-auto">
            <div
              v-for="(event, index) in eventLog"
              :key="index"
              class="text-sm mb-1"
            >
              <span class="font-mono text-blue-600">{{ event.timestamp }}</span>
              <span class="ml-2">{{ event.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ViewerOptions } from 'viewerjs'

// Sample images
const sampleImages = [
  { src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
  { src: 'https://picsum.photos/800/600?random=3', alt: 'Image 3' },
  { src: 'https://picsum.photos/800/600?random=4', alt: 'Image 4' },
  { src: 'https://picsum.photos/800/600?random=5', alt: 'Image 5' },
  { src: 'https://picsum.photos/800/600?random=6', alt: 'Image 6' },
  { src: 'https://picsum.photos/800/600?random=7', alt: 'Image 7' },
  { src: 'https://picsum.photos/800/600?random=8', alt: 'Image 8' },
  { src: 'https://picsum.photos/800/600?random=9', alt: 'Image 9' },
  { src: 'https://picsum.photos/800/600?random=10', alt: 'Image 10' },
  { src: 'https://picsum.photos/800/600?random=11', alt: 'Image 11' },
  { src: 'https://picsum.photos/800/600?random=12', alt: 'Image 12' }
]

// Viewer options
const inlineOptions: ViewerOptions = {
  inline: true,
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
  backdrop: false,
  interval: 0,
  minZoomRatio: 0.1,
  maxZoomRatio: 10,
  zIndex: 2015,
  zIndexInline: 2015,
  url: 'data-source'
}

const minimalOptions: ViewerOptions = {
  inline: false,
  button: true,
  navbar: false,
  title: false,
  toolbar: false,
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: false,
  scalable: false,
  transition: true,
  fullscreen: false,
  keyboard: true,
  focus: true,
  loading: true,
  loop: false,
  backdrop: true,
  interval: 0,
  minZoomRatio: 0.1,
  maxZoomRatio: 5,
  zIndex: 2015,
  zIndexInline: 2015,
  url: 'data-source'
}

const slideshowOptions: ViewerOptions = {
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
  interval: 3000,
  minZoomRatio: 0.1,
  maxZoomRatio: 10,
  zIndex: 2015,
  zIndexInline: 2015,
  url: 'data-source'
}

const customOptions: ViewerOptions = {
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
  interval: 0,
  minZoomRatio: 0.1,
  maxZoomRatio: 10,
  zIndex: 2015,
  zIndexInline: 2015,
  url: 'data-source'
}

const responsiveOptions: ViewerOptions = {
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
  interval: 0,
  minZoomRatio: 0.1,
  maxZoomRatio: 10,
  zIndex: 2015,
  zIndexInline: 2015,
  url: 'data-source'
}

const eventOptions: ViewerOptions = {
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

// Event log
const eventLog = ref<Array<{ timestamp: string; message: string }>>([])

const addEventLog = (message: string) => {
  eventLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    message
  })
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20)
  }
}

// Viewer instances
const inlineViewer = ref<any>()
const minimalViewer = ref<any>()
const slideshowViewer = ref<any>()
const customViewer = ref<any>()
const responsiveViewer = ref<any>()
const eventViewer = ref<any>()

// Programmatic control
const programmaticContainer = ref<HTMLElement>()
const { init, show, hide, view, prev, next, zoom, rotate, reset, update } = useViewer({
  autoInit: false,
  autoDestroy: true
})

const programmaticActions = computed(() => [
  {
    name: 'Show',
    class: 'bg-blue-500 text-white hover:bg-blue-600',
    handler: () => {
      show()
      addEventLog('Programmatic: Show viewer')
    }
  },
  {
    name: 'Hide',
    class: 'bg-gray-500 text-white hover:bg-gray-600',
    handler: () => {
      hide()
      addEventLog('Programmatic: Hide viewer')
    }
  },
  {
    name: 'View 1st',
    class: 'bg-green-500 text-white hover:bg-green-600',
    handler: () => {
      view(0)
      addEventLog('Programmatic: View first image')
    }
  },
  {
    name: 'View 4th',
    class: 'bg-green-500 text-white hover:bg-green-600',
    handler: () => {
      view(3)
      addEventLog('Programmatic: View 4th image')
    }
  },
  {
    name: 'Previous',
    class: 'bg-yellow-500 text-white hover:bg-yellow-600',
    handler: () => {
      prev()
      addEventLog('Programmatic: Previous image')
    }
  },
  {
    name: 'Next',
    class: 'bg-yellow-500 text-white hover:bg-yellow-600',
    handler: () => {
      next()
      addEventLog('Programmatic: Next image')
    }
  },
  {
    name: 'Zoom 2x',
    class: 'bg-purple-500 text-white hover:bg-purple-600',
    handler: () => {
      zoom(2)
      addEventLog('Programmatic: Zoom 2x')
    }
  },
  {
    name: 'Rotate 90°',
    class: 'bg-indigo-500 text-white hover:bg-indigo-600',
    handler: () => {
      rotate(90)
      addEventLog('Programmatic: Rotate 90°')
    }
  },
  {
    name: 'Reset',
    class: 'bg-red-500 text-white hover:bg-red-600',
    handler: () => {
      reset()
      addEventLog('Programmatic: Reset image')
    }
  }
])

// Event handlers
const onInlineReady = (viewer: any) => {
  inlineViewer.value = viewer
  addEventLog('Inline viewer ready')
}

const onMinimalReady = (viewer: any) => {
  minimalViewer.value = viewer
  addEventLog('Minimal viewer ready')
}

const onSlideshowReady = (viewer: any) => {
  slideshowViewer.value = viewer
  addEventLog('Slideshow viewer ready')
}

const onCustomReady = (viewer: any) => {
  customViewer.value = viewer
  addEventLog('Custom viewer ready')
}

const onResponsiveReady = (viewer: any) => {
  responsiveViewer.value = viewer
  addEventLog('Responsive viewer ready')
}

const onEventReady = (viewer: any) => {
  eventViewer.value = viewer
  addEventLog('Event viewer ready')
}

const startSlideshow = () => {
  if (slideshowViewer.value) {
    slideshowViewer.value.play()
    addEventLog('Slideshow started')
  }
}

const stopSlideshow = () => {
  if (slideshowViewer.value) {
    slideshowViewer.value.stop()
    addEventLog('Slideshow stopped')
  }
}

// Event handlers for event demo
const onEventShow = (event: any) => {
  addEventLog('Event: show')
}

const onEventShown = (event: any) => {
  addEventLog('Event: shown')
}

const onEventHide = (event: any) => {
  addEventLog('Event: hide')
}

const onEventHidden = (event: any) => {
  addEventLog('Event: hidden')
}

const onEventView = (event: any) => {
  addEventLog(`Event: view (index: ${event.detail.index})`)
}

const onEventViewed = (event: any) => {
  addEventLog(`Event: viewed (index: ${event.detail.index})`)
}

const onEventZoom = (event: any) => {
  addEventLog(`Event: zoom (ratio: ${event.detail.ratio})`)
}

const onEventRotate = (event: any) => {
  addEventLog(`Event: rotate (degree: ${event.detail.degree})`)
}

const onEventPlay = (event: any) => {
  addEventLog('Event: play')
}

const onEventStop = (event: any) => {
  addEventLog('Event: stop')
}

// Initialize programmatic viewer on mount
onMounted(() => {
  if (programmaticContainer.value) {
    init(programmaticContainer.value, {
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
      interval: 0,
      minZoomRatio: 0.1,
      maxZoomRatio: 10,
      zIndex: 2015,
      zIndexInline: 2015,
      url: 'data-source'
    })
    addEventLog('Programmatic viewer initialized')
  }
})

// Page meta
useHead({
  title: 'ViewerJS Examples - Nuxt ViewerJS Module',
  meta: [
    { name: 'description', content: 'Various usage examples and configurations for the Nuxt ViewerJS module' }
  ]
})
</script>

<style scoped>
/* Custom gallery styles */
.custom-gallery {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.custom-image {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-image:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .custom-gallery {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
}

@media (max-width: 480px) {
  .custom-gallery {
    grid-template-columns: 1fr !important;
  }
}

/* Utility classes */
.container {
  max-width: 1200px;
}

.grid {
  display: grid;
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

.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.gap-4 {
  gap: 1rem;
}

.gap-2 {
  gap: 0.5rem;
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

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
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

.bg-green-500 {
  background-color: rgb(34 197 94);
}

.bg-red-500 {
  background-color: rgb(239 68 68);
}

.bg-gray-500 {
  background-color: rgb(107 114 128);
}

.bg-yellow-500 {
  background-color: rgb(234 179 8);
}

.bg-purple-500 {
  background-color: rgb(168 85 247);
}

.bg-indigo-500 {
  background-color: rgb(99 102 241);
}

.hover\:bg-blue-600:hover {
  background-color: rgb(37 99 235);
}

.hover\:bg-green-600:hover {
  background-color: rgb(22 163 74);
}

.hover\:bg-red-600:hover {
  background-color: rgb(220 38 38);
}

.hover\:bg-gray-600:hover {
  background-color: rgb(75 85 99);
}

.hover\:bg-yellow-600:hover {
  background-color: rgb(202 138 4);
}

.hover\:bg-purple-600:hover {
  background-color: rgb(147 51 234);
}

.hover\:bg-indigo-600:hover {
  background-color: rgb(79 70 229);
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

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
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

.h-auto {
  height: auto;
}

.max-w-full {
  max-width: 100%;
}

.max-h-40 {
  max-height: 10rem;
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

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.border {
  border-width: 1px;
}

.border-2 {
  border-width: 2px;
}

.border-solid {
  border-style: solid;
}

.border-gray-200 {
  border-color: rgb(229 231 235);
}

.border-gray-300 {
  border-color: rgb(209 213 219);
}

.border-gray-400 {
  border-color: rgb(156 163 175);
}

.border-gray-500 {
  border-color: rgb(107 114 128);
}

.border-gray-600 {
  border-color: rgb(75 85 99);
}

.border-gray-700 {
  border-color: rgb(55 65 81);
}

.border-gray-800 {
  border-color: rgb(31 41 55);
}

.border-gray-900 {
  border-color: rgb(17 24 39);
}

.border-blue-500 {
  border-color: rgb(59 130 246);
}

.border-blue-600 {
  border-color: rgb(37 99 235);
}

.border-blue-700 {
  border-color: rgb(29 78 216);
}

.border-blue-800 {
  border-color: rgb(30 64 175);
}

.border-blue-900 {
  border-color: rgb(30 58 138);
}

.border-green-500 {
  border-color: rgb(34 197 94);
}

.border-green-600 {
  border-color: rgb(22 163 74);
}

.border-green-700 {
  border-color: rgb(21 128 61);
}

.border-green-800 {
  border-color: rgb(22 101 52);
}

.border-green-900 {
  border-color: rgb(20 83 45);
}

.border-red-500 {
  border-color: rgb(239 68 68);
}

.border-red-600 {
  border-color: rgb(220 38 38);
}

.border-red-700 {
  border-color: rgb(185 28 28);
}

.border-red-800 {
  border-color: rgb(153 27 27);
}

.border-red-900 {
  border-color: rgb(127 29 29);
}

.border-yellow-500 {
  border-color: rgb(234 179 8);
}

.border-yellow-600 {
  border-color: rgb(202 138 4);
}

.border-yellow-700 {
  border-color: rgb(161 98 7);
}

.border-yellow-800 {
  border-color: rgb(133 77 14);
}

.border-yellow-900 {
  border-color: rgb(113 63 18);
}

.border-purple-500 {
  border-color: rgb(168 85 247);
}

.border-purple-600 {
  border-color: rgb(147 51 234);
}

.border-purple-700 {
  border-color: rgb(126 34 206);
}

.border-purple-800 {
  border-color: rgb(107 33 168);
}

.border-purple-900 {
  border-color: rgb(88 28 135);
}

.border-indigo-500 {
  border-color: rgb(99 102 241);
}

.border-indigo-600 {
  border-color: rgb(79 70 229);
}

.border-indigo-700 {
  border-color: rgb(67 56 202);
}

.border-indigo-800 {
  border-color: rgb(55 48 163);
}

.border-indigo-900 {
  border-color: rgb(49 46 129);
}

.border-gray-200 {
  border-color: rgb(229 231 235);
}

.border-gray-300 {
  border-color: rgb(209 213 219);
}

.border-gray-400 {
  border-color: rgb(156 163 175);
}

.border-gray-500 {
  border-color: rgb(107 114 128);
}

.border-gray-600 {
  border-color: rgb(75 85 99);
}

.border-gray-700 {
  border-color: rgb(55 65 81);
}

.border-gray-800 {
  border-color: rgb(31 41 55);
}

.border-gray-900 {
  border-color: rgb(17 24 39);
}

.border-blue-500 {
  border-color: rgb(59 130 246);
}

.border-blue-600 {
  border-color: rgb(37 99 235);
}

.border-blue-700 {
  border-color: rgb(29 78 216);
}

.border-blue-800 {
  border-color: rgb(30 64 175);
}

.border-blue-900 {
  border-color: rgb(30 58 138);
}

.border-green-500 {
  border-color: rgb(34 197 94);
}

.border-green-600 {
  border-color: rgb(22 163 74);
}

.border-green-700 {
  border-color: rgb(21 128 61);
}

.border-green-800 {
  border-color: rgb(22 101 52);
}

.border-green-900 {
  border-color: rgb(20 83 45);
}

.border-red-500 {
  border-color: rgb(239 68 68);
}

.border-red-600 {
  border-color: rgb(220 38 38);
}

.border-red-700 {
  border-color: rgb(185 28 28);
}

.border-red-800 {
  border-color: rgb(153 27 27);
}

.border-red-900 {
  border-color: rgb(127 29 29);
}

.border-yellow-500 {
  border-color: rgb(234 179 8);
}

.border-yellow-600 {
  border-color: rgb(202 138 4);
}

.border-yellow-700 {
  border-color: rgb(161 98 7);
}

.border-yellow-800 {
  border-color: rgb(133 77 14);
}

.border-yellow-900 {
  border-color: rgb(113 63 18);
}

.border-purple-500 {
  border-color: rgb(168 85 247);
}

.border-purple-600 {
  border-color: rgb(147 51 234);
}

.border-purple-700 {
  border-color: rgb(126 34 206);
}

.border-purple-800 {
  border-color: rgb(107 33 168);
}

.border-purple-900 {
  border-color: rgb(88 28 135);
}

.border-indigo-500 {
  border-color: rgb(99 102 241);
}

.border-indigo-600 {
  border-color: rgb(79 70 229);
}

.border-indigo-700 {
  border-color: rgb(67 56 202);
}

.border-indigo-800 {
  border-color: rgb(55 48 163);
}

.border-indigo-900 {
  border-color: rgb(49 46 129);
}
</style>