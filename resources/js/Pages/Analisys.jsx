import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix: Leaflet marker icon config (penting untuk Laravel + Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component untuk mengubah posisi peta
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
  const [coords, setCoords] = useState([-6.9824, 110.4091]); // Default: Semarang
  const [file, setFile] = useState(null);

  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cari lokasi pakai Nominatim OpenStreetMap
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
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Kirim data ke backend untuk analisis
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
    <div className="min-h-screen p-6 space-y-10" style={{ backgroundColor: '#325700', color: 'white' }}>
      <div className="space-y-4">
        <h1 className="font-livvic font-bold text-4xl md:text-[40px] leading-tight text-[#FFFA72]">
          Analisis Potensi Tanaman
        </h1>

        <Card
          className="p-6 font-poppins rounded-2xl space-y-4 border border-white"
          style={{ backgroundColor: '#2B4F00', color: 'white' }}
        >
          <div className="space-y-2">
            <Label>Lokasi</Label>
            <Input
              type="text"
              placeholder="Masukkan nama lokasi (contoh: Bandungan)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              onClick={handleLocationSearch}
              className="bg-[#FFFA72] text-[#325700] hover:bg-[#e6e666]"
            >
              Cari Lokasi
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Upload Foto Tanah</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {file && <p className="text-sm text-white">File terpilih: {file.name}</p>}
          </div>

          <Button
            onClick={handleAnalyze}
            className="bg-[#FFFA72] text-[#325700] hover:bg-[#e6e666]"
            disabled={loading}
          >
            {loading ? 'Analisis...' : 'Analisis Potensi Tanaman'}
          </Button>

          {error && <p className="text-red-400 mt-2">{error}</p>}
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#FFFA72' }}>
          Lokasi pada Peta
        </h2>
        <Card className="overflow-hidden border-none" style={{ backgroundColor: '#325700' }}>
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

      {analysisResult && (
        <Card
          className="p-6 font-poppins rounded-2xl space-y-4 border border-white"
          style={{ backgroundColor: '#2B4F00', color: 'white' }}
        >
          <h3 className="text-xl font-bold">Hasil Analisis</h3>
          <p><strong>Lokasi:</strong> {analysisResult.locationName}</p>
          <p><strong>Rekomendasi Tanaman:</strong> {analysisResult.recommendedPlants.join(', ')}</p>
          {/* Jika backend mengirim gambar hasil analisis, bisa ditampilkan di sini */}
          {analysisResult.analysisImage && (
            <img src={analysisResult.analysisImage} alt="Hasil Analisis" className="mt-4 rounded-lg" />
          )}
        </Card>
      )}
    </div>
  );
}
