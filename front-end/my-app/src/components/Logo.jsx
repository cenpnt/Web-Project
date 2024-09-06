import React from 'react';

function Logo({ src, alt, width }) {
    return (
      <div className="logoContainer">
        <img src={src} alt={alt} width={width} />
      </div>
    );
  }

export default Logo