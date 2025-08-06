const getImageUrl = (img: string) => {
    if (!img || typeof img !== 'string') {
        return '';
    }
    
    if (!img.includes("/") && img.length >= 25) {
        return `https://drive.google.com/uc?export=view&id=${img}`;
    }
    return img;
};

export default getImageUrl