<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $media = $this->getFirstMedia('featured_image') ?? $this->getFirstMedia('default');
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'seo_title' => $this->seo_title,
            'meta_description' => $this->meta_description,
            'media' => $media ? new MediaResource($media) : null,
        ];
    }
}
