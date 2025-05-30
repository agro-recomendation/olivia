import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/KomoditasPertanian.css';

// Custom icon daun seperti di gambar
const agricultureIcon = new L.Icon({
  iconUrl: 'Images/marker-pertanian.png', 
  iconSize: [35, 40],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30]
});

// Data lokasi komoditas
const komoditasData = [
  { id: 1, posisi: [-7.234, 110.381], komoditas: 'Kopi' },
  { id: 2, posisi: [-7.230, 110.390], komoditas: 'Sayur Mayur' },
  { id: 3, posisi: [-7.240, 110.400], komoditas: 'Buah-buahan' },
  { id: 4, posisi: [-7.220, 110.370], komoditas: 'Kopi' },
  { id: 5, posisi: [-7.250, 110.385], komoditas: 'Teh' }
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
    <div className="komoditas-wrapper">
      <div className="title-bar">
        <span className="back-arrow">←</span>
        <h2 className="page-title">Peta Komoditas Pertanian</h2>
      </div>

      <div className="map-container">
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
              </Popup>
            </Marker>
          ))}

          {/* Komponen untuk flyTo */}
          <FlyToLocation position={flyTo} />
        </MapContainer>

        <input
          type="text"
          className="search-bar"
          placeholder="Cari komoditas yang anda inginkan"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default KomoditasPertanian;
