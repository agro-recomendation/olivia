<?php

namespace App\Http\Controllers\CropArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MarkerController extends Controller
{
    public function marker(){
        $cropAreas = \App\Models\CropAreas::with(['crop', 'province'])->get();
        $markers = [];
        foreach ($cropAreas as $cropArea) {
            $markers[] = [
                'id' => $cropArea->id,
                'crop' => $cropArea->crop->name,
                'province' => $cropArea->province->name,
                'area' => $cropArea->area,
                'latitude' => $cropArea->latitude, // Assuming latitude is a field in CropAreas
                'longitude' => $cropArea->longitude, // Assuming longitude is a field in CropAreas
            ];
        }
        return response()->json($markers);
    }

}
