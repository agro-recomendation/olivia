import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function DeteksiPenyakitTanaman() {
  const [file, setFile] = useState(null);  
  const [alamat, setAlamat] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleBack = () => window.history.back();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setShowAnalysis(true); // tampilkan komponen AnalysisDisease lokal
};

  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4">

      <div
        className="flex items-center mb-10 mt-6 self-start space-x-4 cursor-pointer text-[#FFFA72]"
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
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Masukkan alamat tanaman yang ingin diidentifikasi"
              className="flex-1 px-4 py-2 rounded bg-[#D9D9D9] focus:outline-none"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#F6EB73] text-[#325700] font-thin font-livvic px-6 py-2 rounded hover:bg-yellow-400"
            >
              Cek Tanaman
            </button>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-[#2B4F00] bg-[#D9D9D9] px-6 py-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-[#C7E7C7] flex items-center justify-center shadow-md">
              <span className="text-[#2B4F00] text-3xl font-bold">+</span>
            </div>
            <p className="text-black font-livvic text-base font-semibold">Seret atau letakan file</p>
            <label htmlFor="upload" className="flex flex-col items-center w-full">
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <div className="flex items-center w-full max-w-md border border-white rounded-md overflow-hidden">
                <span className="bg-[#325700] text-white px-4 py-2 text-sm font-bold">
                  Pilih File
                </span>
                <span className="flex-1 px-4 py-2 bg-white text-gray-500 text-sm truncate">
                  {file ? file.name : 'Tidak ada file yang dipilih'}
                </span>
              </div>
            </label>
          </div>
        </form>
      )}

      {/* Tampilkan hasil analisis */}
      {showAnalysis && <AnalysisDisease alamat={alamat} file={file} />}
    </div>
  );
}
