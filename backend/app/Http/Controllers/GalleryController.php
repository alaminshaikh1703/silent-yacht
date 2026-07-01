<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteSetting;
use App\Http\Resources\MediaResource;

class GalleryController extends Controller
{
    public function index()
    {
        $setting = SiteSetting::where('key', 'global_media')->first();
        
        $media = [];
        if ($setting) {
            $media = MediaResource::collection($setting->getMedia('global'));
        }

        return response()->json([
            'success' => true,
            'data' => $media
        ]);
    }
}
