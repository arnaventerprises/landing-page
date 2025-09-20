// ARNAV ENTERPRISES - Updated Machinery Data with Compact Specs
const machineryData = [
    {
        icon: "🏭",
        image: "assets/machinery1.png",
        name: "VERTICAL MACHINING CENTER (VMC): MANFORD MAKE VL2090",
        specs: {
            "Travel": "X: 2000mm, Y: 900mm, Z: 900mm",
            "Table Size": "X: 2200mm, Y: 900mm",
            "Capacity": "2200 Kg",
            "Controller": "Mitsubishi"
        }
    },
    {
        icon: "🏭",
        image: "assets/machinery2.png",
        name: "VERTICAL MACHINING CENTER (VMC): COSMOS CVM1160",
        specs: {
            "Travel": "X: 1100mm, Y: 650mm, Z: 600mm",
            "Table Size": "X: 1250mm, Y: 600mm",
            "Capacity": "1000 Kg",
            "Controller": "Mitsubishi M80AVU"
        }
    },
    {
        icon: "🏭",
        image: "assets/machinery3.png",
        name: "VERTICAL MACHINING CENTER (VMC): MANFORD MAKE VL800",
        specs: {
            "Travel": "X: 800mm, Y: 510mm, Z: 510mm",
            "Capacity": "500 Kg",
            "Controller": "Mitsubishi M70AVU"
        }
    },
    {
        icon: "🔄",
        image: "assets/machinery4.png",
        name: "VMC MANFORD MAKE VL 800 4TH AXIS",
        specs: {
            "Travel": "X: 800mm, Y: 510mm, Z: 510mm",
            "Capacity": "500 Kg",
            "Controller": "Mitsubishi M70AVU"
        }
    },
    {
        icon: "⚡",
        image: "assets/machinery5.png",
        name: "EDM (ELECTRONICA HIGH TECH D550 M)",
        specs: {
            "Work Table": "1000mm X 500mm"
        }
    },
    {
        icon: "🗜️",
        image: "assets/machinery6.png",
        name: "OVERHEAD CRANE",
        specs: {
            "Capacity": "5 TON"
        }
    },
    {
        icon: "🔍",
        image: "assets/machinery7.png",
        name: "DRO MACHINE",
        specs: {}
    },
    {
        icon: "🔧",
        image: "assets/machinery8.png",
        name: "LATHE MACHINE",
        specs: {
            "Length": "12 FT"
        }
    },
    {
        icon: "🔨",
        image: "assets/machinery9.png",
        name: "HEAVY LATHE",
        specs: {
            "Length": "20 FT"
        }
    },
    {
        icon: "🔗",
        image: "assets/machinery10.png",
        name: "Wire-Cut (ELECTRONICA) SPRING CUT",
        specs: {
            "Travel": "X: 400mm, Y: 300mm, Z: 200mm"
        }
    },
    {
        icon: "⚡",
        image: "assets/machinery11.png",
        name: "Wire-Cut (ELECTRONICA) ECOCUT",
        specs: {}
    },
    {
        icon: "💎",
        image: "assets/machinery12.png",
        name: "Wire-Cut (ELECTRONICA) SPRING CUT DELUX",
        specs: {
            "Travel": "X: 400mm, Y: 300mm, Z: 200mm"
        }
    }
];

// Function to generate machinery slides HTML
function generateMachinerySlides() {
    const container = document.getElementById('machineryCarouselContainer');
    if (!container) return;

    container.innerHTML = machineryData.map(machine => `
        <div class="machine-slide">
            <div class="machine-image">
                ${machine.image ? 
                    `<img src="${machine.image}" alt="${machine.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='${machine.icon}'; this.parentElement.style.fontSize='6rem';" />` : 
                    machine.icon
                }
            </div>
            <div class="machine-info">
                <h3>${machine.name}</h3>
                <div class="specs">
                    ${Object.entries(machine.specs).map(([label, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${label}</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Function to generate machinery dots
function generateMachineryDots() {
    const dotsContainer = document.getElementById('machineryCarouselDots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = machineryData.map((_, index) => 
        `<div class="dot ${index === 0 ? 'active' : ''}" onclick="currentMachinerySlide(${index + 1})"></div>`
    ).join('');
}