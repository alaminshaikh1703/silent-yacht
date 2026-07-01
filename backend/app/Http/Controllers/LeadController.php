<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeadController extends Controller
{
    /**
     * Store a newly created lead in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'travel_date' => 'nullable|date',
            'guest_count' => 'nullable|string',
            'cabin_preference' => 'nullable|string',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $lead = Lead::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Lead successfully recorded.',
            'data' => $lead
        ], 201);
    }
}
