import { useState, useEffect } from 'react'
import { supabase } from '../src/lib/customSupabaseClient'
import { downloadFile, getFileUrl } from '../src/lib/uploadUtils'

export default function TestDownload() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from('past_questions')
        .select('*')
        .limit(5)
      
      if (!error) setFiles(data)
      setLoading(false)
    }
    fetchFiles()
  }, [])

  const handleDownload = async (file) => {
    const result = await downloadFile(file.file_path, `${file.course_code}.pdf`)
    if (result.success) {
      alert('Download started!')
    } else {
      alert('Download failed: ' + result.error)
    }
  }

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Download & View</h1>
      
      {files.map(file => (
        <div key={file.id} style={{ 
          border: '1px solid #ccc', 
          margin: '10px 0', 
          padding: '15px',
          borderRadius: '5px'
        }}>
          <h3>{file.course_title}</h3>
          <p>{file.course_code} - {file.session}</p>
          
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={() => handleDownload(file)}
              style={{ 
                padding: '8px 16px', 
                marginRight: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Download
            </button>
            
            <a 
              href={`/document/${file.id}`}
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#2196F3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              View Document
            </a>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <h4>Preview:</h4>
            <iframe 
              src={getFileUrl(file.file_path)}
              width="100%" 
              height="300px"
              style={{ border: '1px solid #ddd' }}
              title={file.course_title}
            />
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '20px' }}>
        <a href="/">← Back to Home</a>
      </div>
    </div>
  )
}