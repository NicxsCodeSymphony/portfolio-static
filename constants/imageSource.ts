export const fallbackImages = ["/assets/fallback.png"];

const getGoogleDriveImageUrl = (fileId: string) => {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

export const getImageSource = (imageUrl: string, fallbackImage: string) => {
    if (!imageUrl) return fallbackImage;
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
    if (imageUrl.startsWith("/")) return imageUrl;
    if (/^[a-zA-Z0-9_-]+$/.test(imageUrl)) return getGoogleDriveImageUrl(imageUrl);
    return fallbackImage;
};