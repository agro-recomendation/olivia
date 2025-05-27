// components/AnalysisResult.jsx
import React from 'react';
import { Card } from '@/components/ui/card';

export default function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <Card
      className="p-6 font-poppins rounded-2xl space-y-4 border border-white"
      style={{ backgroundColor: '#2B4F00', color: 'white' }}
    >
      <h3 className="text-xl font-bold mb-2">Hasil Analisis</h3>
      <div>
        <strong>Jenis Tanah:</strong> {result.soil?.type}
      </div>
      <div>
        <strong>pH:</strong> {result.soil?.pH}
      </div>
      <div>
        <strong>K:</strong> {result.soil?.K}
      </div>
      <div>
        <strong>N:</strong> {result.soil?.N}
      </div>
      <div>
        <strong>P:</strong> {result.soil?.P}
      </div>
      <div>
        <strong>Lokasi:</strong> {result.soil?.location}
      </div>
      <div>
        <strong>Jarak data tanah terdekat:</strong> {result.soil?.distance_km} km
      </div>
      <div>
        <strong>Cuaca:</strong> {result.weather?.temperature}°C, {result.weather?.humidity}% RH
      </div>
      <div className="mt-4">
        <strong>Rekomendasi Tanaman:</strong>
        <ul className="list-disc ml-6 mt-2">
          {result.plants?.map((plant) => (
            <li key={plant.id} className="mb-2">
              <span className="font-bold">{plant.name}</span> ({plant.recommendation_percentage}%)
              <div className="text-xs italic">{plant.benefits}</div>
              <div className="text-xs">{plant.planting_tips}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
  