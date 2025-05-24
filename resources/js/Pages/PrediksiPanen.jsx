import React, { useState } from 'react';

export default function PrediksiPanen() {
  const [lokasi, setLokasi] = useState('');
  const [jenisTanaman, setJenisTanaman] = useState('Padi');
  const [kelembapan, setKelembapan] = useState('');
  const [showHasil, setShowHasil] = useState(false);

  const handleBack = () => window.history.back();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowHasil(true); // Nanti bisa diganti untuk menampilkan hasil analisis
  };

  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4 font-poppins">
      {/* Tombol kembali dan judul */}
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
          Prediksi Musim Tanam & Panen
        </h1>
      </div>

      {/* Form input */}
      {!showHasil && (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-[#406800] rounded-xl p-6 space-y-6 text-white">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Lokasi</label>
              <input
                type="text"
                placeholder="Kec. ABC"
                className="px-4 py-2 rounded bg-[#D9D9D9] text-black focus:outline-none"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Jenis Tanaman</label>
              <select
                className="px-4 py-2 rounded bg-[#D9D9D9] text-black focus:outline-none"
                value={jenisTanaman}
                onChange={(e) => setJenisTanaman(e.target.value)}
              >
                <option value="Padi">Padi</option>
                <option value="Jagung">Jagung</option>
                <option value="Kedelai">Kedelai</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Kelembapan</label>
              <input
                type="number"
                placeholder="Contoh: 27"
                className="px-4 py-2 rounded bg-[#D9D9D9] text-black focus:outline-none"
                value={kelembapan}
                onChange={(e) => setKelembapan(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#F6EB73] text-[#325700] font-livvic px-6 py-2 rounded hover:bg-yellow-400"
              >
                Analisis
              </button>
            </div>
          </div>
        </form>
      )}

      {showHasil && (
        <div className="mt-10 text-white text-xl font-semibold">
          {/* Contoh hasil, bisa diganti dengan komponen hasil analisis */}
          <p>Hasil prediksi untuk {jenisTanaman} di {lokasi} dengan kelembapan {kelembapan}% telah tersedia.</p>
        </div>
      )}
    </div>
  );
}
