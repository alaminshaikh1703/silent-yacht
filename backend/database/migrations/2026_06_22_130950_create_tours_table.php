<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_type_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('duration_days')->default(3);
            $table->integer('duration_nights')->default(2);
            $table->decimal('base_price', 10, 2)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('featured_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('itinerary')->nullable();
            $table->json('facilities')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
