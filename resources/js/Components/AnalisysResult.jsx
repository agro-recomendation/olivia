import React from 'react';

export default function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="font-poppins text-white p-6 rounded-2xl w-full mx-auto space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-livvic font-bold">Hasil Rekomendasi</h2>

      {/* Kontainer Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Kiri - Lokasi & Jenis Tanah */}
        <div className=" bg-[#2B4F00] border border-white rounded-2xl p-4 w-full md:w-1/2 space-y-4">
          <div>
            <div className="text-lg font-livvic font-semibold mb-1">Lokasi</div>
            <div className="bg-[#FFF176] text-black px-4 py-2 rounded-lg font-medium">
              Kecamatan {result.soil?.location || '-'}
            </div>
          </div>
          <div>
            <div className="text-lg font-livvic font-semibold mb-1">Jenis Tanah</div>
            <div className="bg-[#FFF176] text-black px-4 py-2 rounded-lg font-medium">
              {result.soil?.type || '-'}
            </div>
          </div>
        </div>

        {/* Kanan - Data Cuaca dan Nutrisi */}
        <div className="bg-[#2B4F00] border border-white rounded-2xl p-4 w-full md:w-1/2 space-y-2">
          <div className="flex">
            <span className="font-bold font-livvic text-yellow-300 w-32 inline-block">Cuaca</span>
            <span className="mx-2">:</span>
            <span>{parseFloat(result.weather?.temperature).toFixed(2)}°C</span>
          </div>
          <div className="flex">
            <span className="font-bold font-livvic text-yellow-300 w-32 inline-block">pH</span>
            <span className="mx-2">:</span>
            <span>{parseFloat(result.soil?.pH).toFixed(7)}</span>
          </div>
          <div className="flex">
            <span className="font-bold font-livvic text-yellow-300 w-32 inline-block">Potassium</span>
            <span className="mx-2">:</span>
            <span>{parseFloat(result.soil?.K).toFixed(5)}</span>
          </div>
          <div className="flex">
            <span className="font-bold font-livvic text-yellow-300 w-32 inline-block">Nitrogen</span>
            <span className="mx-2">:</span>
            <span>{parseFloat(result.soil?.N).toFixed(5)}</span>
          </div>
          <div className="flex">
            <span className="font-bold font-livvic text-yellow-300 w-32 inline-block">Phosphorus</span>
            <span className="mx-2">:</span>
            <span>{parseFloat(result.soil?.P).toFixed(5)}</span>
          </div>
        </div>
      </div>

      {/* Tanaman yang Cocok */}
      {result.plants && result.plants.length > 0 && (
        <div className="bg-[#2B4F00] border border-white rounded-2xl p-4 space-y-4">
          <h3 className="text-lg font-livvic font-bold">Tanaman yang cocok</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {result.plants.map((plant) => (
              <div
                key={plant.id}
                className="bg-[#2B4F00] border border-white rounded-xl py-4 px-2 text-center flex flex-col items-center space-y-1"
              >
                <div className="bg-white rounded-full w-20 h-20 flex justify-center items-center">
                  <img
                    src={plant.image || '/images/default-tanaman.png'}
                    alt={plant.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="font-semibold capitalize mt-2">{plant.name}</div>
                <div className="text-sm">{plant.recommendation_percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
