<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'travel_date',
        'guest_count',
        'cabin_preference',
        'message',
        'source',
        'status',
    ];
}
