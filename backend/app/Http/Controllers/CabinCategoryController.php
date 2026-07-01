<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CabinCategory;
use App\Http\Resources\CabinResource;

class CabinCategoryController extends Controller
{
    public function index()
    {
        $cabins = CabinCategory::latest()->get();
        return CabinResource::collection($cabins);
    }
}
