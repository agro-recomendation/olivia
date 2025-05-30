import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import AnalysisResult from '@/Components/AnalisysResult';
import { format } from 'date-fns';
import { router } from '@inertiajs/react';

export default function RiwayatAnalisis({ histories = [] }) {
  const [data, setData] = useState(histories);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (item) => {
    console.log(item); // cek struktur data
    setSelectedResult(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus riwayat ini?')) return;
    router.delete(route('history.plant.recomendation.destroy', id), {
      onSuccess: () => setData((prev) => prev.filter((item) => item.id !== id)),
    });
    if (selectedResult && selectedResult.id === id) setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#325700]">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-livvic font-bold text-white mb-8">Riwayat Analisis</h1>
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#2B4F00] text-white">
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Lokasi</th>
                <th className="px-4 py-2 text-left">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8">Belum ada riwayat analisis.</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2">
                      {item.created_at ? format(new Date(item.created_at), 'dd/MM/yyyy HH:mm') : '-'}
                    </td>
                    <td className="px-4 py-2">
                      {item.soil?.location || '-'}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="bg-[#2B4F00] text-white px-3 py-1 rounded hover:bg-[#406e00] transition"
                        onClick={() => handleView(item)}
                      >
                        Lihat
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal untuk hasil analisis */}
        {showModal && selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-[#2B4F00] rounded-[24px] px-6 py-8 w-[90%] max-w-lg text-white shadow-lg relative">
              <h2 className="text-xl font-livvic text-[#F8E559] font-bold mb-4 text-center">Detail Hasil Analisis</h2>
              <div className="space-y-3 font-livvic text-base">
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Lokasi</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.location || selectedResult.location || '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Jenis Tanah</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">{selectedResult.soil?.type || selectedResult.soil?.soil_type || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Cuaca</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.temperature
                      ? parseFloat(selectedResult.soil.temperature).toFixed(2) + '°C'
                      : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">pH</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.pH ? parseFloat(selectedResult.soil.pH).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Potassium</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.K ? parseFloat(selectedResult.soil.K).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Nitrogen</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.N ? parseFloat(selectedResult.soil.N).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Phosphorus</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.P ? parseFloat(selectedResult.soil.P).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-[#F8E559] font-bold">Tanaman yang Cocok</span>
                  <span className="mx-1">:</span>
                  <div className="flex-1 space-y-1">
                    {selectedResult.plants && selectedResult.plants.length > 0 ? (
                      <ul className="list-disc list-inside ml-4">
                        {selectedResult.plants.map((plant) => (
                          <li key={plant.id}>
                            {plant.name}{' '}
                            {plant.recommendation_percentage !== undefined
                              ? `(${plant.recommendation_percentage}%)`
                              : plant.accuracy !== undefined
                              ? `(${plant.accuracy}%)`
                              : ''}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="bg-[#F8E559] font-livvic text-[#325700] font-bold px-6 py-2 rounded-md hover:bg-yellow-300 transition"
                  onClick={() => setShowModal(false)}
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}