<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Http\Resources\DestinationResource;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
    {
        $destinations = Destination::all();
        return DestinationResource::collection($destinations);
    }
}
