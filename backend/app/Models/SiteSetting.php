<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class SiteSetting extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = ['key', 'value'];

    protected $casts = [
        'value' => 'array',
    ];

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
              ->width(1920)
              ->height(1080);
    }

    /**
     * Helper to get a setting by key.
     */
    public static function getSetting(string $key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Helper to set a setting by key.
     */
    public static function setSetting(string $key, array $value)
    {
        return self::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
