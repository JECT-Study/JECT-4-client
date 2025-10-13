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

            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 선택할 수 있습니다.');
                return;
            }
            const MAX_FILE_SIZE = 5 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                alert('파일 크기는 5MB를 초과할 수 없습니다.');
                return;
            }

            setSelectedFile(file);
            onFileSelect?.(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreviewUrl(reader.result);
                }
            };
            reader.onerror = () => {
                alert('파일을 읽는 중 오류가 발생했습니다.');
                setSelectedFile(null);
                onFileSelect?.(null);
            };
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
