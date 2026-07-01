<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'url' => $this->getUrl(),
            'thumbnail' => $this->hasGeneratedConversion('thumbnail') ? $this->getUrl('thumbnail') : $this->getUrl(),
            'medium' => $this->hasGeneratedConversion('medium') ? $this->getUrl('medium') : $this->getUrl(),
            'large' => $this->hasGeneratedConversion('large') ? $this->getUrl('large') : $this->getUrl(),
            'alt_text' => $this->alt_text ?? '',
            'title' => $this->title ?? '',
            'caption' => $this->caption ?? '',
            'category' => $this->category ?? 'Uncategorized',
        ];
    }
}
