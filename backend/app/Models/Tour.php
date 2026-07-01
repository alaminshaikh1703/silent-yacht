<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Tour extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $guarded = [];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumbnail')
              ->format('webp')
              ->width(400)
              ->height(300);

        $this->addMediaConversion('medium')
              ->format('webp')
              ->width(800)
              ->height(600);

        $this->addMediaConversion('large')
              ->format('webp')
              ->width(1200)
              ->height(800);
    }
}
