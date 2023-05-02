import React from 'react'
import axios from 'axios'

export default function FileElement({ filename, utils }) {

  async function handleDelete() {
    try {
      utils.setAppState({
        loading: true,
        error: false
      })
      const resp = await axios.delete("http://<your-public-ip>:8008/delete", {
        params: {
          filename
        }
      })
      utils.setFiles(resp.data.files)

      utils.setAppState({
        loading: false,
        error: false
      })
    } catch (error) {
      console.error(error);
      utils.setAppState({
        loading: false,
        error: true
      })
    }
  }

  async function handleDownload() {
    const resp = await axios.get("http://<your-public-ip>:8008/retrieve", {
      params: {
        filename: filename
      },
    })
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); //or any other extension
    document.body.appendChild(link);
    link.click();
      
  }
  return (
    <div style={{display:'flex', justifyContent: "space-between", gap:"20px"}} className='file_block'>
      <p style={{ cursor: "pointer" }}>{filename}</p>
    <div className="">
      <button onClick={handleDownload} style={{ color: 'green' }}>Download</button>
      <button style={{color: "blue"}} onClick={() => {window.open(`http://<your-public-ip>:8008/retrieve?filename=${filename}`)}}>View</button>
      <button onClick={handleDelete} style={{ color: 'red' }}>X</button>

    </div>
    </div>
  )
}
