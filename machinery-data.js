// ARNAV ENTERPRISES - Fixed Machinery Data
const machineryData = [
    {
        icon: "🏭",
        image: "assets/machinery1.png", // Fixed path - make sure this file exists
        name: "VERTICAL MACHINING CENTER (VMC): MANFORD MAKE VL2090",
        specs: {
            "X Travel": "2000 mm (2 M)",
            "Y Travel": "900 mm (1 M)", 
            "Z Travel": "900 mm",
            "Table Size X": "2200 mm",
            "Table Size Y": "900 mm",
            "Table Load Capacity": "2200 Kg",
            "Controller": "Mitsubishi"
        }
    },
    {
        icon: "🏭",
        image: "assets/machinery2.png", // Add your image path here
        name: "VERTICAL MACHINING CENTER (VMC): COSMOS CVM1160",
        specs: {
            "X Travel": "1100 mm",
            "Y Travel": "650 mm",
            "Z Travel": "600 mm",
            "Table Size X": "1250 mm",
            "Table Size Y": "600 mm",
            "Table Load Capacity": "1000 Kg",
            "Controller": "Mitsubishi M80AVU"
        }
    },
    {
        icon: "🏭",
        image: "assets/machinery3.png", // Add your image path here
        name: "VERTICAL MACHINING CENTER (VMC): MANFORD MAKE VL800",
        specs: {
            "X Travel": "800 mm",
            "Y Travel": "510 mm",
            "Z Travel": "510 mm",
            "Table Load Capacity": "500 Kg",
            "Controller": "Mitsubishi M70AVU"
        }
    },
    {
        icon: "🔄",
        image: "assets/machinery4.png", // Add your image path here
        name: "VERTICAL MACHINING CENTER (VMC) MANFORD MAKE VL 800 4TH AXIS",
        specs: {
            "X Travel": "800 mm",
            "Y Travel": "510 mm",
            "Z Travel": "510 mm",
            "Table Load Capacity": "500 Kg",
            "Controller": "Mitsubishi M70AVU"
        }
    },
    {
        icon: "⚡",
        image: "assets/machinery5.png", // Add your image path here
        name: "EDM (ELECTRONICA HIGH TECH D550 M)",
        specs: {
            "Work Table": "1000 MM X 500 MM"
        }
    },
    {
        icon: "🏗️",
        image: "assets/machinery6.png", // Add your image path here
        name: "OVERHEAD CRANE CAPACITY – 5 TON",
        specs: {
            "Capacity": "5 TON"
        }
    },
    {
        icon: "📏",
        image: "assets/machinery7.png", // Add your image path here
        name: "DRO MACHINE",
        specs: {}
    },
    {
        icon: "🔧",
        image: "assets/machinery8.png", // Add your image path here
        name: "LATHE MACHINE: 12 FT",
        specs: {
            "Length": "12 FT"
        }
    },
    {
        icon: "🔨",
        image: "assets/machinery9.png", // Add your image path here
        name: "HEAVY LATHE: 20 FT",
        specs: {
            "Length": "20 FT"
        }
    },
    {
        icon: "🔗",
        image: "assets/machinery10.png", // Add your image path here
        name: "Wire-Cut (ELECTRONICA) SPRING CUT",
        specs: {
            "X Travel": "400 mm",
            "Y Travel": "300 mm",
            "Z Travel": "200 mm"
        }
    },
    {
        icon: "⚡",
        image: "assets/machinery11.png", // Add your image path here
        name: "Wire-Cut (ELECTRONICA) ECOCUT",
        specs: {}
    },
    {
        icon: "💎",
        image: "assets/machinery12.png", // Add your image path here
        name: "Wire-Cut (ELECTRONICA) SPRING CUT DELUX",
        specs: {
            "X Travel": "400 mm",
            "Y Travel": "300 mm",
            "Z Travel": "200 mm"
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