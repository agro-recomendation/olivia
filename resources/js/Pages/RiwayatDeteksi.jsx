import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { format } from 'date-fns';
import { router } from '@inertiajs/react';

export default function RiwayatDeteksi({ histories = [] }) {
  const [data, setData] = useState(histories);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (item) => {
    setSelectedResult(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus riwayat ini?')) return;
    router.delete(route('riwayat.deteksi.destroy', id), {
      onSuccess: () => setData((prev) => prev.filter((item) => item.id !== id)),
    });
    if (selectedResult && selectedResult.id === id) setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#325700]">
      <Sidebar active="riwayat.deteksi" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-livvic font-bold text-white mb-8">Riwayat Deteksi Penyakit Tanaman</h1>
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#2B4F00] text-white">
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Nama Penyakit</th>
                <th className="px-4 py-2 text-left">Gambar</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">Belum ada riwayat deteksi penyakit.</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2">
                      {item.created_at ? format(new Date(item.created_at), 'dd/MM/yyyy HH:mm') : '-'}
                    </td>
                    <td className="px-4 py-2">
                      {item.disease?.name || '-'}
                    </td>
                    <td className="px-4 py-2">
                      {item.image_path ? (
                        <img
                          src={`/storage/${item.image_path}`}
                          alt="Tanaman"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : '-'}
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

        {/* Modal untuk detail deteksi */}
        {showModal && selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-[#325700] rounded-[32px] p-6 max-w-md w-full text-white relative">
              <h2 className="text-xl font-livvic text-[#F8E559] font-bold mb-4 text-center">Detail Hasil Analisis</h2>
              <div className="flex justify-center mb-4">
                {selectedResult.image_path ? (
                  <img
                    src={`/storage/${selectedResult.image_path}`}
                    alt="Tanaman"
                    className="w-40 h-40 rounded-[20px] object-cover"
                  />
                ) : (
                  <div className="text-gray-300">Tidak ada gambar</div>
                )}
              </div>

              <div className="space-y-2 text-sm font-livvic">
          <div className="flex items-start">
            <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">Penyakit</span>
            <span className="mx-2">:</span>
            <span className="flex-1">{selectedResult.disease?.name || '-'}</span>
          </div>
          <div className="flex items-start">
            <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">Akurasi</span>
            <span className="mx-2">:</span>
            <span className="flex-1">{selectedResult.accuracy ? (selectedResult.accuracy * 100).toFixed(0) + '%' : '-'}</span>
          </div>
          <div className="flex items-start">
            <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">Penjelasan</span>
            <span className="mx-2">:</span>
            <span className="flex-1">{selectedResult.disease?.description || '-'}</span>
          </div>
          <div className="flex items-start">
            <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">Penanganan</span>
            <span className="mx-2">:</span>
            <span className="flex-1">{selectedResult.disease?.treatment || '-'}</span>
          </div>
        </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-[#F8E559] font-livvic text-[#325700] px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
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