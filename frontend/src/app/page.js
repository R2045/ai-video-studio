"use client";
import { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState(null);
  const [text, setText] = useState("");
  const [script, setScript] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">AI Video Studio</h1>

      <div className="space-y-6">

        <div>
          <h2 className="text-xl mb-2">Upload Video</h2>
          <input type="file" accept="video/*" onChange={handleUpload} />
          {video && <video src={video} controls className="mt-4 w-full max-w-lg" />}
        </div>

        <div>
          <h2 className="text-xl mb-2">Add Text Overlay</h2>
          <input
            className="text-black p-2"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl mb-2">AI Voiceover Script</h2>
          <textarea
            className="text-black p-2 w-full max-w-lg"
            placeholder="Enter script..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </div>

        <button
  onClick={async () => {
    if (!video) return alert("Upload a video first");

    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("video", fileInput.files[0]);

    const response = await fetch("http://127.0.0.1:5000/trim", {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "trimmed.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }}
  style={{ background: "#0f0", padding: "0.5rem 1rem", marginTop: "1rem" }}
>
  Export Video (Trim)
</button>


      </div>

      {text && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded">
          {text}
        </div>
      )}
    </main>
  );
}
