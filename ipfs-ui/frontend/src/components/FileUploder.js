
import { useState } from "react";

export default function FileUploader() {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const uploadFile = async () => {
        if (!file) return alert("Select a file first");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (data.error) alert(data.error);
        else setCid(data.cid);
    };

    const startIpfs = async () => {
        const res = await fetch("http://localhost:5000/start-ipfs", { method: "POST" });
        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <button onClick={startIpfs}>Start IPFS</button>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Add & Pin File</button>
            {cid && <p>File pinned! CID: {cid}</p>}
        </div>
    );
}
