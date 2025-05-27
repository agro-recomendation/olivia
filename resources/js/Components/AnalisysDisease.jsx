import React from 'react';

export default function AnalysisDisease({ alamat, fileUrl }) {
  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4">
      <div className="mt-10 w-full max-w-3xl bg-[#325700] rounded-2xl p-6 text-white flex flex-col md:flex-row gap-6 font-poppins">

        {/* Gambar */}
        <div className="flex-1 flex items-center justify-center border-2 border-[#2B4F00] rounded-xl overflow-hidden max-h-[400px]">
          {fileUrl ? (
            <img
              src={`/storage/${fileUrl}`}
              alt="Tanaman"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-[#C7E7C7] italic">Tidak ada gambar</div>
          )}
        </div>

        {/* Detail Analisis */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#2B4F00] rounded-xl p-4">
            <h3 className="font-livvic font-bold text-lg">Nama penyakit</h3>
            <p className="bg-[#F6EB73] text-[#325700] mt-2 px-4 py-2 rounded font-semibold">
              {alamat || 'Kecamatan Milir'}
            </p>
          </div>

          <div className="bg-[#2B4F00] rounded-xl p-4">
            <h3 className="font-livvic font-bold text-lg">Jenis penyakit</h3>
            <p className="bg-[#F6EB73] text-[#325700] mt-2 px-4 py-2 rounded font-semibold">
              Menular
            </p>
          </div>

          <div className="bg-[#2B4F00] rounded-xl p-4">
            <h3 className="font-livvic font-bold text-lg">Saran penanganan</h3>
            <ul className="list-disc ml-6 mt-3 text-sm text-white font-poppins">
              <li>Bersihkan area yang terdampak</li>
              <li>Hindari penyiraman berlebihan</li>
              <li>Gunakan fungsida</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
