import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = async () => {
    // Replace with your Figma OAuth client ID
    const clientId = '';
    const redirectUri = window.location.origin;
    window.location.href = `https://www.figma.com/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=files:read&state=random`;
  };

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // Exchange code for access token (requires backend endpoint)
      // setAccessToken(token);
    }
  }, []);

  const fetchFiles = async () => {
    if (!accessToken) return;
    
    try {
      const response = await axios.get('https://api.figma.com/v1/me/files', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!accessToken ? (
            <div className="text-center">
              <button
                onClick={handleLogin}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Connect to Figma
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file: any) => (
                <div
                  key={file.key}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {file.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Last modified: {new Date(file.last_modified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;