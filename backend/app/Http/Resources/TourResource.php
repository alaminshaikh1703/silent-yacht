<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $media = $this->getFirstMedia('featured_image');
        $data['featured_image'] = $media ? new MediaResource($media) : null;
        $data['gallery'] = MediaResource::collection($this->getMedia('gallery'));
        return $data;
    }
}
