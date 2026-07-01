<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $media = $this->getFirstMedia('featured_image') ?? $this->getFirstMedia('default');
        
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'author_name' => $this->author_name ?? 'Admin',
            'published_at' => $this->published_at ? $this->published_at->format('M d, Y') : $this->created_at->format('M d, Y'),
            'seo_title' => $this->seo_title,
            'meta_description' => $this->meta_description,
            'media' => $media ? new MediaResource($media) : null,
        ];
    }
}
