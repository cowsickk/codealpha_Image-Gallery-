const imageCategories = {
    car: [
    "https://www.bmw.com.sg/content/dam/bmw/common/all-models/m-series/series-overview/bmw-m-series-seo-overview-ms-04.jpg",
    "https://media.zigcdn.com/media/model/2025/Nov/model-extimg-718324603_600x400.jpg",
    "https://images.hindustantimes.com/auto/img/2024/12/10/600x338/Mercedes_G-Class_electric_1720591625231_1733826912567.jpg",
    "https://autovista24.autovistagroup.com/wp-content/uploads/sites/5/2022/05/d662614-1024x640.jpg",
    "https://a.storyblok.com/f/322327/5760x2850/bfd3b7659e/cz26w10ox0002-911-turbo-s-rear-desktop.jpg/m/2560x1440/smart/filters:format(webp)",
    "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/evo/2022/10_06/over/hura_evo_over_01_m.jpg",
    "https://5.imimg.com/data5/BI/XG/MY-13294402/rolls-royce-phantom-car-500x500.png"
    ],
    nature: [
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80",
    "https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg",
    "https://eduindex.org/wp-content/uploads/2021/07/1913623.jpg?w=1024"
    ],
    cricket: [
    "https://i.pinimg.com/736x/1d/5c/4f/1d5c4f46ee81521c9d74b0d1278bbff3.jpg",
    "https://media.gettyimages.com/id/2159875454/photo/bridgetown-barbados-rohit-sharma-of-india-lifts-the-icc-mens-t20-cricket-world-cup-trophy.jpg?s=612x612&w=gi&k=20&c=kXF5jsHIOkW0y6TKpxCJAgw0SgvAmlT0UrOHtqeyu3w=",
    "https://wallpapers.com/images/hd/rohit-sharma-cricket-captain-gg4t07rve53522b7.jpg",
    "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/237400/237471.jpg",
    ],
    people: [
     "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/01/1f/e6/44/b1/v1_E10/E102BHYV.jpg?w=500&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=315bef5dfe9efe9bc22b1aeab148440c3b845f358d307881392adb7582596130",
    "https://www.workitdaily.com/media-library/woman-stands-with-her-coworkers-professional-network.jpg?id=26606401&width=1245&height=700&coordinates=0%2C31%2C0%2C10",
    "https://krconnect.blog/wp-content/uploads/2023/06/Happy-People-2.jpeg"
    ],
    videos: [
        "Recording 2025-12-21 110837.mp4",
        "Recording 2025-12-22 113858.mp4",
        "Recording 2025-12-20 205855.mp4"
    ]
};

function openFolder(category) {
    const grid = document.getElementById('gallery-grid');
    const sub = document.getElementById('sub-gallery');
    const title = document.getElementById('gallery-title');
    const backBtn = document.getElementById('back-btn');
    grid.style.display = 'none';
    sub.style.display = 'grid';
    sub.innerHTML = ''; 
    title.innerText = category.toUpperCase();
    backBtn.style.display = 'inline-block';
    currentItems = imageCategories[category];

   
    currentItems.forEach((file, index) => {
        const isVideo = file.toLowerCase().endsWith('.mp4');
        const card = document.createElement('div');
        card.className = 'folder';
        
        card.innerHTML = isVideo 
            ? `<div class="thumb-wrapper"><video src="${file}" muted></video></div>`
            : `<div class="thumb-wrapper"><img src="${file}"></div>`;
        
        // Open lightbox at this specific index
        card.onclick = () => openLightbox(index);
        sub.appendChild(card);
    });
}

function showMainGallery() {
    document.getElementById('gallery-grid').style.display = 'grid';
    document.getElementById('sub-gallery').style.display = 'none';
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('gallery-title').innerText = "Gallery";
}

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-content-container');
    container.innerHTML = ''; 
    lb.style.display = 'none';
}

function changeMedia(step, event) {
    if (event) event.stopPropagation();
    
    currentIndex += step;

  
    if (currentIndex >= currentItems.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentItems.length - 1;

    updateLightboxContent();
}

function updateLightboxContent() {
    const file = currentItems[currentIndex];
    const isVideo = file.toLowerCase().endsWith('.mp4');
    const container = document.getElementById('lightbox-content-container');
    
    // Smoothly update the media content
    container.innerHTML = isVideo 
        ? `<video src="${file}" controls autoplay style="max-width:100%; max-height:80vh;"></video>`
        : `<img src="${file}" style="max-width:100%; max-height:80vh;">`;
}

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (lb.style.display === 'flex') {
        if (e.key === "ArrowRight") changeMedia(1);
        if (e.key === "ArrowLeft") changeMedia(-1);
        if (e.key === "Escape") closeLightbox();
    }
});