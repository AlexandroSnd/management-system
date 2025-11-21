import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; 

interface AdGalleryProps {
    images: string[];
}

const formatImages = (images: string[]): ReactImageGalleryItem[] => {
    return images.map(url => ({
        original: url,
        thumbnail: url,
    }));
};

export const AdGallery = ({ images }: AdGalleryProps) => {
    if (!images || images.length === 0) {
        return <div>Нет изображений для отображения.</div>;
    }

    const galleryItems = formatImages(images);

    return (
        <div className="w-full">
            <ImageGallery 
                items={galleryItems} 
                showPlayButton={false}
                showFullscreenButton={true} 
                showNav={true} 
                showThumbnails={true} 
                lazyLoad={true} 
            />
        </div>
    );
};