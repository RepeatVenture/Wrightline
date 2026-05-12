// Cabinet Construction Explorer Interactive Functionality

// Base Cabinet component data
const baseCabinetParts = {
    'cabinet-box': {
        number: 1,
        title: '3/4" Plywood Cabinet Box',
        description: 'Full 3/4-inch prefinished plywood construction throughout the cabinet box. No particle board or MDF. Each panel is sturdy, stable, and built to handle weight without sagging.',
        why: 'Plywood is stronger and more moisture-resistant than particle board. It holds screws better, lasts longer, and won\'t crumble if it gets wet. This is the foundation of a cabinet that will last decades.'
    },
    'back-panel': {
        number: 7,
        title: 'Full-Back Panel',
        description: 'A full 1/4-inch plywood back panel that covers the entire cabinet, not just thin strips. The back is dadoed into the sides for strength and holds the cabinet square.',
        why: 'A solid back keeps your cabinet from racking or twisting over time. It adds structural integrity and prevents items from falling behind the cabinet.'
    },
    'shelf': {
        number: 4,
        title: 'Adjustable Shelf',
        description: '3/4-inch plywood shelves with adjustable positioning. Shelves are finished on all sides and can be moved to fit your storage needs.',
        why: 'Thick plywood shelves won\'t sag under the weight of dishes or supplies. Adjustability means the cabinet works for you, not the other way around.'
    },
    'door': {
        number: 2,
        title: 'Five-Piece Door',
        description: 'Solid hardwood frame with a center panel. Assembled with mortise-and-tenon joinery for strength. Finished with durable catalyzed lacquer or your choice of finish.',
        why: 'Real wood doors don\'t peel, chip, or fade like cheaper thermofoil or vinyl-wrapped doors. They can be refinished if needed and look better as they age.'
    },
    'drawer-front': {
        number: 3,
        title: 'Drawer Front',
        description: 'Matching solid wood drawer front attached to a dovetailed drawer box. Designed to align perfectly with doors for a clean, cohesive look.',
        why: 'Quality drawer fronts stay flat and don\'t warp. Solid attachment to a strong drawer box means smooth operation for years.'
    },
    'drawer-box': {
        number: 8,
        title: 'Dovetailed Drawer Box',
        description: 'Solid wood drawer box with dovetail joinery at all four corners. Finished interior for easy cleaning. Built to handle daily use without coming apart.',
        why: 'Dovetail joints are the strongest drawer construction available. They won\'t pull apart even with heavy loads and repeated use. This is old-school craftsmanship that simply works.'
    },
    'drawer-slides': {
        number: 6,
        title: 'Blum Soft-Close Slides',
        description: 'Full-extension undermount Blum Tandem drawer slides with soft-close mechanism. Rated for 75+ lbs. Smooth operation and quiet closing every time.',
        why: 'Blum is the industry standard for reliability. Full extension means you can access everything in the drawer. Soft-close prevents slamming and extends the life of the cabinet.'
    },
    'hinges': {
        number: 5,
        title: 'Blum Soft-Close Hinges',
        description: 'Blum Clip Top hinges with integrated soft-close dampening. Concealed installation, adjustable in three directions for perfect door alignment.',
        why: 'Cheap hinges fail fast. Blum hinges are built in Austria, tested for 200,000+ cycles, and stay adjusted. Soft-close keeps your cabinet quiet and your doors from banging.'
    },
    'finished-end': {
        number: 9,
        title: 'Finished End Panel',
        description: 'Exposed cabinet ends are covered with a matching finished panel, never raw plywood edges. Clean appearance that looks like furniture, not a box.',
        why: 'This is a detail that separates quality cabinetry from budget work. If someone can see the side of your cabinet, it should look intentional and finished.'
    },
    'toe-kick': {
        number: 10,
        title: 'Recessed Toe Kick',
        description: 'A recessed base that allows you to stand close to the cabinet without hitting your toes. Standard 4-inch height, finished to match or left for a separate base.',
        why: 'Proper toe kick design makes a kitchen more comfortable to work in. It\'s a small detail that affects how the whole space feels.'
    },
    'edge-banding': {
        number: 11,
        title: 'Edge Banding',
        description: 'All visible plywood edges are finished with matching edge banding that\'s glued and trimmed flush. No raw edges inside your cabinet.',
        why: 'Edge banding protects plywood edges from chipping and moisture. It also makes the interior look finished and professional.'
    },
    'interior-finish': {
        number: 12,
        title: 'Interior Finish',
        description: 'Cabinet interiors are prefinished with a clear or matching finish. Easy to wipe clean and protected from moisture and staining.',
        why: 'An unfinished interior absorbs spills and odors. A finished interior stays cleaner longer and is much easier to maintain.'
    }
};

// Wall Cabinet component data
const wallCabinetParts = {
    'cabinet-box': {
        number: 1,
        title: '3/4" Plywood Cabinet Box',
        description: 'Full 3/4-inch prefinished plywood construction for the cabinet box. Lighter than base cabinets but just as sturdy. Top, bottom, and sides are all solid plywood.',
        why: 'Wall cabinets need to be strong but not excessively heavy. Plywood provides the perfect strength-to-weight ratio and holds screws securely for reliable wall mounting.'
    },
    'back-panel': {
        number: 7,
        title: 'Full-Back Panel',
        description: 'Full 1/4-inch plywood back panel properly dadoed into the cabinet sides. Provides structural integrity and a clean finished look inside.',
        why: 'The back panel keeps the cabinet square and rigid when mounted to the wall. It also serves as a backer for secure mounting to wall studs.'
    },
    'shelf': {
        number: 3,
        title: 'Adjustable Shelves',
        description: '3/4-inch plywood shelves on adjustable pins. Multiple shelves allow customization for plates, glasses, or storage containers.',
        why: 'Adjustable shelving means you can configure the interior to fit what you actually store. Thick plywood shelves won\'t sag even when fully loaded with dishes.'
    },
    'door': {
        number: 2,
        title: 'Five-Piece Doors',
        description: 'Solid hardwood doors with mortise-and-tenon joinery. Wall cabinets often have two doors that meet in the middle with precise alignment.',
        why: 'Quality doors stay flat and aligned over time. Proper construction means they won\'t twist or warp, and they\'ll close properly for decades.'
    },
    'hinges': {
        number: 4,
        title: 'Blum Soft-Close Hinges',
        description: 'European-style concealed hinges with integrated soft-close. Adjustable for perfect door alignment. Six-way adjustment ensures doors stay aligned.',
        why: 'Wall cabinet doors are at eye level, so alignment matters. Blum hinges allow precise adjustment and the soft-close feature prevents doors from slamming into dishes.'
    },
    'mounting-rail': {
        number: 5,
        title: 'French Cleat Mounting System',
        description: 'Heavy-duty mounting rail system for secure wall attachment. Allows for precise leveling and easy installation.',
        why: 'A proper mounting system ensures your wall cabinets are secure and level. French cleats distribute weight evenly and make installation more straightforward.'
    },
    'finished-end': {
        number: 8,
        title: 'Finished End Panel',
        description: 'Exposed ends get a matching finished panel. No raw plywood edges visible in your kitchen.',
        why: 'Wall cabinets are often visible from the side. A finished end panel makes them look like furniture, not construction boxes.'
    },
    'edge-banding': {
        number: 9,
        title: 'Edge Banding',
        description: 'All visible plywood edges are finished with matching edge banding. Protects edges and provides a clean finished appearance.',
        why: 'Edge banding seals plywood edges against moisture and prevents chipping. It\'s a sign of quality construction.'
    },
    'interior-finish': {
        number: 10,
        title: 'Interior Finish',
        description: 'Cabinet interiors are prefinished for easy cleaning and a professional appearance.',
        why: 'A finished interior is easier to keep clean and won\'t absorb odors or stains. It\'s a detail that shows attention to quality.'
    },
    'glass-option': {
        number: 6,
        title: 'Glass Door Option',
        description: 'Optional glass panel inserts for displaying dishes or glassware. Mullions can be added for traditional styling.',
        why: 'Glass doors add visual interest and let you display items you\'re proud of. Quality glass installation means no rattling or gaps.'
    }
};

// State
let currentCabinetType = 'base'; // 'base' or 'wall'
let currentView = 'assembled'; // 'assembled' or 'exploded'
let selectedPart = null;

// Get current cabinet parts based on type
function getCurrentParts() {
    return currentCabinetType === 'base' ? baseCabinetParts : wallCabinetParts;
}

// Toggle between base and wall cabinets  
function toggleCabinetType() {
    console.log('toggleCabinetType called');
    
    // EXTREME VISUAL TEST - Change entire page background and show alert
    document.body.style.backgroundColor = currentCabinetType === 'base' ? '#ff0000' : '#00ff00';
    alert('Toggle clicked! Current: ' + currentCabinetType + ', switching to: ' + (currentCabinetType === 'base' ? 'WALL' : 'BASE'));
    
    const cabinetTypeToggle = document.getElementById('cabinetTypeToggle');
    const toggleLabels = cabinetTypeToggle.querySelectorAll('.toggle-label');
    
    if (currentCabinetType === 'base') {
        currentCabinetType = 'wall';
        toggleLabels[0].classList.remove('active');
        toggleLabels[1].classList.add('active');
    } else {
        currentCabinetType = 'base';
        toggleLabels[1].classList.remove('active');
        toggleLabels[0].classList.add('active');
    }
    
    console.log('Current cabinet type:', currentCabinetType);
    
    // Update the visualization and image
    updateCabinetVisualization();
    updateCabinetImage();
    
    // Clear current selection
    closeDetailPanel();
}

// Update cabinet image based on type and view
function updateCabinetImage() {
    console.log('=== updateCabinetImage ENTRY ===');
    console.log('currentCabinetType at function start:', currentCabinetType);
    console.log('currentView at function start:', currentView);
    
    const cabinetImage = document.getElementById('cabinetImage');
    const cabinetViewer = document.getElementById('cabinetViewer');
    
    // Capture values immediately, not in setTimeout
    const type = currentCabinetType;
    const view = currentView;
    const typePrefix = type === 'base' ? 'Base' : 'Wall';
    const viewSuffix = view === 'assembled' ? 'Assembled' : 'Exploded';
    const imagePath = `${typePrefix}_Cabinet_${viewSuffix}.png`;
    // Add timestamp to force cache refresh
    const cacheBust = imagePath + '?t=' + Date.now();
    
    console.log('Updating cabinet image to:', imagePath);
    console.log('Path with cache bust:', cacheBust);
    console.log('typePrefix:', typePrefix, 'viewSuffix:', viewSuffix);
    
    if (cabinetImage) {
        const oldSrc = cabinetImage.src;
        
        // SUPER OBVIOUS visual indicators
        console.log('Setting border and background based on type:', type);
        
        // Set data attribute for CSS-based styling
        cabinetViewer.setAttribute('data-cabinet-type', type);
        console.log('Set data-cabinet-type attribute to:', type);
        
        if (type === 'wall') {
            console.log('-> Setting RED border + pink background (wall)');
            cabinetViewer.style.border = '10px solid red !important';
            cabinetViewer.style.backgroundColor = '#ffcccc !important';
            cabinetViewer.style.setProperty('border', '10px solid red', 'important');
            cabinetViewer.style.setProperty('background-color', '#ffcccc', 'important');
        } else {
            console.log('-> Setting BLUE border + light blue background (base)');
            cabinetViewer.style.border = '10px solid blue !important';
            cabinetViewer.style.backgroundColor = '#ccccff !important';
            cabinetViewer.style.setProperty('border', '10px solid blue', 'important');
            cabinetViewer.style.setProperty('background-color', '#ccccff', 'important');
        }
        
        // Log what the actual computed styles are after setting
        const computedStyle = window.getComputedStyle(cabinetViewer);
        console.log('ACTUAL border after setting:', computedStyle.border);
        console.log('ACTUAL background-color after setting:', computedStyle.backgroundColor);
        
        // FORCE BROWSER REPAINT - multiple strategies
        console.log('Forcing repaint...');
        
        // Strategy 1: Force reflow by reading offsetHeight
        void cabinetViewer.offsetHeight;
        
        // Strategy 2: Toggle display briefly
        const originalDisplay = cabinetViewer.style.display;
        cabinetViewer.style.display = 'none';
        void cabinetViewer.offsetHeight; // Force reflow
        cabinetViewer.style.display = originalDisplay || 'flex';
        
        // Strategy 3: Add and remove a class to trigger repaint
        cabinetViewer.classList.add('force-repaint');
        setTimeout(() => {
            cabinetViewer.classList.remove('force-repaint');
        }, 10);
        
        // Check again after a delay to see if something is reverting it
        setTimeout(() => {
            const checkStyle = window.getComputedStyle(cabinetViewer);
            console.log('CHECKING 100ms later - border:', checkStyle.border);
            console.log('CHECKING 100ms later - background:', checkStyle.backgroundColor);
        }, 100);
        
        // Add text overlay showing what's loaded
        let overlay = document.getElementById('debug-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'debug-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '10px';
            overlay.style.left = '10px';
            overlay.style.background = 'rgba(0,0,0,0.8)';
            overlay.style.color = 'white';
            overlay.style.padding = '10px';
            overlay.style.fontSize = '20px';
            overlay.style.fontWeight = 'bold';
            overlay.style.zIndex = '1000';
            overlay.style.borderRadius = '5px';
            cabinetViewer.appendChild(overlay);
        }
        overlay.textContent = `${typePrefix} Cabinet - ${viewSuffix}`;
        
        // Change image immediately
        cabinetImage.src = cacheBust;
        console.log('Image src changed from', oldSrc, 'to', cabinetImage.src);
        console.log('Image element size:', cabinetImage.width, 'x', cabinetImage.height);
        console.log('Image element visible?', cabinetImage.offsetParent !== null);
        cabinetImage.alt = `${typePrefix} Cabinet - ${viewSuffix} View`;
        
        // Add load event to verify image loaded
        cabinetImage.onload = function() {
            console.log('✓ Image loaded successfully:', cacheBust);
            console.log('  Natural size:', cabinetImage.naturalWidth, 'x', cabinetImage.naturalHeight);
        };
        cabinetImage.onerror = function() {
            console.error('✗ Image failed to load:', cacheBust);
        };
    } else {
        console.error('cabinetImage element not found!');
    }
}

// Toggle between assembled and exploded views
function toggleView() {
    console.log('toggleView called');
    const viewToggle = document.getElementById('viewToggle');
    const toggleLabels = viewToggle.querySelectorAll('.toggle-label');
    
    currentView = currentView === 'assembled' ? 'exploded' : 'assembled';
    
    if (currentView === 'exploded') {
        toggleLabels[0].classList.remove('active');
        toggleLabels[1].classList.add('active');
    } else {
        toggleLabels[1].classList.remove('active');
        toggleLabels[0].classList.add('active');
    }
    
    console.log('Current view:', currentView);
    
    // Update the image
    updateCabinetImage();
    
    // Clear current selection
    closeDetailPanel();
}

// Update cabinet visualization based on type
function updateCabinetVisualization() {
    const cabinetViewer = document.getElementById('cabinetViewer');
    
    // Add subtle animation on type change
    cabinetViewer.style.opacity = '0.7';
    setTimeout(() => {
        cabinetViewer.style.opacity = '1';
    }, 200);
}

// Show part detail
function showPartDetail(partName) {
    const currentParts = getCurrentParts();
    const partData = currentParts[partName];
    
    if (!partData) return;
    
    selectedPart = partName;
    
    const detailPanel = document.getElementById('detailPanel');
    const detailNumber = document.getElementById('detailNumber');
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailWhy = document.getElementById('detailWhy');
    
    // Update detail card content
    detailNumber.textContent = partData.number;
    detailTitle.textContent = partData.title;
    detailDescription.textContent = partData.description;
    detailWhy.innerHTML = `
        <h4>Why It Matters</h4>
        <p>${partData.why}</p>
    `;
    
    // Show detail panel on mobile
    if (window.innerWidth < 1024) {
        detailPanel.classList.add('active');
    }
    
    // Highlight the part
    document.querySelectorAll('.cabinet-part').forEach(part => {
        part.classList.remove('highlighted');
    });
    document.querySelectorAll(`.cabinet-part[data-part="${partName}"]`).forEach(part => {
        part.classList.add('highlighted');
    });
}

// Close detail panel (mobile)
function closeDetailPanel() {
    const detailPanel = document.getElementById('detailPanel');
    detailPanel.classList.remove('active');
    document.querySelectorAll('.cabinet-part').forEach(part => {
        part.classList.remove('highlighted');
    });
}

// Initialize
function initCabinetExplorer() {
    console.log('=== Cabinet Explorer Init ===');
    
    // Get elements
    const cabinetTypeToggle = document.getElementById('cabinetTypeToggle');
    const viewToggle = document.getElementById('viewToggle');
    const detailPanel = document.getElementById('detailPanel');
    const detailClose = document.getElementById('detailClose');
    const cabinetImage = document.getElementById('cabinetImage');
    
    console.log('Elements found:', {
        cabinetTypeToggle: !!cabinetTypeToggle,
        viewToggle: !!viewToggle,
        cabinetImage: !!cabinetImage
    });
    
    if (!cabinetTypeToggle || !viewToggle) {
        console.error('Cabinet Explorer: Toggle buttons not found');
        return;
    }
    
    // Cabinet type toggle
    cabinetTypeToggle.addEventListener('click', function(e) {
        console.log('=== Cabinet Type Button Clicked ===');
        e.preventDefault();
        e.stopPropagation();
        toggleCabinetType();
    });
    
    // View toggle button
    viewToggle.addEventListener('click', function(e) {
        console.log('=== View Toggle Button Clicked ===');
        e.preventDefault();
        e.stopPropagation();
        toggleView();
    });
    
    // Close button
    if (detailClose) {
        detailClose.addEventListener('click', closeDetailPanel);
    }
    
    // Click outside to close (mobile)
    if (detailPanel) {
        detailPanel.addEventListener('click', (e) => {
            if (e.target === detailPanel) {
                closeDetailPanel();
            }
        });
    }
    
    // Hotspots removed per user request
    
    // Initialize visualization
    updateCabinetVisualization();
    updateCabinetImage();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCabinetExplorer);
} else {
    initCabinetExplorer();
}

// Export for potential future 3D upgrade
window.CabinetExplorer = {
    toggleView,
    showPartDetail,
    baseCabinetParts,
    wallCabinetParts,
    currentView
};

// Expose functions globally for inline onclick handlers (debugging)
window.toggleCabinetType = toggleCabinetType;
window.toggleView = toggleView;
