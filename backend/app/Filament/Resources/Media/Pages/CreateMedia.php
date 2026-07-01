<?php

namespace App\Filament\Resources\Media\Pages;

use App\Filament\Resources\Media\MediaResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;

class CreateMedia extends CreateRecord
{
    protected static string $resource = MediaResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        $setting = \App\Models\SiteSetting::firstOrCreate(['key' => 'global_media']);
        
        $media = $setting->addMediaFromDisk($data['file'], 'public')
            ->usingName($data['name'])
            ->withCustomProperties([
                'title' => $data['title'] ?? null,
                'alt_text' => $data['alt_text'] ?? null,
                'caption' => $data['caption'] ?? null,
                'description' => $data['description'] ?? null,
                'category' => $data['category'] ?? null,
            ])
            ->toMediaCollection('global');

        $media->title = $data['title'] ?? null;
        $media->alt_text = $data['alt_text'] ?? null;
        $media->caption = $data['caption'] ?? null;
        $media->description = $data['description'] ?? null;
        $media->category = $data['category'] ?? null;
        $media->save();

        return $media;
    }
}
