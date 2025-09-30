<template>
  <img
    ref="imageRef"
    :src="src"
    :alt="alt"
    :class="imageClass"
    :style="imageStyle"
    @click="handleClick"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import type { ViewerOptions } from 'viewerjs'

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

const props = withDefaults(defineProps<ViewerImageProps>(), {
  alt: '',
  imageClass: '',
  imageStyle: '',
  options: () => ({}),
  clickToView: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  load: [event: Event]
  error: [event: Event]
  view: [viewer: any]
}>()

const imageRef = ref<HTMLImageElement>()
const { init, show } = useViewer({
  autoInit: false,
  autoDestroy: true
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
  
  if (props.onClick) {
    props.onClick(event)
    return
  }
  
  if (props.clickToView && imageRef.value) {
    // Create a temporary container with just this image
    const container = document.createElement('div')
    container.style.display = 'none'
    document.body.appendChild(container)
    
    const img = document.createElement('img')
    img.src = props.src
    img.alt = props.alt
    container.appendChild(img)
    
    const viewer = init(container, {
      ...props.options,
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
      ready: () => {
        // Clean up temporary container after viewer is ready
        setTimeout(() => {
          if (container.parentNode) {
            container.parentNode.removeChild(container)
          }
        }, 100)
      }
    })
    
    if (viewer) {
      emit('view', viewer)
      show()
    }
  }
}

const handleLoad = (event: Event) => {
  emit('load', event)
}

const handleError = (event: Event) => {
  emit('error', event)
}

// Expose methods
defineExpose({
  imageRef: readonly(imageRef),
  show: () => {
    if (imageRef.value) {
      handleClick(new MouseEvent('click'))
    }
  }
})
</script>

<style scoped>
img {
  cursor: pointer;
  transition: opacity 0.3s ease;
}

img:hover {
  opacity: 0.8;
}
</style>