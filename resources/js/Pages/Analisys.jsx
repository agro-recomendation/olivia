import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Analisys() {
  return (
    <div className="min-h-screen p-6 space-y-10" style={{ backgroundColor: '#325700', color: 'white' }}>
      <div className="space-y-4">
        <h1 className="font-livvic font-bold text-4xl md:text-[40px] leading-tight text-[#FFFA72]">
              Analisis Potensi Tanaman
        </h1>
        <Card className="p-6 font-poppins rounded-2xl space-y-4" style={{ backgroundColor: '#2B4F00', borderColor: '#FFFFFF', borderWidth: '1px', color:'white'}}>
          <div className="font-poppins space-y-2">
            <Label>Lokasi</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="bandungan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bandungan">Bandungan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Jenis Tanah</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Merah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="merah">Merah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 text-white">
            <Label>Suhu</Label>
            <Input type="number" defaultValue={27} className="text-grey" />
          </div>
          <div className="space-y-2">
            <Label>Curah Hujan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tinggi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tinggi">Tinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-32 font-livvic"
            style={{
              backgroundColor: '#FFFA72',
              color: '#325700',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e6e666')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#FFFA72')}
          >
            Analisis
          </Button>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl md:text-[40px] font-bold font-livvic" style={{ color: '#FFFFFF' }}>
          Hasil Analisis
        </h2>
        <Card className="overflow-hidden border-none" style={{ backgroundColor: '#325700' }}>
          <img
            src="/images/peta-potensi.png"
            alt="Peta Potensi Tanaman"
            className="w-[800px] h-[500px] mx-auto object-cover"
          />
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#FFFA72' }}>
          Rekomendasi Tanaman
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="flex items-center justify-between p-4"
              style={{ backgroundColor: '#2B4F00', borderColor: '#325700', borderWidth: '1px' }}
            >
              <div className="flex items-center space-x-4">
                <img src="/images/wortel.png" alt="wortel" width={50} height={50} />
                <div>
                  <p className="font-bold" style={{ color: 'white' }}>
                    wortel
                  </p>
                  <p className="text-sm" style={{ color: 'white' }}>
                    80%
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
