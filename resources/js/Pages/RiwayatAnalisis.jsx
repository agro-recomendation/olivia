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
            <div className="bg-[#2B4F00] rounded-2xl p-6 max-w-2xl w-full relative">
              <button
                className="absolute top-3 right-3 text-white text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Tutup"
              >
                &times;
              </button>
              <AnalysisResult result={{
                soil: selectedResult.soil,
                weather: selectedResult.weather,
                plants: selectedResult.plants,
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}