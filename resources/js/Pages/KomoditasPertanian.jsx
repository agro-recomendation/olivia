import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/KomoditasPertanian.css';
import BackHeader from '@/Components/BackHeader';

// Custom icon daun
const agricultureIcon = new L.Icon({
  iconUrl: '/Images/marker-pertanian.png', 
  iconSize: [35, 40],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30]
});

const komoditasData = [
  { id: 1, posisi: [-7.234, 110.381], komoditas: 'Kopi', daerah: 'Kecamatan A' },
  { id: 2, posisi: [-7.230, 110.390], komoditas: 'Sayur Mayur', daerah: 'Kecamatan B' },
  { id: 3, posisi: [-7.240, 110.400], komoditas: 'Buah-buahan', daerah: 'Kecamatan C' },
  { id: 4, posisi: [-7.220, 110.370], komoditas: 'Kopi', daerah: 'Kecamatan D' },
  { id: 5, posisi: [-7.250, 110.385], komoditas: 'Teh', daerah: 'Kecamatan E' }
];

function FlyToLocation({ position }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

const handleBack = () => window.history.back();

const KomoditasPertanian = () => {
  const [search, setSearch] = useState('');
  const [flyTo, setFlyTo] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const found = komoditasData.find(
        (item) =>
          item.komoditas.toLowerCase().includes(value.toLowerCase()) ||
          (item.daerah && item.daerah.toLowerCase().includes(value.toLowerCase()))
      );
      if (found) {
        setFlyTo(found.posisi);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4">
      <div
        className="flex items-center mb-6 mt-6 self-start space-x-4 cursor-pointer text-[#FFFA72]"
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

      <div className="w-full max-w-6xl">
        <div className="map-container relative">
          <MapContainer
            center={[-7.230, 110.390]}
            zoom={13}
            scrollWheelZoom={true}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {komoditasData.map((lokasi) => (
              <Marker
                key={lokasi.id}
                position={lokasi.posisi}
                icon={agricultureIcon}
              >
                <Popup>
                  <strong>{lokasi.komoditas}</strong>
                  <br />
                  <span>{lokasi.daerah}</span>
                </Popup>
              </Marker>
            ))}

            <FlyToLocation position={flyTo} />
          </MapContainer>

          <input
            type="text"
            className="search-bar"
            placeholder="Cari komoditas atau daerah…"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default KomoditasPertanian;
