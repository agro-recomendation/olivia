import React, { useState } from 'react';

export default function DeteksiPenyakitTanaman() {
  const [file, setFile] = useState(null);  
  const [alamat, setAlamat] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan pengiriman file dan alamat ke server di sini
    console.log('Alamat:', alamat);
    console.log('File:', file);
  };

  return (
    <div className="min-h-screen bg-[#295D1E] flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold font-livvic text-[#F6EB73] mb-8">
        Deteksi Penyakit Tanaman
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6 font-poppins ">
          <input
            type="text"
            placeholder="Masukkan alamat tanaman yang ingin diidentifikasi"
            className="flex-1 px-4 py-2 rounded bg-[#D9D9D9] focus:outline-none"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#F6EB73] font-livvic  text-black font-semibold px-6 py-2 rounded hover:bg-yellow-400"
          >
            Cek Tanaman
          </button>
        </div>

        {/* Dropzone / Upload Area */}
        <div className="rounded bg-[#D9D9D9] border-2 border-dashed border-gray-400 rounded-2xl py-12 px-4 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md mb-4">
            <span className="text-3xl font-livvic text-green-600">+</span>
          </div>
          <p className="font-semibold font-livvic text-gray-700 mb-4">Seret atau letakkan file</p>
          <label className="bg-[#2E4D1C] font-poppins text-white px-4 py-2 rounded cursor-pointer hover:bg-[#3a6326] inline-block">
            Pilih File
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-2 text-sm text-gray-700 font-poppins">
            {file ? file.name : 'Tidak ada file yang dipilih'}
          </p>
        </div>
      </form>
    </div>
  );
}
