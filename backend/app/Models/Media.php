<?php

namespace App\Models;

use Spatie\MediaLibrary\MediaCollections\Models\Media as BaseMedia;

class Media extends BaseMedia
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'file_name',
        'disk',
        'collection_name',
        'size',
        'manipulations',
        'custom_properties',
        'generated_conversions',
        'responsive_images',
        'order_column',
        'title',
        'alt_text',
        'caption',
        'description',
        'category',
    ];
}
