import React, { useEffect, useMemo, useState } from 'react'
import FileElement from './FileElement'
import axios from 'axios'
export default function Files() {
    const [files, setFiles] = useState([])
    const [appState, setAppState] = useState({loading:false, error:false})

    
    useEffect(() => {
        async function syncFiles(){
            const resp = await axios.get('http://<your-public-ip>:8008/sync')
            setFiles(resp.data.files)
            console.log(resp.data.files)
        }
        syncFiles()
    }, [])

    async function handleUpload(e){
        try {
            e.preventDefault()
            setAppState({
                loading: true,
                error:false
            })
            const formData = new FormData(e.target)
            console.log(formData)
            const resp = await axios.post('http://<your-public-ip>:8008/upload-file', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setFiles(resp.data.files)

            setAppState({
                loading:false,
                error:false
            })
        } catch (error) {
            console.error(error);
            setAppState({
                loading:false,
                error:true
            })
        }
    }

  return (
    <div>
        <div style={{display:"grid"}} className="">
        {files.map((filename,i) => {
            return <FileElement utils={{setFiles, setAppState}} key={i} filename={filename} />
        })}

        </div>
        <form onSubmit={handleUpload}>
            <input multiple type="file" name="upload" />
            <button>Submit</button>
        </form>
        {
            appState.loading && (
                <p>Please Stand by</p>
            )
        }
        {
            appState.error && (
                <p>Error occured, please double check everything</p>
            )
        }
    </div>
  )
}
