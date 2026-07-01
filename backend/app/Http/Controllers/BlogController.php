<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Resources\BlogResource;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::latest()->get();
        return BlogResource::collection($blogs);
    }

    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        return new BlogResource($blog);
    }
}
