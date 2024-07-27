// src/components/WardrobeManagement.js
import React, { useState, useEffect, useRef } from 'react';
import './WardrobeManagement.css';

const WardrobeManagement = () => {
  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem('images');
    return savedImages ? JSON.parse(savedImages) : [];
  });
  const [tempImage, setTempImage] = useState(null);
  const [category, setCategory] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [color, setColor] = useState('');
  const [deletedImage, setDeletedImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const undoTimeoutRef = useRef(null);

  const categories = ['Tops', 'Bottoms', 'Footwear', 'Accessories', 'Outerwear'];

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setTempImage({
        url: URL.createObjectURL(file),
        file,
      });
    } else {
      alert('Only JPEG and PNG images are allowed');
    }
  };

  const handleAddImage = () => {
    if (tempImage) {
      const newImage = {
        url: tempImage.url,
        category,
        type: clothingType,
        color
      };
      setImages([...images, newImage]);
      setTempImage(null);
      setCategory('');
      setClothingType('');
      setColor('');
      setShowUploadSection(false); // Hide the upload section after adding
    }
  };

  const handleRemoveImage = (index) => {
    const confirmed = window.confirm('Are you sure you want to remove this item?');
    if (confirmed) {
      const removedImage = images[index];
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      setDeletedImage(removedImage);
      clearTimeout(undoTimeoutRef.current);
      undoTimeoutRef.current = setTimeout(() => setDeletedImage(null), 5000); // 5-second timeout
    }
  };

  const handleUndoDelete = () => {
    if (deletedImage) {
      setImages([...images, deletedImage]);
      setDeletedImage(null);
      clearTimeout(undoTimeoutRef.current);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <h2>Wardrobe Management</h2>
      <button onClick={() => setShowUploadSection(!showUploadSection)}>
        {showUploadSection ? 'Hide Add Image' : 'Start Adding Images'}
      </button>
      {showUploadSection && (
        <div>
          <p>Please select an image, then provide details before adding it to your wardrobe.</p>
          <input type="file" onChange={handleFileUpload} accept="image/jpeg, image/png" />
          {tempImage && (
            <div>
              <img src={tempImage.url} alt="Preview" className="image-preview" />
              <div>
                <label>
                  Category:
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Type:
                  <input
                    type="text"
                    value={clothingType}
                    onChange={(e) => setClothingType(e.target.value)}
                    placeholder="e.g., Shirt, Pants"
                  />
                </label>
                <label>
                  Color:
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g., Red, Blue"
                  />
                </label>
                <button onClick={handleAddImage}>Add to Wardrobe</button>
              </div>
            </div>
          )}
        </div>
      )}
      <button onClick={toggleEditMode}>{editMode ? 'Done' : 'Edit'}</button>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={`Clothing item ${index}`} className="image-item" />
            <p>Category: {image.category}</p>
            <p>Type: {image.type}</p>
            <p>Color: {image.color}</p>
            {editMode && <button onClick={() => handleRemoveImage(index)}>Remove</button>}
          </div>
        ))}
      </div>
      {deletedImage && (
        <div className="undo-section">
          <p>Item removed. <button onClick={handleUndoDelete}>Undo</button></p>
        </div>
      )}
    </div>
  );
};

export default WardrobeManagement;
