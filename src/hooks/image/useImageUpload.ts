import { useRef, useState } from 'react';

interface UseImageUploadProps {
    onFileSelect?: (file: File | null) => void;
}

export const useImageUpload = ({ onFileSelect }: UseImageUploadProps = {}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onFileSelect?.(file);

            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleAddPhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleEditImage = () => {
        setIsModalOpen(false);
        fileInputRef.current?.click();
    };

    const handleDeleteImage = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onFileSelect?.(null);
    };

    return {
        selectedFile,
        previewUrl,
        isModalOpen,
        fileInputRef,
        handleFileChange,
        handleAddPhotoClick,
        handleImageClick,
        handleEditImage,
        handleDeleteImage,
        setIsModalOpen,
    };
};
