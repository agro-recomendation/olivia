<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soil extends Model
{
    protected $fillable = [
        'soil_type',
        'accuracy',
        'plant_recomendation_id',
        'K',
        'P',
        'N',
        'pH',
        'latitude',
        'longitude',
        'location',
        'humidity',
        'temperature',
    ];

    public function plantRecomendation()
    {
        return $this->belongsTo(PlantRecomendation::class);
    }
}
