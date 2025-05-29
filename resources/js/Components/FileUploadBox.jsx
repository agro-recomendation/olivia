// FileUploadBox.jsx
export default function FileUploadBox({ file, setFile, previewUrl, setPreviewUrl }) {
    return (
        <label htmlFor="upload" className="flex flex-col items-center w-full cursor-pointer mb-4">
            <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={e => {
                    const uploadedFile = e.target.files[0];
                    if (uploadedFile) {
                        setFile(uploadedFile);
                        setPreviewUrl(URL.createObjectURL(uploadedFile));
                    }
                }}
                className="hidden"
            />
            <div className="flex items-center w-full border mt-2 mb-8 border-white rounded-md overflow-hidden bg-opacity-80 bg-white" style={{ fontSize: 16 }}>
                <span className="bg-[#325700] text-white px-4 py-2 text-sm font-bold h-full flex items-center">
                    Pilih File
                </span>
                <span className="flex-1 px-4 py-2 bg-white text-gray-500 text-sm truncate h-full flex items-center">
                    {file ? file.name : 'Tidak ada file yang dipilih'}
                </span>
            </div>
            <div
                className="bg-[#D9D9D9] mt-6 rounded-2xl border-2 border-dashed border-[#2B4F00] px-4 py-10 flex flex-col items-center justify-center text-center space-y-4 relative min-h-[350px] w-full"
                style={{
                    ...(previewUrl
                        ? {
                              backgroundImage: `url(${previewUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              color: '#fff',
                              border: '2px solid #2B4F00',
                          }
                        : {}),
                    maxWidth: '100%', 
                }}
            >
                {!previewUrl && (
                    <>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-[#C7E7C7] flex items-center justify-center shadow-md">
                            <div className="text-[#2B4F00] text-3xl font-bold">+</div>
                        </div>
                        <p className="text-black font-livvic text-base font-semibold">Seret atau letakan file</p>
                    </>
                )}
                {previewUrl && (
                    <button
                        type="button"
                        onClick={() => {
                            setFile(null);
                            setPreviewUrl(null);
                        }}
                        className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 text-[#2B4F00] hover:bg-opacity-100"
                        title="Hapus gambar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </label>
    );
}