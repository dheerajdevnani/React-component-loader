import React, { useState } from 'react';
import './ImageComponent.css';

const ImageComponent = () => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
          setErrorMessage('');
        };
        reader.readAsDataURL(file);
      } else {
        setErrorMessage('Only JPG/PNG format supported');
      }
    }
  };

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleUrlSubmit = (event) => {
    event.preventDefault();
    if (inputUrl) {
      setImageSrc(inputUrl);
      setInputUrl('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a URL');
    }
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500); 
  };

  return (
    <div className="image-wrapper">
      <div className="input-container">
        <input type="file" onChange={handleFileChange} />
        <form onSubmit={handleUrlSubmit}>
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            placeholder="Enter image URL"
          />
          <button type="submit">Load Image</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      {imageSrc && (
        <div
          className={`image-container ${loading ? 'loading' : ''}`}
          onClick={handleClick}
        >
          <img src={imageSrc} alt="Selected" />
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
