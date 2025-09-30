#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Building Nuxt ViewerJS Module...')

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true })
  }

  // Build the module
  console.log('📦 Building module...')
  execSync('nuxt-module-build --stub --no-declaration', { stdio: 'inherit' })

  // Copy runtime files to dist
  console.log('📁 Copying runtime files...')
  if (fs.existsSync('src/runtime') && !fs.existsSync('dist/runtime')) {
    execSync('cp -r src/runtime dist/', { stdio: 'inherit' })
  }

  // Copy types
  console.log('📝 Copying types...')
  if (fs.existsSync('types')) {
    execSync('cp -r types dist/', { stdio: 'inherit' })
  }

  // Copy module.d.ts
  if (fs.existsSync('module.d.ts')) {
    execSync('cp module.d.ts dist/', { stdio: 'inherit' })
  }

  console.log('✅ Build completed successfully!')
  console.log('📦 Package ready for publishing')
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}