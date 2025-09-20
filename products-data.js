// ARNAV ENTERPRISES - Fixed Products Data
const productsData = [
    {
        name: "PRESS TOOLS",
        images: [
            "assets/products/presstool/presstool1.png",
            "assets/products/presstool/presstool2.png",
            "assets/products/presstool/presstool3.png",
            "assets/products/presstool/presstool4.png",
            "assets/products/presstool/presstool5.png",
            "assets/products/presstool/presstool6.png",
            "assets/products/presstool/presstool7.png",
            "assets/products/presstool/presstool8.png",
            "assets/products/presstool/presstool9.png",
            "assets/products/presstool/presstool10.png",
            "assets/products/presstool/presstool11.png",
        ]
    },
    {
        name: "PDC DIES",
        images: [
            "assets/products/pdcdies/pd1.png",
            "assets/products/pdcdies/pd2.png",
            "assets/products/pdcdies/pd3.png",
            "assets/products/pdcdies/pd4.png",
            "assets/products/pdcdies/pd6.png",
            "assets/products/pdcdies/pd7.png",
            "assets/products/pdcdies/pd8.png",
            "assets/products/pdcdies/pd9.png",
            "assets/products/pdcdies/pd10.png",
            "assets/products/pdcdies/pd11.png",
            "assets/products/pdcdies/pd12.png",
            "assets/products/pdcdies/pd13.png",
            "assets/products/pdcdies/pd14.png",
            "assets/products/pdcdies/pd15.png",
            "assets/products/pdcdies/pd16.png",
            "assets/products/pdcdies/pd17.png",
            "assets/products/pdcdies/pd18.png",
            "assets/products/pdcdies/pd19.png",
            "assets/products/pdcdies/pd20.png",
            "assets/products/pdcdies/pd21.png",
            "assets/products/pdcdies/pd22.png",
            "assets/products/pdcdies/pd23.png",
            "assets/products/pdcdies/pd24.png",
            "assets/products/pdcdies/pd25.png",
            "assets/products/pdcdies/pd26.png",
            "assets/products/pdcdies/pd27.png",
            "assets/products/pdcdies/pd28.png",
            "assets/products/pdcdies/pd29.png",
            "assets/products/pdcdies/pd30.png",
            "assets/products/pdcdies/pd31.png",
            "assets/products/pdcdies/pd32.png",
            

        ]
    },
    {
        name: "MOULDS",
        images: [
            "assets/products/moulds/mould1.png"
        ]
    },
    {
        name: "VMC MACHINE",
        images: [
            "assets/products/vmc-machine-1.jpg",
            "assets/products/vmc-machine-2.jpg"
        ]
    },
    {
        name: "WIRE CUT JOB",
        images: [
            "assets/products/wirecut/job1.png",
        ]
    }
];

// Function to generate products HTML
function generateProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = productsData.map(product => `
        <div class="product-item">
            <h3 class="product-heading">${product.name}</h3>
            <div class="product-image-carousel">
                <div class="image-container">
                    ${product.images.map((image, index) => 
                        `<img src="${image}" alt="${product.name} Product ${index + 1}" 
                              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMmEyYTJhIi8+CjxwYXRoIGQ9Ik0yNTAgMTUwSDM1MFYyNTBIMjUwVjE1MFoiIGZpbGw9IiM0YTRhNGEiLz4KPHRleHQgeD0iMzAwIiB5PSIzMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2NjY2NjYyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+JHtwcm9kdWN0Lm5hbWV9PC90ZXh0Pgo8L3N2Zz4K'; this.alt='${product.name} - Image not available';" />`
                    ).join('')}
                </div>
                <div class="product-controls">
                    <button class="product-btn" onclick="prevProductImage(this)">‹</button>
                    <button class="product-btn" onclick="nextProductImage(this)">›</button>
                </div>
            </div>
        </div>
    `).join('');
}