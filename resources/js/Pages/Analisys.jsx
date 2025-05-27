import React, { useState, useEffect, useRef } from 'react';
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

// Tambahkan fungsi reverse geocoding
async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.display_name || '';
  } catch (error) {
    return '';
  }
}

export default function Analisys() {
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState([-6.9824, 110.4091]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef();

  // Fungsi pencarian lokasi otomatis saat mengetik
  useEffect(() => {
    if (!location) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        // Optional: handle error
      }
    }, 800);
    return () => clearTimeout(debounceRef.current);
  }, [location]);

  // Marker yang bisa digeser & update input lokasi
  function DraggableMarker() {
    const [position, setPosition] = useState(coords);
    const markerRef = useRef(null);

    useEffect(() => {
      setPosition(coords);
    }, [coords]);

    const eventHandlers = {
      dragend: async () => {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setCoords([newPos.lat, newPos.lng]);
          // Reverse geocode untuk update input lokasi
          const address = await reverseGeocode(newPos.lat, newPos.lng);
          setLocation(address);
        }
      },
    };

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      />
    );
  }

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
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
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

      {/* Layout 2 kolom */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Kiri: Lokasi & Peta */}
        <Card className="flex-1 p-6 font-poppins rounded-2xl border-none bg-[#325700]" >
          <Label className="text-white font-livvic font-bold text-lg">Lokasi</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="bandungan"
            className="w-full rounded-lg px-4 py-2 bg-[#2B4F00] text-white border border-white placeholder-white mt-2"
          />
          <h2 className="text-lg font-livvic font-bold mb-4 mt-4" style={{ color: '#FFFFFF' }}>
            Lokasi pada Peta
          </h2>
          <MapContainer center={coords} zoom={13} style={{ height: '350px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
            <ChangeMapView coords={coords} />
          </MapContainer>
          {/* <p className="text-white mt-2 text-sm">
            Lat: {coords[0].toFixed(6)}, Lng: {coords[1].toFixed(6)}
          </p> */}
        </Card>

        {/* Kanan: Upload Gambar */}
        <Card className="flex-1 p-6 font-poppins mb-8 rounded-2xl border-none bg-[#325700] flex flex-col justify-between">
          <Label className="text-white font-livvic font-bold text-lg">Foto Lahan</Label>
          
          {/* Pindahkan input file ke atas frame gambar */}
          <label htmlFor="upload" className="flex flex-col items-center w-full cursor-pointer mb-4">
            <Input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className="flex items-center w-full border mb-8 border-white rounded-md overflow-hidden bg-opacity-80 bg-white"
              style={{  fontSize: 16 }}
            >
              <span className="bg-[#325700] text-white px-4 py-2 text-sm font-bold h-full flex items-center">
                Pilih File
              </span>
              <span className="flex-1 px-4 py-2 bg-white text-gray-500 text-sm truncate h-full flex items-center">
                {file ? file.name : 'Tidak ada file yang dipilih'}
              </span>
            </div>
          </label>

          <div
            className="bg-[#D9D9D9] mt-4 rounded-2xl border-2 border-dashed border-[#2B4F00] px-4 py-10 flex flex-col items-center justify-center text-center space-y-4 relative min-h-[350px]"
            style={
              previewUrl
                ? {
                    backgroundImage: `url(${previewUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    border: '2px solid #2B4F00',
                  }
                : {}
            }
          >
            {!previewUrl && (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-[#C7E7C7] flex items-center justify-center shadow-md">
                  <div className="text-[#2B4F00] text-3xl font-bold">+</div>
                </div>
                <p className="text-black font-livvic text-base font-semibold">Seret atau letakan file</p>
              </>
            )}
            {previewUrl && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 text-[#2B4F00] hover:bg-opacity-100"
                title="Hapus gambar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </Card>
      </div>

      {/* Tombol Analisis di tengah */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleAnalyze}
          className="w-full max-w-md bg-[#FFFA72] text-[#325700] hover:bg-[#e6e666] font-livvic font-bold text-lg py-3 rounded"
          disabled={loading}
        >
          {loading ? 'Analisis...' : 'Analisis Potensi Tanaman'}
        </Button>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

      {/* Hasil Analisis */}
      {analysisResult && <div className="mt-8"><AnalysisResult result={analysisResult} /></div>}
    </div>
  );
}
