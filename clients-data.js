// ARNAV ENTERPRISES - Updated Clients Data
const clientsData = [
    { 
        icon: "🚗", 
        name: "",
        image: "assets/clients/client1.png"
    },
    { 
        icon: "🏍️", 
        name: "",
        image: "assets/clients/client2.png"
    },
    { 
        icon: "🏗️", 
        name: "",
        image: "assets/clients/client3.png"
    },
    { 
        icon: "🚛", 
        name: "",
        image: "assets/clients/client4.png"
    }
];

// Function to generate clients HTML
function generateClients() {
    const container = document.getElementById('clients-slider');
    if (!container) return;

    // Double the array to create seamless loop effect
    const doubledClients = [...clientsData, ...clientsData];
    
    container.innerHTML = doubledClients.map(client => `
        <div class="client-logo">
            <div class="client-logo-container">
                ${client.image ? 
                    `<img src="${client.image}" alt="${client.name}" class="client-logo-img" 
                          onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=&quot;client-logo-icon&quot;>${client.icon}</div>';" />` : 
                    `<div class="client-logo-icon">${client.icon}</div>`
                }
            </div>
            <div class="client-name">${client.name}</div>
        </div>
    `).join('');
}