// ===== VEO3 GALLERY SYSTEM =====

// Gallery state
const GalleryState = {
    items: [],
    filteredItems: [],
    currentFilter: 'all',
    currentPage: 1,
    itemsPerPage: 12,
    isLoading: false,
    selectedItems: [],
    viewMode: 'grid', // grid, list, masonry
    sortBy: 'date', // date, popularity, title
    sortOrder: 'desc' // asc, desc
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    console.log('🖼️ Inicializando Galeria VEO3...');
    
    setupGalleryControls();
    setupGalleryFilters();
    setupGallerySearch();
    setupGalleryModal();
    loadGalleryData();
    
    console.log('✅ Galeria VEO3 inicializada');
}

// ===== GALLERY DATA =====
function loadGalleryData() {
    // Mock gallery data - in production, this would come from API
    const mockItems = [
        {
            id: 1,
            title: 'Executiva Confiante',
            prompt: 'Uma executiva confiante em um escritório moderno, luz natural, fotografia profissional, alta qualidade',
            category: 'business',
            tags: ['executiva', 'escritório', 'profissional', 'negócios'],
            date: '2024-01-15T10:30:00Z',
            author: 'Maria Silva',
            likes: 142,
            downloads: 89,
            views: 1250,
            image: 'https://via.placeholder.com/400x300/2563EB/FFFFFF?text=Executiva+Confiante',
            thumbnail: 'https://via.placeholder.com/200x150/2563EB/FFFFFF?text=Executiva',
            dimensions: { width: 1920, height: 1080 },
            fileSize: '2.4 MB',
            style: 'professional',
            featured: true
        },
        {
            id: 2,
            title: 'Produto Elegante',
            prompt: 'Produto tecnológico elegante em fundo minimalista branco, fotografia comercial de alta qualidade',
            category: 'product',
            tags: ['produto', 'tecnologia', 'minimalista', 'comercial'],
            date: '2024-01-14T15:45:00Z',
            author: 'João Santos',
            likes: 98,
            downloads: 156,
            views: 890,
            image: 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Produto+Elegante',
            thumbnail: 'https://via.placeholder.com/200x150/7C3AED/FFFFFF?text=Produto',
            dimensions: { width: 1600, height: 1200 },
            fileSize: '1.8 MB',
            style: 'product',
            featured: false
        },
        {
            id: 3,
            title: 'Equipe Colaborativa',
            prompt: 'Equipe diversa colaborando em escritório moderno, ambiente dinâmico e inspirador',
            category: 'people',
            tags: ['equipe', 'colaboração', 'diversidade', 'escritório'],
            date: '2024-01-13T09:20:00Z',
            author: 'Ana Costa',
            likes: 203,
            downloads: 67,
            views: 1580,
            image: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Equipe+Colaborativa',
            thumbnail: 'https://via.placeholder.com/200x150/10B981/FFFFFF?text=Equipe',
            dimensions: { width: 1920, height: 1080 },
            fileSize: '3.1 MB',
            style: 'creative',
            featured: true
        },
        {
            id: 4,
            title: 'Lifestyle Moderno',
            prompt: 'Pessoa jovem em ambiente urbano moderno, estilo de vida contemporâneo, cores vibrantes',
            category: 'lifestyle',
            tags: ['lifestyle', 'urbano', 'jovem', 'moderno'],
            date: '2024-01-12T14:10:00Z',
            author: 'Carlos Lima',
            likes: 76,
            downloads: 34,
            views: 620,
            image: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Lifestyle+Moderno',
            thumbnail: 'https://via.placeholder.com/200x150/F59E0B/FFFFFF?text=Lifestyle',
            dimensions: { width: 1080, height: 1920 },
            fileSize: '2.7 MB',
            style: 'lifestyle',
            featured: false
        },
        {
            id: 5,
            title: 'Arquitetura Futurista',
            prompt: 'Edifício futurista com design inovador, iluminação noturna, arquitetura contemporânea',
            category: 'business',
            tags: ['arquitetura', 'futurista', 'edifício', 'noturno'],
            date: '2024-01-11T18:30:00Z',
            author: 'Fernanda Rocha',
            likes: 187,
            downloads: 112,
            views: 1340,
            image: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Arquitetura+Futurista',
            thumbnail: 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Arquitetura',
            dimensions: { width: 1920, height: 1080 },
            fileSize: '4.2 MB',
            style: 'creative',
            featured: true
        },
        {
            id: 6,
            title: 'Chef Profissional',
            prompt: 'Chef profissional preparando prato gourmet em cozinha moderna, iluminação dramática',
            category: 'people',
            tags: ['chef', 'cozinha', 'gourmet', 'profissional'],
            date: '2024-01-10T12:15:00Z',
            author: 'Roberto Alves',
            likes: 134,
            downloads: 78,
            views: 950,
            image: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Chef+Profissional',
            thumbnail: 'https://via.placeholder.com/200x150/EF4444/FFFFFF?text=Chef',
            dimensions: { width: 1600, height: 1200 },
            fileSize: '2.9 MB',
            style: 'professional',
            featured: false
        }
    ];
    
    GalleryState.items = mockItems;
    GalleryState.filteredItems = [...mockItems];
    
    renderGallery();
    updateGalleryStats();
}

// ===== GALLERY CONTROLS =====
function setupGalleryControls() {
    // View mode buttons
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    viewModeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            setViewMode(mode);
        });
    });
    
    // Sort controls
    const sortSelect = document.getElementById('gallerySortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const [sortBy, sortOrder] = this.value.split('-');
            setSortOptions(sortBy, sortOrder);
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreItems);
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllItems');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', toggleSelectAll);
    }
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setFilter(filter);
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupGallerySearch() {
    const searchInput = document.getElementById('gallerySearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
    
    // Advanced search toggle
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    if (advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', toggleAdvancedSearch);
    }
}

function setupGalleryModal() {
    // Modal will be created dynamically when needed
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-modal-overlay')) {
            closeGalleryModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGalleryModal();
        }
        if (e.key === 'ArrowLeft') {
            navigateModal('prev');
        }
        if (e.key === 'ArrowRight') {
            navigateModal('next');
        }
    });
}

// ===== FILTERING AND SORTING =====
function setFilter(filter) {
    GalleryState.currentFilter = filter;
    GalleryState.currentPage = 1;
    
    applyFilters();
    renderGallery();
    updateGalleryStats();
    
    console.log(`🔍 Filtro aplicado: ${filter}`);
}

function setSortOptions(sortBy, sortOrder) {
    GalleryState.sortBy = sortBy;
    GalleryState.sortOrder = sortOrder;
    
    applySorting();
    renderGallery();
    
    console.log(`📊 Ordenação: ${sortBy} ${sortOrder}`);
}

function handleSearch() {
    const searchInput = document.getElementById('gallerySearch');
    const query = searchInput?.value.trim().toLowerCase();
    
    if (!query) {
        GalleryState.filteredItems = [...GalleryState.items];
    } else {
        GalleryState.filteredItems = GalleryState.items.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.prompt.toLowerCase().includes(query) ||
                   item.tags.some(tag => tag.toLowerCase().includes(query)) ||
                   item.author.toLowerCase().includes(query);
        });
    }
    
    applyFilters();
    renderGallery();
    updateGalleryStats();
    
    console.log(`🔍 Busca: "${query}" - ${GalleryState.filteredItems.length} resultados`);
}

function applyFilters() {
    let filtered = [...GalleryState.items];
    
    // Apply search if active
    const searchInput = document.getElementById('gallerySearch');
    const query = searchInput?.value.trim().toLowerCase();
    
    if (query) {
        filtered = filtered.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.prompt.toLowerCase().includes(query) ||
                   item.tags.some(tag => tag.toLowerCase().includes(query)) ||
                   item.author.toLowerCase().includes(query);
        });
    }
    
    // Apply category filter
    if (GalleryState.currentFilter !== 'all') {
        filtered = filtered.filter(item => item.category === GalleryState.currentFilter);
    }
    
    GalleryState.filteredItems = filtered;
    applySorting();
}

function applySorting() {
    const { sortBy, sortOrder } = GalleryState;
    
    GalleryState.filteredItems.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
            case 'date':
                valueA = new Date(a.date);
                valueB = new Date(b.date);
                break;
            case 'popularity':
                valueA = a.likes + a.downloads;
                valueB = b.likes + b.downloads;
                break;
            case 'title':
                valueA = a.title.toLowerCase();
                valueB = b.title.toLowerCase();
                break;
            case 'views':
                valueA = a.views;
                valueB = b.views;
                break;
            default:
                valueA = new Date(a.date);
                valueB = new Date(b.date);
        }
        
        if (sortOrder === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
}

// ===== RENDERING =====
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const startIndex = (GalleryState.currentPage - 1) * GalleryState.itemsPerPage;
    const endIndex = startIndex + GalleryState.itemsPerPage;
    const itemsToShow = GalleryState.filteredItems.slice(0, endIndex);
    
    if (itemsToShow.length === 0) {
        renderEmptyState();
        return;
    }
    
    galleryGrid.innerHTML = itemsToShow.map(item => renderGalleryItem(item)).join('');
    
    // Update load more button
    updateLoadMoreButton();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Add intersection observer for animations
    observeGalleryItems();
}

function renderGalleryItem(item) {
    const isSelected = GalleryState.selectedItems.includes(item.id);
    const featuredBadge = item.featured ? '<div class="featured-badge">Destaque</div>' : '';
    
    return `
        <div class="gallery-item ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-category="${item.category}">
            ${featuredBadge}
            <div class="gallery-item-header">
                <input type="checkbox" class="item-checkbox" ${isSelected ? 'checked' : ''} 
                       onchange="toggleItemSelection(${item.id})">
                <div class="item-actions">
                    <button class="action-btn" onclick="likeItem(${item.id})" title="Curtir">
                        <i data-lucide="heart"></i>
                        <span>${item.likes}</span>
                    </button>
                    <button class="action-btn" onclick="downloadItem(${item.id})" title="Download">
                        <i data-lucide="download"></i>
                    </button>
                </div>
            </div>
            
            <div class="gallery-image-container" onclick="openGalleryModal(${item.id})">
                <img src="${item.thumbnail}" 
                     data-src="${item.image}" 
                     alt="${item.title}" 
                     class="gallery-image lazy-load" 
                     loading="lazy">
                <div class="image-overlay">
                    <div class="overlay-content">
                        <i data-lucide="eye"></i>
                        <span>Visualizar</span>
                    </div>
                </div>
            </div>
            
            <div class="gallery-content">
                <h3 class="gallery-title">${item.title}</h3>
                <p class="gallery-prompt">${truncateText(item.prompt, 80)}</p>
                
                <div class="gallery-tags">
                    ${item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="gallery-meta">
                    <div class="meta-row">
                        <span class="meta-author">
                            <i data-lucide="user"></i>
                            ${item.author}
                        </span>
                        <span class="meta-date">${formatRelativeDate(item.date)}</span>
                    </div>
                    
                    <div class="meta-stats">
                        <span class="stat">
                            <i data-lucide="eye"></i>
                            ${formatNumber(item.views)}
                        </span>
                        <span class="stat">
                            <i data-lucide="heart"></i>
                            ${formatNumber(item.likes)}
                        </span>
                        <span class="stat">
                            <i data-lucide="download"></i>
                            ${formatNumber(item.downloads)}
                        </span>
                    </div>
                </div>
                
                <div class="gallery-category">
                    <span class="category-badge category-${item.category}">${getCategoryName(item.category)}</span>
                    <span class="style-badge">${item.style}</span>
                </div>
            </div>
        </div>
    `;
}

function renderEmptyState() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = `
        <div class="gallery-empty-state">
            <div class="empty-icon">
                <i data-lucide="image-off"></i>
            </div>
            <h3 class="empty-title">Nenhuma imagem encontrada</h3>
            <p class="empty-description">
                Tente ajustar os filtros ou termos de busca para encontrar o que procura.
            </p>
            <div class="empty-actions">
                <button class="btn btn-primary" onclick="clearFilters()">
                    <i data-lucide="refresh-cw"></i>
                    Limpar Filtros
                </button>
                <button class="btn btn-outline" onclick="VEO3.smoothScrollTo('#generator')">
                    <i data-lucide="plus"></i>
                    Criar Nova Imagem
                </button>
            </div>
        </div>
    `;
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ===== MODAL FUNCTIONALITY =====
function openGalleryModal(itemId) {
    const item = GalleryState.items.find(i => i.id === itemId);
    if (!item) return;
    
    // Increment view count
    item.views++;
    
    const modal = createGalleryModal(item);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log(`👁️ Visualizando: ${item.title}`);
}

function createGalleryModal(item) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-overlay"></div>
        <div class="gallery-modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${item.title}</h2>
                <div class="modal-actions">
                    <button class="btn btn-outline btn-small" onclick="shareItem(${item.id})">
                        <i data-lucide="share-2"></i>
                        Compartilhar
                    </button>
                    <button class="btn btn-primary btn-small" onclick="downloadItem(${item.id})">
                        <i data-lucide="download"></i>
                        Download
                    </button>
                    <button class="modal-close" onclick="closeGalleryModal()">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="modal-image-container">
                    <img src="${item.image}" alt="${item.title}" class="modal-image">
                    <div class="image-navigation">
                        <button class="nav-btn nav-prev" onclick="navigateModal('prev')" title="Anterior">
                            <i data-lucide="chevron-left"></i>
                        </button>
                        <button class="nav-btn nav-next" onclick="navigateModal('next')" title="Próxima">
                            <i data-lucide="chevron-right"></i>
                        </button>
                    </div>
                </div>
                
                <div class="modal-sidebar">
                    <div class="item-details">
                        <div class="detail-section">
                            <h4 class="section-title">Prompt</h4>
                            <p class="prompt-text">"${item.prompt}"</p>
                            <button class="btn btn-outline btn-small" onclick="copyPrompt('${item.prompt}')">
                                <i data-lucide="copy"></i>
                                Copiar Prompt
                            </button>
                        </div>
                        
                        <div class="detail-section">
                            <h4 class="section-title">Detalhes</h4>
                            <div class="details-grid">
                                <div class="detail-item">
                                    <span class="detail-label">Dimensões</span>
                                    <span class="detail-value">${item.dimensions.width}x${item.dimensions.height}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Tamanho</span>
                                    <span class="detail-value">${item.fileSize}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Estilo</span>
                                    <span class="detail-value">${item.style}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Categoria</span>
                                    <span class="detail-value">${getCategoryName(item.category)}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Autor</span>
                                    <span class="detail-value">${item.author}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Data</span>
                                    <span class="detail-value">${formatDate(item.date)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4 class="section-title">Tags</h4>
                            <div class="tags-container">
                                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4 class="section-title">Estatísticas</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <i data-lucide="eye"></i>
                                    <span class="stat-value">${formatNumber(item.views)}</span>
                                    <span class="stat-label">Visualizações</span>
                                </div>
                                <div class="stat-item">
                                    <i data-lucide="heart"></i>
                                    <span class="stat-value">${formatNumber(item.likes)}</span>
                                    <span class="stat-label">Curtidas</span>
                                </div>
                                <div class="stat-item">
                                    <i data-lucide="download"></i>
                                    <span class="stat-value">${formatNumber(item.downloads)}</span>
                                    <span class="stat-label">Downloads</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function closeGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function navigateModal(direction) {
    const currentModal = document.querySelector('.gallery-modal');
    if (!currentModal) return;
    
    const currentTitle = currentModal.querySelector('.modal-title').textContent;
    const currentItem = GalleryState.filteredItems.find(item => item.title === currentTitle);
    if (!currentItem) return;
    
    const currentIndex = GalleryState.filteredItems.indexOf(currentItem);
    let newIndex;
    
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % GalleryState.filteredItems.length;
    } else {
        newIndex = currentIndex === 0 ? GalleryState.filteredItems.length - 1 : currentIndex - 1;
    }
    
    const newItem = GalleryState.filteredItems[newIndex];
    closeGalleryModal();
    setTimeout(() => openGalleryModal(newItem.id), 100);
}

// ===== ITEM ACTIONS =====
function toggleItemSelection(itemId) {
    const index = GalleryState.selectedItems.indexOf(itemId);
    
    if (index === -1) {
        GalleryState.selectedItems.push(itemId);
    } else {
        GalleryState.selectedItems.splice(index, 1);
    }
    
    updateSelectionUI();
    updateBulkActions();
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllItems');
    const isChecked = selectAllCheckbox?.checked;
    
    if (isChecked) {
        GalleryState.selectedItems = GalleryState.filteredItems.map(item => item.id);
    } else {
        GalleryState.selectedItems = [];
    }
    
    updateSelectionUI();
    updateBulkActions();
}

function likeItem(itemId) {
    const item = GalleryState.items.find(i => i.id === itemId);
    if (item) {
        item.likes++;
        renderGallery();
        VEO3.showNotification('Item curtido!', 'success', 1500);
    }
}

function downloadItem(itemId) {
    const item = GalleryState.items.find(i => i.id === itemId);
    if (item) {
        // Simulate download
        const link = document.createElement('a');
        link.href = item.image;
        link.download = `${item.title.replace(/\s+/g, '_').toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        item.downloads++;
        renderGallery();
        VEO3.showNotification('Download iniciado!', 'success', 2000);
    }
}

function shareItem(itemId) {
    const item = GalleryState.items.find(i => i.id === itemId);
    if (!item) return;
    
    if (navigator.share) {
        navigator.share({
            title: item.title,
            text: `Confira esta imagem: "${item.title}"`,
            url: window.location.href + `#gallery-item-${itemId}`
        });
    } else {
        // Fallback: copy link
        const url = window.location.href + `#gallery-item-${itemId}`;
        navigator.clipboard.writeText(url);
        VEO3.showNotification('Link copiado para a área de transferência!', 'success');
    }
}

function copyPrompt(prompt) {
    navigator.clipboard.writeText(prompt);
    VEO3.showNotification('Prompt copiado!', 'success', 1500);
}

// ===== UTILITY FUNCTIONS =====
function updateGalleryStats() {
    const totalItems = GalleryState.filteredItems.length;
    const statsElement = document.getElementById('galleryStats');
    
    if (statsElement) {
        statsElement.textContent = `${totalItems} ${totalItems === 1 ? 'imagem' : 'imagens'}`;
    }
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const totalItems = GalleryState.filteredItems.length;
    const shownItems = GalleryState.currentPage * GalleryState.itemsPerPage;
    
    if (shownItems >= totalItems) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.textContent = `Carregar Mais (${totalItems - shownItems} restantes)`;
    }
}

function loadMoreItems() {
    if (GalleryState.isLoading) return;
    
    GalleryState.isLoading = true;
    GalleryState.currentPage++;
    
    // Simulate loading delay
    setTimeout(() => {
        renderGallery();
        GalleryState.isLoading = false;
    }, 500);
}

function clearFilters() {
    // Reset all filters
    GalleryState.currentFilter = 'all';
    GalleryState.currentPage = 1;
    
    // Clear search
    const searchInput = document.getElementById('gallerySearch');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Reapply filters and render
    applyFilters();
    renderGallery();
    updateGalleryStats();
    
    VEO3.showNotification('Filtros limpos!', 'success', 1500);
}

function setViewMode(mode) {
    GalleryState.viewMode = mode;
    
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.className = `gallery-grid view-${mode}`;
    }
    
    // Update button states
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('active');
        }
    });
    
    console.log(`👁️ Modo de visualização: ${mode}`);
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

function observeGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        itemObserver.observe(item);
    });
}

function updateSelectionUI() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
        const itemId = parseInt(checkbox.closest('.gallery-item').dataset.id);
        checkbox.checked = GalleryState.selectedItems.includes(itemId);
        
        const galleryItem = checkbox.closest('.gallery-item');
        if (checkbox.checked) {
            galleryItem.classList.add('selected');
        } else {
            galleryItem.classList.remove('selected');
        }
    });
    
    // Update select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllItems');
    if (selectAllCheckbox) {
        const totalVisible = GalleryState.filteredItems.length;
        const selectedCount = GalleryState.selectedItems.length;
        
        selectAllCheckbox.checked = selectedCount > 0 && selectedCount === totalVisible;
        selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < totalVisible;
    }
}

function updateBulkActions() {
    const selectedCount = GalleryState.selectedItems.length;
    const bulkActions = document.getElementById('bulkActions');
    
    if (bulkActions) {
        if (selectedCount > 0) {
            bulkActions.style.display = 'flex';
            bulkActions.querySelector('.selection-count').textContent = `${selectedCount} selecionado${selectedCount > 1 ? 's' : ''}`;
        } else {
            bulkActions.style.display = 'none';
        }
    }
}

// ===== FORMATTING HELPERS =====
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'agora';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getCategoryName(category) {
    const names = {
        'business': 'Negócios',
        'product': 'Produtos',
        'people': 'Pessoas',
        'lifestyle': 'Lifestyle'
    };
    return names[category] || category;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXPORT =====
window.VEO3Gallery = {
    GalleryState,
    openGalleryModal,
    closeGalleryModal,
    setFilter,
    clearFilters,
    downloadItem,
    shareItem,
    likeItem
};

