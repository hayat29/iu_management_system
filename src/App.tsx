import React, { useState } from 'react';
import { ImagePlus, Images, GraduationCap, Building2 } from 'lucide-react';
import CollageEditor from './components/CollageEditor';
import CollageGallery from './components/CollageGallery';
import type { Collage, CollageImage } from './types';

function App() {
  const [collages, setCollages] = useState<Collage[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveCollage = (name: string, images: CollageImage[]) => {
    const newCollage: Collage = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      images,
      createdAt: new Date(),
    };
    setCollages(prev => [newCollage, ...prev]);
    setIsCreating(false);
  };

  const handleDeleteCollage = (id: string) => {
    setCollages(prev => prev.filter(collage => collage.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <GraduationCap className="h-8 w-8 text-green-700" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">IU Memories</h1>
                <p className="text-sm text-green-100">Integral University, Lucknow</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="px-4 py-2 bg-white text-green-700 rounded-lg flex items-center gap-2 hover:bg-green-50 transition-colors shadow-sm"
            >
              <ImagePlus size={20} />
              {isCreating ? 'Cancel' : 'Create Collage'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3 text-green-800">
            <Building2 className="h-5 w-5" />
            <p className="text-sm">Capture and preserve your memories from Integral University</p>
          </div>
        </div>

        <main>
          {isCreating ? (
            <CollageEditor onSave={handleSaveCollage} />
          ) : (
            <>
              {collages.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <Images className="mx-auto h-12 w-12 text-green-700" />
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">No collages yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Start creating your university memories collection</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsCreating(true)}
                      className="px-6 py-3 bg-green-700 text-white rounded-lg flex items-center gap-2 hover:bg-green-800 mx-auto transition-colors"
                    >
                      <ImagePlus size={20} />
                      Create Your First Collage
                    </button>
                  </div>
                </div>
              ) : (
                <CollageGallery 
                  collages={collages} 
                  onDelete={handleDeleteCollage}
                />
              )}
            </>
          )}
        </main>
      </div>

      <footer className="mt-auto py-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Integral University - Student Memories Collection</p>
      </footer>
    </div>
  );
}

export default App;