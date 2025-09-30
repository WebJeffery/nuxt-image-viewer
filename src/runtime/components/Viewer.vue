<template>
  <div ref="containerRef" class="viewer-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ViewerOptions } from 'viewerjs'

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

const props = withDefaults(defineProps<ViewerProps>(), {
  options: () => ({}),
  autoInit: true,
  autoDestroy: true
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

const containerRef = ref<HTMLElement>()
const { init, destroy, viewer } = useViewer({
  autoInit: false,
  autoDestroy: props.autoDestroy
})

// Initialize viewer when container is ready
onMounted(() => {
  if (props.autoInit && containerRef.value) {
    const viewerInstance = init(containerRef.value, props.options)
    
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
  init: (options?: ViewerOptions) => init(containerRef.value!, options),
  destroy,
  show: () => viewer.value?.show(),
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
.viewer-container {
  display: contents;
}
</style>