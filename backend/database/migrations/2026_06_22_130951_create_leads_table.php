<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->date('travel_date')->nullable();
            $table->string('guest_count')->nullable();
            $table->string('cabin_preference')->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('new'); // new, contacted, booked, lost
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
