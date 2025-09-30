// 图片画廊演示页面的交互功能
class ImageGalleryDemo {
    constructor() {
        this.currentImageIndex = 0;
        this.images = [
            { url: 'https://picsum.photos/800/500?random=1', thumb: 'https://picsum.photos/100/60?random=1', info: 'Image: 1 (800 x 500)' },
            { url: 'https://picsum.photos/800/500?random=2', thumb: 'https://picsum.photos/100/60?random=2', info: 'Image: 2 (800 x 500)' },
            { url: 'https://picsum.photos/800/500?random=3', thumb: 'https://picsum.photos/100/60?random=3', info: 'Image: 3 (800 x 500)' },
            { url: 'https://picsum.photos/800/500?random=4', thumb: 'https://picsum.photos/100/60?random=4', info: 'Image: 4 (800 x 500)' },
            { url: 'https://picsum.photos/800/500?random=5', thumb: 'https://picsum.photos/100/60?random=5', info: 'Image: 5 (800 x 500)' },
            { url: 'https://picsum.photos/800/500?random=6', thumb: 'https://picsum.photos/100/60?random=6', info: 'Image: 6 (800 x 500)' }
        ];
        
        this.options = {
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
            url: "data-source"
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateOptionsDisplay();
        this.updateThumbnails();
    }
    
    bindEvents() {
        // 选项复选框事件
        const checkboxes = document.querySelectorAll('.left-panel input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.options[e.target.id] = e.target.checked;
                this.updateOptionsDisplay();
                this.updateGalleryFeatures();
            });
        });
        
        // 工具栏按钮事件
        document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
        document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('actualSize').addEventListener('click', () => this.actualSize());
        document.getElementById('rotate').addEventListener('click', () => this.rotate());
        document.getElementById('prevImage').addEventListener('click', () => this.prevImage());
        document.getElementById('nextImage').addEventListener('click', () => this.nextImage());
        document.getElementById('playPause').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('undo').addEventListener('click', () => this.undo());
        document.getElementById('redo').addEventListener('click', () => this.redo());
        document.getElementById('info').addEventListener('click', () => this.showInfo());
        document.getElementById('fullscreen').addEventListener('click', () => this.toggleFullscreen());
        
        // 缩略图点击事件
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToImage(index));
        });
        
        // URL Array按钮事件
        document.querySelector('.url-array-btn').addEventListener('click', () => this.showUrlArray());
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (this.options.keyboard) {
                this.handleKeyboard(e);
            }
        });
    }
    
    updateOptionsDisplay() {
        const optionsJson = document.getElementById('optionsJson');
        optionsJson.textContent = JSON.stringify(this.options, null, 2);
    }
    
    updateGalleryFeatures() {
        const toolbar = document.querySelector('.toolbar');
        const thumbnails = document.querySelector('.thumbnails');
        
        // 根据选项显示/隐藏功能
        if (!this.options.toolbar) {
            toolbar.style.display = 'none';
        } else {
            toolbar.style.display = 'flex';
        }
        
        if (!this.options.navbar) {
            thumbnails.style.display = 'none';
        } else {
            thumbnails.style.display = 'flex';
        }
    }
    
    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            const img = thumb.querySelector('img');
            img.src = this.images[index].thumb;
            img.alt = `缩略图${index + 1}`;
        });
    }
    
    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentImageIndex = index;
            this.updateMainImage();
            this.updateThumbnailSelection();
        }
    }
    
    updateMainImage() {
        const mainImage = document.getElementById('mainImage');
        const imageInfo = document.querySelector('.image-info');
        
        mainImage.src = this.images[this.currentImageIndex].url;
        imageInfo.textContent = this.images[this.currentImageIndex].info;
        
        // 添加过渡效果
        if (this.options.transition) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 150);
        }
    }
    
    updateThumbnailSelection() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }
    
    // 工具栏功能实现
    zoomOut() {
        if (this.options.zoomable) {
            const mainImage = document.getElementById('mainImage');
            const currentScale = parseFloat(mainImage.style.transform.replace('scale(', '').replace(')', '')) || 1;
            const newScale = Math.max(0.5, currentScale - 0.2);
            mainImage.style.transform = `scale(${newScale})`;
            mainImage.style.transition = 'transform 0.3s ease';
        }
    }
    
    zoomIn() {
        if (this.options.zoomable) {
            const mainImage = document.getElementById('mainImage');
            const currentScale = parseFloat(mainImage.style.transform.replace('scale(', '').replace(')', '')) || 1;
            const newScale = Math.min(3, currentScale + 0.2);
            mainImage.style.transform = `scale(${newScale})`;
            mainImage.style.transition = 'transform 0.3s ease';
        }
    }
    
    actualSize() {
        if (this.options.zoomable) {
            const mainImage = document.getElementById('mainImage');
            mainImage.style.transform = 'scale(1)';
            mainImage.style.transition = 'transform 0.3s ease';
        }
    }
    
    rotate() {
        if (this.options.rotatable) {
            const mainImage = document.getElementById('mainImage');
            const currentRotation = parseFloat(mainImage.style.transform.replace(/rotate\(|\)/g, '')) || 0;
            const newRotation = currentRotation + 90;
            mainImage.style.transform = `rotate(${newRotation}deg)`;
            mainImage.style.transition = 'transform 0.3s ease';
        }
    }
    
    prevImage() {
        const newIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.images.length - 1;
        this.goToImage(newIndex);
    }
    
    nextImage() {
        const newIndex = this.currentImageIndex < this.images.length - 1 ? this.currentImageIndex + 1 : 0;
        this.goToImage(newIndex);
    }
    
    togglePlayPause() {
        const playBtn = document.getElementById('playPause');
        if (playBtn.textContent === '►') {
            playBtn.textContent = '⏸';
            this.startSlideshow();
        } else {
            playBtn.textContent = '►';
            this.stopSlideshow();
        }
    }
    
    startSlideshow() {
        this.slideshowInterval = setInterval(() => {
            this.nextImage();
        }, 3000);
    }
    
    stopSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
        }
    }
    
    undo() {
        // 简单的撤销功能演示
        console.log('撤销操作');
        this.showNotification('撤销操作');
    }
    
    redo() {
        // 简单的重做功能演示
        console.log('重做操作');
        this.showNotification('重做操作');
    }
    
    showInfo() {
        const currentImage = this.images[this.currentImageIndex];
        alert(`图片信息:\n${currentImage.info}\nURL: ${currentImage.url}`);
    }
    
    toggleFullscreen() {
        if (this.options.fullscreen) {
            const mainImageContainer = document.querySelector('.main-image-container');
            if (!document.fullscreenElement) {
                mainImageContainer.requestFullscreen().catch(err => {
                    console.log('无法进入全屏模式:', err);
                });
            } else {
                document.exitFullscreen();
            }
        }
    }
    
    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextImage();
                break;
            case ' ':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
            case '+':
            case '=':
                e.preventDefault();
                this.zoomIn();
                break;
            case '-':
                e.preventDefault();
                this.zoomOut();
                break;
        }
    }
    
    showUrlArray() {
        const urls = this.images.map(img => img.url);
        const urlText = urls.join('\n');
        
        // 创建模态框显示URL数组
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 24px;
            border-radius: 12px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        modalContent.innerHTML = `
            <h3 style="margin-bottom: 16px; color: #2c3e50;">URL Array</h3>
            <textarea readonly style="width: 100%; height: 300px; font-family: monospace; font-size: 12px; border: 1px solid #ddd; border-radius: 6px; padding: 12px;">${urlText}</textarea>
            <div style="margin-top: 16px; text-align: right;">
                <button id="closeModal" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">关闭</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 关闭模态框
        document.getElementById('closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 2000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ImageGalleryDemo();
});