import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { format } from 'date-fns';

export default function RiwayatDeteksi({ histories = [] }) {
  const [data, setData] = useState(histories);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (item) => {
    setSelectedResult(item);
    setShowModal(true);
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
                    <td className="px-4 py-2">
                      <button
                        className="bg-[#2B4F00] text-white px-3 py-1 rounded hover:bg-[#406e00] transition"
                        onClick={() => handleView(item)}
                      >
                        Lihat
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
            <div className="bg-[#2B4F00] rounded-2xl p-6 max-w-2xl w-full relative text-white">
              <button
                className="absolute top-3 right-3 text-white text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Tutup"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Detail Deteksi Penyakit</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex justify-center items-center">
                  {selectedResult.image_path ? (
                    <img
                      src={`/storage/${selectedResult.image_path}`}
                      alt="Tanaman"
                      className="w-48 h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-300">Tidak ada gambar</div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <span className="font-semibold">Tanggal:</span>{' '}
                    {selectedResult.created_at ? format(new Date(selectedResult.created_at), 'dd/MM/yyyy HH:mm') : '-'}
                  </div>
                  <div>
                    <span className="font-semibold">Nama Penyakit:</span>{' '}
                    {selectedResult.disease?.name || '-'}
                  </div>
                  <div>
                    <span className="font-semibold">Akurasi:</span>{' '}
                    {selectedResult.accuracy ? (selectedResult.accuracy * 100).toFixed(2) + '%' : '-'}
                  </div>
                  <div>
                    <span className="font-semibold">Penjelasan:</span>{' '}
                    {selectedResult.disease?.description || '-'}
                  </div>
                  <div>
                    <span className="font-semibold">Penanganan:</span>{' '}
                    {selectedResult.disease?.treatment || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}