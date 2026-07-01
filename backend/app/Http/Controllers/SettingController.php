<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = SiteSetting::getSetting('general_settings', []);
        return response()->json(['data' => $settings]);
    }
}
