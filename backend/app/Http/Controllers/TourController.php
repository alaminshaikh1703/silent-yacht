<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tour;
use App\Http\Resources\TourResource;

class TourController extends Controller
{
    public function index()
    {
        $tours = Tour::where('is_featured', true)->orWhere('id', '>', 0)->get();
        return response()->json([
            'success' => true,
            'data' => TourResource::collection($tours)
        ]);
    }

    public function show($slug)
    {
        $tour = Tour::where('slug', $slug)->firstOrFail();
        
        return response()->json([
            'success' => true,
            'data' => new TourResource($tour)
        ]);
    }
}
