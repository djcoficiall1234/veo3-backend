// ===== VEO3 THEME SYSTEM =====

// Theme state
const ThemeState = {
    currentTheme: 'dark',
    customThemes: [],
    themeInstructions: '',
    isCustomizing: false,
    previewMode: false,
    savedThemes: []
};

// Available themes
const AVAILABLE_THEMES = {
    dark: {
        name: 'Escuro',
        description: 'Tema escuro moderno e elegante',
        colors: ['#0F0F0F', '#2563EB', '#7C3AED'],
        category: 'default'
    },
    light: {
        name: 'Claro',
        description: 'Tema claro e minimalista',
        colors: ['#FFFFFF', '#2563EB', '#7C3AED'],
        category: 'default'
    },
    corporate: {
        name: 'Corporativo',
        description: 'Profissional e confiável',
        colors: ['#F8FAFC', '#1E40AF', '#059669'],
        category: 'business'
    },
    creative: {
        name: 'Criativo',
        description: 'Vibrante e inspirador',
        colors: ['#0C0A09', '#EC4899', '#8B5CF6'],
        category: 'creative'
    },
    minimal: {
        name: 'Minimalista',
        description: 'Simples e focado',
        colors: ['#FFFFFF', '#000000', '#6B7280'],
        category: 'minimal'
    },
    ocean: {
        name: 'Oceano',
        description: 'Calmo e refrescante',
        colors: ['#0F172A', '#0EA5E9', '#06B6D4'],
        category: 'nature'
    },
    sunset: {
        name: 'Pôr do Sol',
        description: 'Quente e acolhedor',
        colors: ['#1A0B0B', '#F97316', '#EF4444'],
        category: 'warm'
    },
    forest: {
        name: 'Floresta',
        description: 'Natural e orgânico',
        colors: ['#0F1B0F', '#059669', '#65A30D'],
        category: 'nature'
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeSystem();
});

function initializeThemeSystem() {
    console.log('🎨 Inicializando Sistema de Temas VEO3...');
    
    loadSavedThemes();
    setupThemeControls();
    setupCustomThemeBuilder();
    setupThemeInstructions();
    renderThemeGallery();
    
    console.log('✅ Sistema de Temas VEO3 inicializado');
}

// ===== THEME CONTROLS =====
function setupThemeControls() {
    // Theme toggle button in navbar
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', quickToggleTheme);
    }
    
    // Theme modal trigger
    const themeModalTrigger = document.getElementById('themeModalTrigger');
    if (themeModalTrigger) {
        themeModalTrigger.addEventListener('click', openThemeCustomizer);
    }
    
    // Theme option buttons in modal
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            selectTheme(theme);
        });
    });
    
    // Auto theme detection
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);
    }
}

function setupCustomThemeBuilder() {
    // Color pickers
    const colorInputs = document.querySelectorAll('.custom-color-input');
    colorInputs.forEach(input => {
        input.addEventListener('change', updateCustomTheme);
        input.addEventListener('input', debounce(updateCustomTheme, 100));
    });
    
    // Theme name input
    const themeNameInput = document.getElementById('customThemeName');
    if (themeNameInput) {
        themeNameInput.addEventListener('input', validateThemeName);
    }
    
    // Save custom theme button
    const saveThemeBtn = document.getElementById('saveCustomTheme');
    if (saveThemeBtn) {
        saveThemeBtn.addEventListener('click', saveCustomTheme);
    }
    
    // Reset theme button
    const resetThemeBtn = document.getElementById('resetTheme');
    if (resetThemeBtn) {
        resetThemeBtn.addEventListener('click', resetToDefaultTheme);
    }
    
    // Import/Export buttons
    const exportBtn = document.getElementById('exportTheme');
    const importBtn = document.getElementById('importTheme');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCurrentTheme);
    }
    
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const fileInput = document.getElementById('themeFileInput');
            if (fileInput) fileInput.click();
        });
    }
    
    // File input for theme import
    const fileInput = document.getElementById('themeFileInput');
    if (fileInput) {
        fileInput.addEventListener('change', importThemeFile);
    }
}

function setupThemeInstructions() {
    const instructionsTextarea = document.getElementById('themeInstructions');
    if (instructionsTextarea) {
        instructionsTextarea.addEventListener('input', debounce(saveInstructionsDraft, 500));
    }
    
    // Submit instructions button
    const submitBtn = document.getElementById('submitInstructions');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitThemeInstructions);
    }
    
    // Example instructions
    const exampleBtns = document.querySelectorAll('.instruction-example');
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const example = this.getAttribute('data-example');
            useInstructionExample(example);
        });
    });
    
    // Load saved instructions
    loadInstructionsDraft();
}

// ===== THEME SELECTION =====
function selectTheme(themeName) {
    if (!AVAILABLE_THEMES[themeName]) {
        console.warn(`Tema não encontrado: ${themeName}`);
        return;
    }
    
    console.log(`🎨 Selecionando tema: ${themeName}`);
    
    // Update state
    ThemeState.currentTheme = themeName;
    
    // Apply theme to body
    applyTheme(themeName);
    
    // Update UI
    updateThemeUI(themeName);
    
    // Save preference
    saveThemePreference(themeName);
    
    // Show notification
    const theme = AVAILABLE_THEMES[themeName];
    VEO3.showNotification(`Tema "${theme.name}" aplicado!`, 'success', 2000);
}

function applyTheme(themeName) {
    const body = document.body;
    
    // Remove all theme classes
    Object.keys(AVAILABLE_THEMES).forEach(theme => {
        body.classList.remove(`theme-${theme}`);
    });
    
    // Add new theme class
    body.classList.add(`theme-${themeName}`);
    
    // Add transition class for smooth change
    body.classList.add('theme-changing');
    setTimeout(() => {
        body.classList.remove('theme-changing');
    }, 500);
    
    // Update CSS custom properties if it's a custom theme
    if (ThemeState.customThemes[themeName]) {
        applyCustomThemeColors(ThemeState.customThemes[themeName]);
    }
}

function quickToggleTheme() {
    const currentTheme = ThemeState.currentTheme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    selectTheme(newTheme);
}

function handleSystemThemeChange(e) {
    const prefersDark = e.matches;
    const autoTheme = prefersDark ? 'dark' : 'light';
    
    // Only apply if user hasn't manually selected a theme
    const hasManualSelection = localStorage.getItem('veo3-theme-manual');
    if (!hasManualSelection) {
        selectTheme(autoTheme);
    }
}

// ===== CUSTOM THEME BUILDER =====
function updateCustomTheme() {
    if (!ThemeState.isCustomizing) return;
    
    const primaryColor = document.getElementById('primaryColor')?.value;
    const secondaryColor = document.getElementById('secondaryColor')?.value;
    const backgroundColor = document.getElementById('backgroundColor')?.value;
    const textColor = document.getElementById('textColor')?.value;
    
    if (primaryColor && secondaryColor && backgroundColor && textColor) {
        const customTheme = {
            primary: primaryColor,
            secondary: secondaryColor,
            background: backgroundColor,
            text: textColor
        };
        
        applyCustomThemeColors(customTheme);
        enablePreviewMode();
    }
}

function applyCustomThemeColors(colors) {
    const root = document.documentElement;
    
    if (colors.primary) {
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--primary-hover', adjustBrightness(colors.primary, -10));
    }
    
    if (colors.secondary) {
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--secondary-hover', adjustBrightness(colors.secondary, -10));
    }
    
    if (colors.background) {
        root.style.setProperty('--bg-primary', colors.background);
        root.style.setProperty('--bg-secondary', adjustBrightness(colors.background, 5));
        root.style.setProperty('--bg-tertiary', adjustBrightness(colors.background, 10));
    }
    
    if (colors.text) {
        root.style.setProperty('--text-primary', colors.text);
        root.style.setProperty('--text-secondary', adjustOpacity(colors.text, 0.7));
        root.style.setProperty('--text-muted', adjustOpacity(colors.text, 0.5));
    }
}

function saveCustomTheme() {
    const themeName = document.getElementById('customThemeName')?.value.trim();
    
    if (!themeName) {
        VEO3.showNotification('Por favor, digite um nome para o tema', 'warning');
        return;
    }
    
    if (AVAILABLE_THEMES[themeName] || ThemeState.customThemes[themeName]) {
        VEO3.showNotification('Este nome já está em uso', 'warning');
        return;
    }
    
    const customTheme = {
        name: themeName,
        primary: document.getElementById('primaryColor')?.value,
        secondary: document.getElementById('secondaryColor')?.value,
        background: document.getElementById('backgroundColor')?.value,
        text: document.getElementById('textColor')?.value,
        createdAt: new Date().toISOString(),
        id: generateThemeId()
    };
    
    ThemeState.customThemes[themeName] = customTheme;
    saveCustomThemes();
    renderThemeGallery();
    
    VEO3.showNotification(`Tema "${themeName}" salvo com sucesso!`, 'success');
    
    // Clear form
    document.getElementById('customThemeName').value = '';
    disablePreviewMode();
}

function deleteCustomTheme(themeName) {
    if (confirm(`Tem certeza que deseja excluir o tema "${themeName}"?`)) {
        delete ThemeState.customThemes[themeName];
        saveCustomThemes();
        renderThemeGallery();
        
        // If current theme was deleted, switch to default
        if (ThemeState.currentTheme === themeName) {
            selectTheme('dark');
        }
        
        VEO3.showNotification(`Tema "${themeName}" excluído`, 'success');
    }
}

function resetToDefaultTheme() {
    // Clear custom properties
    const root = document.documentElement;
    const customProps = ['--primary', '--secondary', '--bg-primary', '--text-primary'];
    customProps.forEach(prop => {
        root.style.removeProperty(prop);
    });
    
    // Reset to dark theme
    selectTheme('dark');
    
    // Clear custom theme form
    const colorInputs = document.querySelectorAll('.custom-color-input');
    colorInputs.forEach(input => {
        input.value = input.getAttribute('data-default') || '#2563EB';
    });
    
    disablePreviewMode();
    VEO3.showNotification('Tema resetado para o padrão', 'success');
}

// ===== THEME INSTRUCTIONS =====
function submitThemeInstructions() {
    const instructions = document.getElementById('themeInstructions')?.value.trim();
    
    if (!instructions) {
        VEO3.showNotification('Por favor, digite suas instruções de tema', 'warning');
        return;
    }
    
    if (instructions.length < 20) {
        VEO3.showNotification('As instruções devem ter pelo menos 20 caracteres', 'warning');
        return;
    }
    
    // Simulate sending instructions to AI
    simulateThemeGeneration(instructions);
}

async function simulateThemeGeneration(instructions) {
    const submitBtn = document.getElementById('submitInstructions');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Processando...';
    submitBtn.disabled = true;
    
    try {
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Generate theme based on instructions
        const generatedTheme = generateThemeFromInstructions(instructions);
        
        // Apply generated theme
        applyGeneratedTheme(generatedTheme);
        
        VEO3.showNotification('Tema personalizado gerado com sucesso!', 'success');
        
        // Clear instructions
        document.getElementById('themeInstructions').value = '';
        localStorage.removeItem('veo3-theme-instructions-draft');
        
    } catch (error) {
        console.error('Erro ao gerar tema:', error);
        VEO3.showNotification('Erro ao gerar tema. Tente novamente.', 'error');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function generateThemeFromInstructions(instructions) {
    // Simple AI simulation - in real app, this would call an AI service
    const keywords = instructions.toLowerCase();
    
    let colors = {
        primary: '#2563EB',
        secondary: '#7C3AED',
        background: '#0F0F0F',
        text: '#FFFFFF'
    };
    
    // Analyze keywords and adjust colors
    if (keywords.includes('azul') || keywords.includes('blue')) {
        colors.primary = '#3B82F6';
        colors.secondary = '#1E40AF';
    } else if (keywords.includes('verde') || keywords.includes('green')) {
        colors.primary = '#10B981';
        colors.secondary = '#059669';
    } else if (keywords.includes('roxo') || keywords.includes('purple')) {
        colors.primary = '#8B5CF6';
        colors.secondary = '#7C3AED';
    } else if (keywords.includes('laranja') || keywords.includes('orange')) {
        colors.primary = '#F97316';
        colors.secondary = '#EA580C';
    }
    
    if (keywords.includes('claro') || keywords.includes('light')) {
        colors.background = '#FFFFFF';
        colors.text = '#0F172A';
    } else if (keywords.includes('escuro') || keywords.includes('dark')) {
        colors.background = '#0F0F0F';
        colors.text = '#FFFFFF';
    }
    
    return {
        name: 'Tema Personalizado',
        instructions: instructions,
        colors: colors,
        generatedAt: new Date().toISOString()
    };
}

function applyGeneratedTheme(theme) {
    applyCustomThemeColors(theme.colors);
    
    // Update color pickers to show generated colors
    document.getElementById('primaryColor').value = theme.colors.primary;
    document.getElementById('secondaryColor').value = theme.colors.secondary;
    document.getElementById('backgroundColor').value = theme.colors.background;
    document.getElementById('textColor').value = theme.colors.text;
    
    enablePreviewMode();
}

function useInstructionExample(exampleKey) {
    const examples = {
        corporate: 'Crie um tema corporativo com cores azuis e cinzas, transmitindo profissionalismo e confiança. Use tons mais escuros para dar seriedade.',
        creative: 'Quero um tema vibrante e criativo com cores roxas e rosas, que inspire inovação e criatividade. Deve ser moderno e energético.',
        minimal: 'Desenvolva um tema minimalista com cores neutras, muito clean e focado na simplicidade. Preto, branco e cinzas suaves.',
        nature: 'Crie um tema inspirado na natureza com verdes e azuis, transmitindo calma e sustentabilidade. Cores orgânicas e naturais.'
    };
    
    const instructionsTextarea = document.getElementById('themeInstructions');
    if (instructionsTextarea && examples[exampleKey]) {
        instructionsTextarea.value = examples[exampleKey];
        VEO3.showNotification('Exemplo aplicado!', 'success', 1500);
    }
}

// ===== THEME GALLERY =====
function renderThemeGallery() {
    const themeGallery = document.getElementById('themeGallery');
    if (!themeGallery) return;
    
    const allThemes = { ...AVAILABLE_THEMES, ...ThemeState.customThemes };
    
    themeGallery.innerHTML = Object.entries(allThemes).map(([key, theme]) => {
        const isActive = ThemeState.currentTheme === key;
        const isCustom = !AVAILABLE_THEMES[key];
        
        return `
            <div class="theme-preview ${isActive ? 'active' : ''}" data-theme="${key}">
                <div class="theme-preview-header">
                    <span class="theme-preview-name">${theme.name}</span>
                    <div class="theme-preview-colors">
                        ${theme.colors ? theme.colors.map(color => 
                            `<div class="theme-color-dot" style="background-color: ${color}"></div>`
                        ).join('') : ''}
                    </div>
                </div>
                <p class="theme-preview-description">${theme.description || 'Tema personalizado'}</p>
                <div class="theme-preview-actions">
                    <button class="btn btn-small ${isActive ? 'btn-outline' : 'btn-primary'}" 
                            onclick="selectTheme('${key}')">
                        ${isActive ? 'Ativo' : 'Aplicar'}
                    </button>
                    ${isCustom ? `
                        <button class="btn btn-small btn-outline" onclick="editCustomTheme('${key}')">
                            <i data-lucide="edit"></i>
                        </button>
                        <button class="btn btn-small btn-outline" onclick="deleteCustomTheme('${key}')">
                            <i data-lucide="trash-2"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function editCustomTheme(themeName) {
    const theme = ThemeState.customThemes[themeName];
    if (!theme) return;
    
    // Populate form with theme data
    document.getElementById('customThemeName').value = theme.name;
    document.getElementById('primaryColor').value = theme.primary;
    document.getElementById('secondaryColor').value = theme.secondary;
    document.getElementById('backgroundColor').value = theme.background;
    document.getElementById('textColor').value = theme.text;
    
    // Apply theme for preview
    applyCustomThemeColors(theme);
    enablePreviewMode();
    
    VEO3.showNotification(`Editando tema "${theme.name}"`, 'info');
}

// ===== IMPORT/EXPORT =====
function exportCurrentTheme() {
    const themeData = {
        name: ThemeState.currentTheme,
        theme: AVAILABLE_THEMES[ThemeState.currentTheme] || ThemeState.customThemes[ThemeState.currentTheme],
        exportedAt: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `veo3-theme-${ThemeState.currentTheme}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    VEO3.showNotification('Tema exportado!', 'success');
}

function importThemeFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const themeData = JSON.parse(e.target.result);
            
            if (!themeData.theme || !themeData.name) {
                throw new Error('Formato de arquivo inválido');
            }
            
            // Add imported theme to custom themes
            const themeName = `${themeData.name}_imported_${Date.now()}`;
            ThemeState.customThemes[themeName] = {
                ...themeData.theme,
                name: themeName,
                imported: true,
                importedAt: new Date().toISOString()
            };
            
            saveCustomThemes();
            renderThemeGallery();
            
            VEO3.showNotification(`Tema "${themeData.name}" importado!`, 'success');
            
        } catch (error) {
            console.error('Erro ao importar tema:', error);
            VEO3.showNotification('Erro ao importar tema. Verifique o arquivo.', 'error');
        }
    };
    
    reader.readAsText(file);
    
    // Clear file input
    event.target.value = '';
}

// ===== PREVIEW MODE =====
function enablePreviewMode() {
    ThemeState.previewMode = true;
    ThemeState.isCustomizing = true;
    
    const previewBanner = document.getElementById('previewBanner');
    if (previewBanner) {
        previewBanner.style.display = 'block';
    }
}

function disablePreviewMode() {
    ThemeState.previewMode = false;
    ThemeState.isCustomizing = false;
    
    const previewBanner = document.getElementById('previewBanner');
    if (previewBanner) {
        previewBanner.style.display = 'none';
    }
    
    // Reapply current theme
    applyTheme(ThemeState.currentTheme);
}

// ===== PERSISTENCE =====
function saveThemePreference(themeName) {
    localStorage.setItem('veo3-theme', themeName);
    localStorage.setItem('veo3-theme-manual', 'true');
}

function loadSavedThemes() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('veo3-theme');
    if (savedTheme && AVAILABLE_THEMES[savedTheme]) {
        ThemeState.currentTheme = savedTheme;
        applyTheme(savedTheme);
    }
    
    // Load custom themes
    const customThemes = localStorage.getItem('veo3-custom-themes');
    if (customThemes) {
        try {
            ThemeState.customThemes = JSON.parse(customThemes);
        } catch (error) {
            console.warn('Erro ao carregar temas personalizados:', error);
        }
    }
}

function saveCustomThemes() {
    localStorage.setItem('veo3-custom-themes', JSON.stringify(ThemeState.customThemes));
}

function saveInstructionsDraft() {
    const instructions = document.getElementById('themeInstructions')?.value;
    if (instructions) {
        localStorage.setItem('veo3-theme-instructions-draft', instructions);
    }
}

function loadInstructionsDraft() {
    const draft = localStorage.getItem('veo3-theme-instructions-draft');
    const instructionsTextarea = document.getElementById('themeInstructions');
    
    if (draft && instructionsTextarea) {
        instructionsTextarea.value = draft;
    }
}

// ===== MODAL FUNCTIONS =====
function openThemeCustomizer() {
    const modal = document.getElementById('themeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update current theme selection
        updateThemeUI(ThemeState.currentTheme);
    }
}

function closeThemeCustomizer() {
    const modal = document.getElementById('themeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Disable preview mode if active
        if (ThemeState.previewMode) {
            disablePreviewMode();
        }
    }
}

function updateThemeUI(themeName) {
    // Update theme option buttons
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === themeName) {
            option.classList.add('active');
        }
    });
    
    // Update theme toggle icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', themeName === 'dark' ? 'sun' : 'moon');
        }
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function validateThemeName() {
    const input = document.getElementById('customThemeName');
    const value = input?.value.trim();
    
    if (!value) return;
    
    const isValid = value.length >= 3 && 
                   value.length <= 30 && 
                   /^[a-zA-Z0-9\s\-_]+$/.test(value) &&
                   !AVAILABLE_THEMES[value] && 
                   !ThemeState.customThemes[value];
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

// ===== UTILITY FUNCTIONS =====
function adjustBrightness(hex, percent) {
    // Convert hex to RGB
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function adjustOpacity(color, opacity) {
    // Simple opacity adjustment for hex colors
    if (color.startsWith('#')) {
        const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
        return color + alpha;
    }
    return color;
}

function generateThemeId() {
    return 'theme_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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
window.VEO3Themes = {
    ThemeState,
    AVAILABLE_THEMES,
    selectTheme,
    openThemeCustomizer,
    closeThemeCustomizer,
    saveCustomTheme,
    deleteCustomTheme,
    exportCurrentTheme,
    submitThemeInstructions
};

