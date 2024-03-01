'use client'

import { useState } from 'react'
import {getSignedURL} from "@/app/actions"

export default function Form() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [content, setContent] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0] ?? null;
	setFile(file);
	if (previewUrl) {
	    URL.revokeObjectURL(previewUrl);
	}
	if (file) {
	    const url = URL.createObjectURL(file);
	    setPreviewUrl(url);
	} else {
	    setPreviewUrl(null);
	}
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	if (file) {
	    const signedURLResult = await getSignedURL()
}

	    const { url } = signedURLResult.success
	    console.log({url})
	}
	setStatusMessage("creating");
	setLoading(true);
	
	console.log(content, file);

	setStatusMessage("created");
	setLoading(false);
    };   


  return (
      <form onSubmit={handleSubmit}>
          <input
              className="bg-transparent flex-1 border-none outline-none hidden"
              name="media"
              type="file"
              accept="image/jpeg,image/png,image/webp"
	      onChange={handleFileChange}
          />
	 {previewUrl && file && (
		  <div className="mt-4">
		      {file.type.startsWith("image/") ? (
			  <img src={previewUrl} alt="Selected file" />
		      ) : file.type.startsWith("video/") ? (
			  <video src={previewUrl} controls />
		      ) : null}
		  </div>
	      )}
        <button type="submit" disabled={uploading}>
          Upload
        </button>
      </form>
  );
}
