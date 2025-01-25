import React, { useState } from 'react';
import { Plus, Save, Trash2, Image as ImageIcon } from 'lucide-react';
import type { CollageImage } from '../types';

interface CollageEditorProps {
  onSave: (name: string, images: CollageImage[]) => void;
}

export default function CollageEditor({ onSave }: CollageEditorProps) {
  const [name, setName] = useState('');
  const [images, setImages] = useState<CollageImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: CollageImage = {
            id: Math.random().toString(36).substr(2, 9),
            url: event.target?.result as string,
            position: { x: 0, y: 0 },
            size: { width: 200, height: 200 }
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (name && images.length > 0) {
      onSave(name, images);
      setName('');
      setImages([]);
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Create New Memory Collection</h2>
        <p className="text-sm text-gray-500">Combine your favorite university moments into a beautiful collage</p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="collage-name" className="block text-sm font-medium text-gray-700 mb-2">
            Collection Name
          </label>
          <input
            id="collage-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Graduation Day 2024, Campus Festival"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`min-h-[400px] border-2 border-dashed rounded-lg p-4 transition-colors ${
            isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
        >
          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ImageIcon size={48} className="mb-2 text-green-700" />
              <p className="text-center">
                <span className="block font-medium">Drop your images here</span>
                <span className="text-sm">or click to select files</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group aspect-square">
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!name || images.length === 0}
            className="px-6 py-2 bg-green-700 text-white rounded-lg flex items-center gap-2 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={20} />
            Save Collection
          </button>
        </div>
      </div>
    </div>
  );
}