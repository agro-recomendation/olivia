<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diseases extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'treatment',
    ];

    /**
     * Get the result diseases associated with the disease.
     */
    public function resultDiseases()
    {
        return $this->hasMany(ResultDisease::class);
    }
}
