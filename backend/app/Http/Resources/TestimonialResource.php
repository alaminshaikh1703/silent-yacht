<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $media = $this->getFirstMedia('avatar');
        $data['avatar'] = $media ? new MediaResource($media) : null;
        return $data;
    }
}
