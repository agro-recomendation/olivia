import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

function AnalysisDisease({ file, user_id }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);
    if (user_id) formData.append('user_id', user_id);

    fetch('/api/disease/analyze', {
      method: 'POST',
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Gagal analisis');
        const data = await res.json();
        setResult(data);
      })
      .catch(() => setError('Gagal melakukan analisis.'))
      .finally(() => setLoading(false));
  }, [file, user_id]);

  if (loading) return <div className="text-white">Analisis gambar...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl p-6 mt-8 shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2 text-[#2B4F00]">Hasil Deteksi Penyakit</h2>
      {/* Tampilkan gambar hasil upload */}
      <div className="mb-4 flex justify-center">
        <img
          src={URL.createObjectURL(file)}
          alt="Tanaman yang diunggah"
          className="max-h-64 rounded shadow"
        />
      </div>
      <div><strong>Penyakit:</strong> {result.predicted_label}</div>
      <div><strong>Akurasi:</strong> {result.confidence ? (result.confidence * 100).toFixed(2) + '%' : '-'}</div>
      <div className="mt-2"><strong>Penjelasan:</strong> {result.description}</div>
      <div className="mt-2"><strong>Penanganan:</strong> {result.treatment}</div>
    </div>
  );
}

export default function DeteksiPenyakitTanaman({ auth }) {
  const [file, setFile] = useState(null);  
  const [alamat, setAlamat] = useState('');
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
      {showAnalysis && (
        <AnalysisDisease
          file={file}
          user_id={auth?.user ? auth.user.id : null}
        />
      )}
    </div>
  );
}
