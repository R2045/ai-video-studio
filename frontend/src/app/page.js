"use client";
import { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">AI Video Studio</h1>

      <input type="file" accept="video/*" onChange={handleUpload} />

      {video && (
        <video src={video} controls className="mt-4 w-full max-w-lg" />
      )}
    </main>
  );
}