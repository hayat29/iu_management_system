import React from 'react';
import type { Collage } from '../types';
import { Download, Trash2, Calendar } from 'lucide-react';

interface CollageGalleryProps {
  collages: Collage[];
  onDelete: (id: string) => void;
}

export default function CollageGallery({ collages, onDelete }: CollageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collages.map((collage) => (
        <div key={collage.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative aspect-square">
            <div className="grid grid-cols-2 gap-1 p-1 h-full">
              {collage.images.slice(0, 4).map((image, index) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ))}
              {collage.images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center">
                  <span className="text-lg font-medium">+{collage.images.length - 4} more</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                {collage.name}
              </h3>
              <div className="flex gap-2">
                <button 
                  className="p-2 text-green-700 hover:bg-green-50 rounded-full transition-colors"
                  title="Download collection"
                >
                  <Download size={20} />
                </button>
                <button 
                  onClick={() => onDelete(collage.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete collection"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <time dateTime={collage.createdAt.toISOString()}>
                {new Date(collage.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}