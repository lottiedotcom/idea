let uploadedImageDataUrl = null;

// Handle Image Upload Preview
document.getElementById('p-avatar').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageDataUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        uploadedImageDataUrl = null;
    }
});

document.getElementById('generate-btn').addEventListener('click', function() {
    const name = document.getElementById('p-name').value.trim();
    const color = document.getElementById('p-color').value;
    const keywordsInput = document.getElementById('p-keywords').value.trim();

    if (!name || !keywordsInput) {
        alert("Please enter Designation and Data Parameters to initialize.");
        return;
    }

    const keywords = keywordsInput.split(',').map(k => k.trim().toLowerCase());
    
    // Hash function to make generation deterministic based on name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const positiveHash = Math.abs(hash);

    // Deep Chobits Lore Arrays
    const types = [
        "Minicom (Mobile/Miniature)", 
        "Custom-Built (Full-Size)", 
        "Mass-Produced (Full-Size)", 
        "Chobit-Series (Unverified)", 
        "National-Class (High Spec)",
        "Prototype (Alpha Build)"
    ];
    const manufacturers = [
        "Piffle Princess", 
        "Rozen Inc.", 
        "Dragonfly Industries", 
        "Independent Hobbyist", 
        "Cybernetics Y", 
        "Unregistered/Black Market"
    ];
    
    const osKernels = [
        "Standard OS v2.4",
        "Piffle Light OS",
        "Homebrew Kernel (Unlicensed)",
        "Self-Learning Neural Net",
        "Open-Source Root OS"
    ];

    // Select data
    const persocomType = types[positiveHash % types.length];
    const manufacturer = manufacturers[(positiveHash * 2) % manufacturers.length];
    const os = osKernels[(positiveHash * 3) % osKernels.length];
    
    // Tech Specs Generation
    const serial = `PC-${positiveHash.toString().substring(0, 3).padStart(3, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const memory = `${(positiveHash % 64) + 16} TB Quantum Storage`;
    
    // Generate a fake MAC Address for that networking aesthetic
    const hex = "0123456789ABCDEF";
    let mac = "";
    for(let i=0; i<6; i++) {
        mac += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)];
        if(i < 5) mac += ":";
    }

    const primaryFunction = keywords[0] ? `DIR_${keywords[0].toUpperCase()}` : "GENERAL_ASSIST";

    // Update the DOM
    document.getElementById('out-name').innerText = name.toUpperCase();
    document.getElementById('out-serial').innerText = serial;
    document.getElementById('out-type').innerText = persocomType;
    document.getElementById('out-os').innerText = os;
    document.getElementById('out-manufacturer').innerText = manufacturer.toUpperCase();
    document.getElementById('out-memory').innerText = memory;
    document.getElementById('out-mac').innerText = mac;
    document.getElementById('out-function').innerText = primaryFunction;

    // Handle Avatar Display (Uploaded image vs Initials)
    const avatarImg = document.getElementById('avatar-img');
    const avatarInit = document.getElementById('avatar-initial');
    const avatarBg = document.getElementById('avatar-bg');

    avatarBg.style.backgroundColor = color;

    if (uploadedImageDataUrl) {
        avatarImg.src = uploadedImageDataUrl;
        avatarImg.classList.remove('hidden');
        avatarInit.classList.add('hidden');
    } else {
        avatarImg.classList.add('hidden');
        avatarInit.classList.remove('hidden');
        avatarInit.innerText = name.charAt(0).toUpperCase();
    }

    // Apply accent color
    document.getElementById('card-footer').style.color = color;

    // Show the card and download button
    document.getElementById('id-card-container').classList.remove('hidden');
});

// Handle Downloading the ID Card
document.getElementById('download-btn').addEventListener('click', function() {
    const cardElement = document.getElementById('id-card');
    const originalBorder = cardElement.style.border;
    
    // html2canvas works best when it has a clear element to render
    html2canvas(cardElement, {
        scale: 2, // Higher quality image
        backgroundColor: "#ffffff",
        useCORS: true // Helps with rendering uploaded images
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Persocom_ID_${document.getElementById('out-name').innerText}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});
