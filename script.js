document.getElementById('generate-btn').addEventListener('click', function() {
    const name = document.getElementById('p-name').value.trim();
    const color = document.getElementById('p-color').value;
    const keywordsInput = document.getElementById('p-keywords').value.trim();

    if (!name || !keywordsInput) {
        alert("Please enter all required parameters to initialize.");
        return;
    }

    // Split keywords into an array
    const keywords = keywordsInput.split(',').map(k => k.trim().toLowerCase());
    
    // Simple hash function to make the generation deterministic based on the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Lore Arrays
    const types = ["Custom-Built (Full-Size)", "Mass-Produced (Full-Size)", "Mobile (Miniature)", "Chobit-Class (Unverified)"];
    const manufacturers = ["Piffle Princess", "Rozen Inc.", "Custom/Independent Hobbyist", "Cybernetics Y", "Unknown/Unregistered"];
    
    // Select data based on hash
    const typeIndex = Math.abs(hash) % types.length;
    const mfgIndex = Math.abs(hash * 2) % manufacturers.length;
    
    const persocomType = types[typeIndex];
    const manufacturer = manufacturers[mfgIndex];
    
    // Generate Serial Number (e.g., PC-84A-992)
    const serial = `PC-${Math.abs(hash).toString().substring(0, 3).padStart(3, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;
    
    // Determine primary function from the first keyword provided
    const primaryFunction = keywords[0] ? `Optimization for ${keywords[0]}` : "General Purpose Assistance";
    
    // Determine OS based on Type
    let os = "Standard OS v2.4";
    if (persocomType.includes("Custom")) os = "Homebrew / Unlicensed OS";
    if (persocomType.includes("Chobit")) os = "Self-Learning Neural Net";
    if (persocomType.includes("Mobile")) os = "Mobile Light OS";

    // Update the DOM
    document.getElementById('out-name').innerText = name.toUpperCase();
    document.getElementById('out-serial').innerText = serial;
    document.getElementById('out-type').innerText = persocomType;
    document.getElementById('out-os').innerText = os;
    document.getElementById('out-function').innerText = primaryFunction.toUpperCase();
    document.getElementById('out-manufacturer').innerText = manufacturer.toUpperCase();

    // Apply color styling
    const avatar = document.getElementById('avatar-bg');
    avatar.style.backgroundColor = color;
    avatar.innerText = name.charAt(0).toUpperCase();
    document.getElementById('card-footer').style.color = color;

    // Show the card
    document.getElementById('id-card-container').classList.remove('hidden');
});
