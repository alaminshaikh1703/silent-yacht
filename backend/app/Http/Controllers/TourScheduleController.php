<?php

namespace App\Http\Controllers;

use App\Models\TourSchedule;
use Illuminate\Http\Request;

class TourScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TourSchedule::with(['tour', 'tour.destinations', 'tour.tourType'])
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc');

        if ($request->has('date')) {
            $query->whereDate('start_date', '>=', $request->date);
        }

        if ($request->has('destination')) {
            $query->whereHas('tour.destinations', function ($q) use ($request) {
                $q->where('slug', $request->destination);
            });
        }

        if ($request->has('tour_type')) {
            $query->whereHas('tour.tourType', function ($q) use ($request) {
                $q->where('slug', $request->tour_type);
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(12)
        ]);
    }
}
