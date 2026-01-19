import { useState } from "react";
import QRCode from "react-qr-code"; // ✅ make sure this package is installed
import "./App.css";
function FileUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadFile = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    if (data.error) alert(data.error);
    else if (data.cid) {
      const link1 = "https://ipfs.io/ipfs/" + data.cid;
      setMessage(link1);
    } else {
      console.warn("No CID returned from backend");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      {message && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            File pinned! Access it here:{" "}
            <a href={message} target="_blank" rel="noopener noreferrer">
              {message}
            </a>
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
      <QRCode value={message} size={200} />
    </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
