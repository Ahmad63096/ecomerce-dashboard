import React, { useState } from "react";
function Configcode() {
  const [copySuccess, setCopySuccess] = useState("");
  const embedCode = `<iframe src="https://devbot.devspandas.com/" 
      style="width: 400px; 
      height: 700px; 
      border: none; 
      position: fixed; 
      bottom: 20px;
      right: 20px; 
      z-index: 9999;">
  </iframe>`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopySuccess("Copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 3000); // Clear success message after 3 seconds
    } catch (err) {
      setCopySuccess("Failed to copy. Please try again!");
      console.error("Error copying text: ", err);
    }
  };
  return (
    <div className="p-4 m-3  settings-container ">
      <div style={{ display: 'flex', gap: '20px' }}>
        <h2>Embed Code</h2>
        <button
          className="btn btn-primary mb-2"
          onClick={handleCopy}
        >
          Copy Code
        </button>
      </div>
      <p>
        Copy and paste the following code into your website to embed:
      </p>
      <pre className="bg-dark text-white p-3 rounded" style={{ width: '50%' }}>
        {embedCode}
      </pre>
      {copySuccess && (
        <p className="mt-2">{copySuccess}</p>
      )}
    </div>
  )
}
export default Configcode