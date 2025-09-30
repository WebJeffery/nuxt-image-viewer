# @nuxtjs/viewer

[![npm version](https://badge.fury.io/js/@nuxtjs%2Fviewer.svg)](https://badge.fury.io/js/@nuxtjs%2Fviewer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful Nuxt module for ViewerJS - A JavaScript image viewer that provides a beautiful and responsive way to view images in your Nuxt 3/4 applications.

## Features

- 🖼️ **Image Viewer**: Full-featured image viewer with zoom, rotate, scale, and move capabilities
- 🎨 **Gallery Support**: Create beautiful image galleries with grid layouts
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🎛️ **Customizable**: Extensive configuration options
- 🧩 **Vue Components**: Ready-to-use Vue components
- 🎯 **Composable**: Use the `useViewer` composable for programmatic control
- 📦 **TypeScript**: Full TypeScript support
- 🚀 **Nuxt 3/4**: Compatible with Nuxt 3 and Nuxt 4

## Installation

```bash
npm install @nuxtjs/viewer viewerjs
# or
yarn add @nuxtjs/viewer viewerjs
# or
pnpm add @nuxtjs/viewer viewerjs
```

## Quick Start

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/viewer'
  ]
})
```

## Usage

### Basic Viewer Component

```vue
<template>
  <Viewer :options="viewerOptions">
    <div class="grid grid-cols-4 gap-4">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        :data-source="image.src"
        class="w-full h-32 object-cover rounded cursor-pointer"
      />
    </div>
  </Viewer>
</template>

<script setup>
const images = [
  { src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
  { src: 'https://picsum.photos/800/600?random=3', alt: 'Image 3' },
  { src: 'https://picsum.photos/800/600?random=4', alt: 'Image 4' }
]

const viewerOptions = {
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
</script>
```

### ViewerImage Component

```vue
<template>
  <ViewerImage
    src="https://picsum.photos/800/600?random=1"
    alt="Sample Image"
    :options="imageOptions"
    class="w-full h-48 object-cover rounded-lg"
  />
</template>

<script setup>
const imageOptions = {
  title: false,
  toolbar: false
}
</script>
```

### ViewerGallery Component

```vue
<template>
  <ViewerGallery
    :images="images"
    :options="galleryOptions"
    :columns="4"
    gap="12px"
    aspect-ratio="16/9"
  />
</template>

<script setup>
const images = [
  { src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
  { src: 'https://picsum.photos/800/600?random=3', alt: 'Image 3' },
  { src: 'https://picsum.photos/800/600?random=4', alt: 'Image 4' }
]

const galleryOptions = {
  interval: 3000
}
</script>
```

### Using the Composable

```vue
<template>
  <div>
    <button @click="showViewer">Show Viewer</button>
    <button @click="hideViewer">Hide Viewer</button>
    <button @click="viewNext">Next Image</button>
    
    <div ref="container" class="grid grid-cols-2 gap-4">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        :data-source="image.src"
        class="w-full h-32 object-cover rounded"
      />
    </div>
  </div>
</template>

<script setup>
const container = ref()
const { init, show, hide, next } = useViewer({
  autoInit: false,
  autoDestroy: true
})

const images = [
  { src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' }
]

const showViewer = () => {
  if (container.value) {
    init(container.value, {
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
    show()
  }
}

const hideViewer = () => hide()
const viewNext = () => next()

onMounted(() => {
  if (container.value) {
    init(container.value, {
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
  }
})
</script>
```

## Configuration

### Module Options

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/viewer'],
  viewer: {
    // Default ViewerJS options
    defaultOptions: {
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
    },
    
    // Auto-import ViewerJS components
    autoImport: true,
    
    // Global CSS for ViewerJS
    globalCSS: true
  }
})
```

### ViewerJS Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `inline` | boolean | `false` | Enable inline mode |
| `button` | boolean | `true` | Show the close button |
| `navbar` | boolean | `true` | Show the navbar |
| `title` | boolean | `true` | Show the title |
| `toolbar` | boolean | `true` | Show the toolbar |
| `tooltip` | boolean | `true` | Show the tooltip |
| `movable` | boolean | `true` | Enable to move the image |
| `zoomable` | boolean | `true` | Enable to zoom the image |
| `rotatable` | boolean | `true` | Enable to rotate the image |
| `scalable` | boolean | `true` | Enable to scale the image |
| `transition` | boolean | `true` | Enable CSS3 transition |
| `fullscreen` | boolean | `true` | Enable to request fullscreen |
| `keyboard` | boolean | `true` | Enable keyboard support |
| `focus` | boolean | `true` | Focus the viewer when init |
| `loading` | boolean | `true` | Show the loading spinner |
| `loop` | boolean | `true` | Enable to loop the images |
| `backdrop` | boolean | `true` | Enable backdrop |
| `interval` | number | `5000` | The interval of image switching (ms) |
| `minZoomRatio` | number | `0.1` | The minimum ratio of the image zoom |
| `maxZoomRatio` | number | `10` | The maximum ratio of the image zoom |
| `zIndex` | number | `2015` | The z-index of the viewer |
| `zIndexInline` | number | `2015` | The z-index of the viewer in inline mode |
| `url` | string | `'src'` | The attribute name of the image URL |

## Components

### Viewer

The main viewer component that wraps a container of images.

**Props:**
- `options` - ViewerJS options
- `autoInit` - Auto initialize on mount (default: `true`)
- `autoDestroy` - Auto destroy on unmount (default: `true`)

**Events:**
- `ready` - Fired when viewer is ready
- `show` - Fired when viewer is shown
- `shown` - Fired when viewer is shown (after transition)
- `hide` - Fired when viewer is hidden
- `hidden` - Fired when viewer is hidden (after transition)
- `view` - Fired when viewing an image
- `viewed` - Fired when an image is viewed (after transition)
- `zoom` - Fired when zooming
- `zoomed` - Fired when zoomed (after transition)
- `rotate` - Fired when rotating
- `rotated` - Fired when rotated (after transition)
- `scale` - Fired when scaling
- `scaled` - Fired when scaled (after transition)
- `move` - Fired when moving
- `moved` - Fired when moved (after transition)
- `rotateLeft` - Fired when rotating left
- `rotateRight` - Fired when rotating right
- `flipHorizontal` - Fired when flipping horizontally
- `flipVertical` - Fired when flipping vertically
- `reset` - Fired when resetting
- `update` - Fired when updating
- `play` - Fired when playing slideshow
- `stop` - Fired when stopping slideshow
- `fullscreen` - Fired when entering fullscreen
- `exit` - Fired when exiting fullscreen
- `tooltip` - Fired when showing tooltip
- `tooltipHide` - Fired when hiding tooltip
- `tooltipShow` - Fired when showing tooltip
- `load` - Fired when loading image
- `loaded` - Fired when image is loaded
- `error` - Fired when image loading error

### ViewerImage

A single image component that opens in viewer on click.

**Props:**
- `src` - Image source URL
- `alt` - Image alt text
- `imageClass` - Image class
- `imageStyle` - Image style
- `options` - ViewerJS options for this image
- `clickToView` - Whether to show in viewer on click (default: `true`)
- `onClick` - Custom click handler

**Events:**
- `click` - Fired when image is clicked
- `load` - Fired when image is loaded
- `error` - Fired when image loading error
- `view` - Fired when viewer is opened

### ViewerGallery

A gallery component with grid layout.

**Props:**
- `images` - Array of image objects
- `options` - ViewerJS options
- `autoInit` - Auto initialize on mount (default: `true`)
- `autoDestroy` - Auto destroy on unmount (default: `true`)
- `galleryClass` - Gallery layout class
- `galleryStyle` - Gallery layout style
- `imageClass` - Image item class
- `imageStyle` - Image item style
- `columns` - Number of columns for grid layout (default: `4`)
- `gap` - Gap between images (default: `'8px'`)
- `aspectRatio` - Image aspect ratio (default: `'16/9'`)

**Events:**
- Same as Viewer component

## Composable

### useViewer

A composable for programmatic control of the viewer.

**Options:**
- `autoInit` - Auto initialize viewer on mount (default: `true`)
- `autoDestroy` - Auto destroy viewer on unmount (default: `true`)
- Plus all ViewerJS options

**Returns:**
- `viewer` - Reactive viewer instance
- `init` - Initialize viewer
- `destroy` - Destroy viewer
- `show` - Show viewer
- `hide` - Hide viewer
- `view` - View specific image
- `prev` - Previous image
- `next` - Next image
- `zoom` - Zoom in/out
- `rotate` - Rotate image
- `scale` - Scale image
- `move` - Move image
- `reset` - Reset image
- `update` - Update viewer options
- `getOptions` - Get viewer options
- `getCurrentIndex` - Get current image index
- `getTotalImages` - Get total images count

## Examples

Check out the [examples page](./pages/examples.vue) for more usage examples including:

- Inline viewer
- Minimal viewer
- Slideshow gallery
- Custom styled gallery
- Responsive gallery
- Programmatic control
- Event handling

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run typecheck
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ViewerJS](https://github.com/fengyuanchen/viewerjs) - The amazing image viewer library
- [Nuxt](https://nuxt.com/) - The intuitive Vue framework
- [Vue](https://vuejs.org/) - The progressive JavaScript framework