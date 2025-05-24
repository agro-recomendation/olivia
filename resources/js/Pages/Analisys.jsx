import React, { useState, useEffect } from 'react';
import AnalysisResult from '@/Components/AnalisysResult';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Perbaikan ikon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
}

export default function Analisys() {
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState([-6.9824, 110.4091]); // Default koordinat
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBack = () => window.history.back();

  const handleLocationSearch = async () => {
    if (!location) return alert('Masukkan nama lokasi terlebih dahulu.');
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Lokasi tidak ditemukan.');
      }
    } catch (error) {
      console.error('Gagal mencari lokasi:', error);
      alert('Terjadi kesalahan saat mencari lokasi.');
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleAnalyze = async () => {
    if (!location || !file) {
      alert('Lokasi dan foto tanah harus diisi.');
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('location', location);
    formData.append('latitude', coords[0]);
    formData.append('longitude', coords[1]);
    formData.append('photo', file);

    try {
      const response = await fetch('/api/plant-analysis', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Response not ok');

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      setError('Gagal melakukan analisis. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 space-y-8"
      style={{ backgroundColor: '#325700', color: 'white' }}
    >
      {/* Judul dan Tombol Kembali */}
      <div
        className="flex items-center space-x-4 cursor-pointer text-[#FFFA72]"
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
          Analisis Potensi Tanaman
        </h1>
      </div>

      {/* Foto Lahan */}
      <Card className="p-6 font-poppins rounded-2xl border-none bg-[#325700]">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white font-livvic font-bold text-lg">Lokasi</Label>
            <div className="relative">
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="bandungan"
                className="w-full rounded-lg px-4 py-2 bg-[#2B4F00] text-white border border-white placeholder-white"
              />
              <Button
                onClick={handleLocationSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-0 hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-white font-livvic font-bold text-lg">Foto Lahan</Label>
            <div className="mt-2 bg-[#D9D9D9] rounded-2xl border-2 border-dashed border-[#2B4F00] px-4 py-10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-[#C7E7C7] flex items-center justify-center shadow-md">
                <div className="text-[#2B4F00] text-3xl font-bold">+</div>
              </div>
              <p className="text-black font-livvic text-base font-semibold">Seret atau letakan file</p>
              <label htmlFor="upload" className="flex flex-col items-center w-full">
                <Input
                  id="upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center w-full max-w-md border border-white rounded-md overflow-hidden">
                  <span className="bg-[#325700] text-white px-4 py-2 text-sm font-bold">
                    Pilih File
                  </span>
                  <span className="flex-1 px-4 py-2 bg-white text-gray-500 text-sm truncate">
                    {file ? file.name : 'Tidak ada file yang dipilih'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              className="w-full max-w-md mt-4 bg-[#FFFA72] text-[#325700] hover:bg-[#e6e666] font-livvic font-bold text-lg py-3 rounded"
              disabled={loading}
            >
              {loading ? 'Analisis...' : 'Analisis Potensi Tanaman'}
            </Button>
          </div>

          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      </Card>

      {/* Peta */}
      <div>
        <h2 className="text-2xl font-livvic font-bold mb-4 ml-5" style={{ color: '#FFFFFF' }}>
          Lokasi pada Peta
        </h2>
        <Card className="p-6 overflow-hidden border-none" style={{ backgroundColor: '#325700' }}>
          <MapContainer center={coords} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coords} />
            <ChangeMapView coords={coords} />
          </MapContainer>
        </Card>
      </div>

      {/* Hasil Analisis */}
      {analysisResult && <AnalysisResult result={analysisResult} />}
    </div>
  );
}
