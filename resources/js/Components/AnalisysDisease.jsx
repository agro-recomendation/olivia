import React from 'react';

export default function AnalisysDisease({ file, result }) {
  if (!result) return null;

  return (
    <div className="bg-[#325700] min-h-screen p-6 flex justify-center text-white font-sans">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="bg-[#325700] rounded-2xl p-2 w-full md:w-1/2 flex justify-center items-center">
          <img
            src={URL.createObjectURL(file)}
            alt="Tanaman yang diunggah"
            className="rounded-2xl object-cover max-h-[400px] w-full"
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-2">Hasil Deteksi Penyakit</h2>

          <div className="bg-[#4C6D00] rounded-xl p-4">
            <div className="text-lg font-semibold text-white mb-1">Penyakit</div>
            <div className="bg-[#FDF76D] text-[#3B5900] py-2 px-3 rounded-md font-medium">
              {result.predicted_label}
            </div>
          </div>

          <div className="bg-[#4C6D00] rounded-xl p-4">
            <div className="text-lg font-semibold text-white mb-1">Akurasi</div>
            <div className="bg-[#FDF76D] text-[#3B5900] py-2 px-3 rounded-md font-medium">
              {result.confidence ? (result.confidence * 100).toFixed(2) + '%' : '-'}
            </div>
          </div>

          <div className="bg-[#4C6D00] rounded-xl p-4">
            <div className="text-lg font-semibold text-white mb-1">Penjelasan</div>
            <div className="text-[#FDF76D] font-medium">
              {result.description}
            </div>
          </div>

          <div className="bg-[#4C6D00] rounded-xl p-4">
            <div className="text-lg font-semibold text-white mb-2">Penanganan</div>
            <ul className="list-disc list-inside text-[#FDF76D] space-y-1">
              {result.treatment?.split('\n').map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
