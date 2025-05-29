import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import FileInputBox from '@/Components/FileInputBox';
import FileUploadBox from '@/Components/FileUploadBox';

export default function DeteksiPenyakitTanaman() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleBack = () => window.history.back();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4">
      <div
        className="flex items-center mb-6 mt-6 self-start space-x-4 cursor-pointer text-[#FFFA72]"
        onClick={handleBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-9 h-9"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <h1 className="font-livvic font-bold text-4xl md:text-[35px] leading-tight text-[#FFFA72]">
          Deteksi Penyakit Tanaman
        </h1>
      </div>

      {!showAnalysis && (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6 font-poppins">
          <label className="block text-white font-livvic font-bold text-lg ">
            Foto Tanaman
          </label>
          <FileInputBox
            file={file}
            setFile={setFile}
            setPreviewUrl={setPreviewUrl}
          />
          <FileUploadBox
            previewUrl={previewUrl}
            setFile={setFile}
            setPreviewUrl={setPreviewUrl}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#F6EB73] text-[#325700] font-thin font-livvic px-6 py-2 rounded hover:bg-yellow-400"
            >
              Cek Tanaman
            </button>
          </div>
        </form>
      )}

      {/* Tampilkan hasil analisis */}
      {showAnalysis && <AnalysisDisease file={file} />}
    </div>
  );
}
