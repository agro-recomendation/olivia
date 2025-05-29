<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlantRecomendation extends Model
{
    protected $fillable = [
        'user_id',
    ];

    public function soils()
    {
        return $this->hasOne(Soil::class);
    }

    public function plants()
    {
        return $this->hasMany(Plant::class);
    }
}