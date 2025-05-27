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
      <h3 className="text-xl font-bold">Hasil Analisis</h3>
      <p>
        <strong>Lokasi:</strong> {result.locationName}
      </p>
      <p>
        <strong>Rekomendasi Tanaman:</strong> {result.recommendedPlants.join(', ')}
      </p>
      {result.analysisImage && (
        <img
          src={result.analysisImage}
          alt="Hasil Analisis"
          className="mt-4 rounded-lg"
        />
      )}
    </Card>
  );
}
  