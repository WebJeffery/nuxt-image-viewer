<template>
  <div
    v-if="images.length > 0"
    ref="galleryRef"
    :class="['viewer-gallery', galleryClass]"
    :style="gridStyle"
  >
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image.src"
      :alt="image.alt || ''"
      :title="image.title || image.alt || ''"
      :data-source="image.src"
      :class="['gallery-image', imageClass]"
      :style="imageItemStyle"
      @click="() => viewer?.view(index)"
    />
  </div>
  <div
    v-else
    ref="galleryRef"
    :class="['viewer-gallery', galleryClass]"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ViewerOptions } from 'viewerjs'

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

const props = withDefaults(defineProps<ViewerGalleryProps>(), {
  images: () => [],
  options: () => ({}),
  autoInit: true,
  autoDestroy: true,
  galleryClass: '',
  galleryStyle: '',
  imageClass: '',
  imageStyle: '',
  columns: 4,
  gap: '8px',
  aspectRatio: '16/9'
})

const emit = defineEmits<{
  ready: [viewer: any]
  show: [event: any]
  shown: [event: any]
  hide: [event: any]
  hidden: [event: any]
  view: [event: any]
  viewed: [event: any]
  zoom: [event: any]
  zoomed: [event: any]
  rotate: [event: any]
  rotated: [event: any]
  scale: [event: any]
  scaled: [event: any]
  move: [event: any]
  moved: [event: any]
  rotateLeft: [event: any]
  rotateRight: [event: any]
  flipHorizontal: [event: any]
  flipVertical: [event: any]
  reset: [event: any]
  update: [event: any]
  play: [event: any]
  stop: [event: any]
  fullscreen: [event: any]
  exit: [event: any]
  tooltip: [event: any]
  tooltipHide: [event: any]
  tooltipShow: [event: any]
  load: [event: any]
  loaded: [event: any]
  error: [event: any]
}>()

const galleryRef = ref<HTMLElement>()
const { init, destroy, viewer } = useViewer({
  autoInit: false,
  autoDestroy: props.autoDestroy
})

// Computed styles for grid layout
const gridStyle = computed(() => {
  const baseStyle = typeof props.galleryStyle === 'string' 
    ? props.galleryStyle 
    : { ...props.galleryStyle }
  
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gap: props.gap,
    ...baseStyle
  }
})

const imageItemStyle = computed(() => {
  const baseStyle = typeof props.imageStyle === 'string' 
    ? props.imageStyle 
    : { ...props.imageStyle }
  
  return {
    aspectRatio: props.aspectRatio,
    overflow: 'hidden',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ...baseStyle
  }
})

// Initialize viewer when gallery is ready
onMounted(() => {
  if (props.autoInit && galleryRef.value) {
    const viewerInstance = init(galleryRef.value, {
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
      url: 'data-source',
      ...props.options
    })
    
    if (viewerInstance) {
      // Bind events
      const events = [
        'show', 'shown', 'hide', 'hidden', 'view', 'viewed',
        'zoom', 'zoomed', 'rotate', 'rotated', 'scale', 'scaled',
        'move', 'moved', 'rotateLeft', 'rotateRight', 'flipHorizontal',
        'flipVertical', 'reset', 'update', 'play', 'stop',
        'fullscreen', 'exit', 'tooltip', 'tooltipHide', 'tooltipShow',
        'load', 'loaded', 'error'
      ]
      
      events.forEach(event => {
        viewerInstance.on(event, (e: any) => {
          emit(event as any, e)
        })
      })
      
      emit('ready', viewerInstance)
    }
  }
})

// Watch for options changes
watch(() => props.options, (newOptions) => {
  if (viewer.value) {
    viewer.value.update(newOptions)
  }
}, { deep: true })

// Expose viewer instance
defineExpose({
  viewer: readonly(viewer),
  init: (options?: ViewerOptions) => init(galleryRef.value!, options),
  destroy,
  show: (index?: number) => {
    if (viewer.value) {
      if (typeof index === 'number') {
        viewer.value.view(index)
      } else {
        viewer.value.show()
      }
    }
  },
  hide: () => viewer.value?.hide(),
  view: (index: number) => viewer.value?.view(index),
  prev: () => viewer.value?.prev(),
  next: () => viewer.value?.next(),
  zoom: (ratio: number) => viewer.value?.zoom(ratio),
  rotate: (degree: number) => viewer.value?.rotate(degree),
  scale: (scaleX: number, scaleY?: number) => viewer.value?.scale(scaleX, scaleY),
  move: (x: number, y: number) => viewer.value?.move(x, y),
  reset: () => viewer.value?.reset(),
  update: (options: ViewerOptions) => viewer.value?.update(options),
  getOptions: () => viewer.value?.options || {},
  getCurrentIndex: () => viewer.value?.index || -1,
  getTotalImages: () => viewer.value?.length || 0
})
</script>


<style scoped>
.viewer-gallery {
  width: 100%;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .viewer-gallery {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 4px !important;
  }
}

@media (max-width: 480px) {
  .viewer-gallery {
    grid-template-columns: 1fr !important;
  }
}
</style>