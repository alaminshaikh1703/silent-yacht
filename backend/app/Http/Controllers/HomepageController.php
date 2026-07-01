<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tour;
use App\Models\CabinCategory;
use App\Models\Testimonial;
use App\Http\Resources\TourResource;
use App\Http\Resources\CabinResource;
use App\Http\Resources\TestimonialResource;

class HomepageController extends Controller
{
    public function index()
    {
        $settings = \App\Models\SiteSetting::getSetting('homepage_settings', []);
        
        $heroImage = $settings['hero_image'] ?? null;
        if ($heroImage && !str_starts_with($heroImage, 'http')) {
            $heroImage = asset('storage/' . $heroImage);
        }
        
        $mediaType = 'image';
        $mediaUrl = $heroImage ?: '/images/hero_yacht.png';

        if (!empty($settings['hero_video'])) {
            $mediaType = 'video';
            $mediaUrl = $settings['hero_video'];
            if (!str_starts_with($mediaUrl, 'http')) {
                $mediaUrl = asset('storage/' . $mediaUrl);
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'hero' => [
                    'headline' => [
                        'en' => $settings['hero_headline_en'] ?? 'Experience The Beauty Of The Sundarbans',
                        'bn' => $settings['hero_headline_bn'] ?? 'সুন্দরবনের অপার সৌন্দর্য উপভোগ করুন'
                    ],
                    'subheadline' => [
                        'en' => $settings['hero_subheadline_en'] ?? 'Luxury AC Cabins • Premium Experience',
                        'bn' => $settings['hero_subheadline_bn'] ?? 'বিলাসবহুল এসি কেবিন • প্রিমিয়াম অভিজ্ঞতা'
                    ],
                    'media' => [
                        'type' => $mediaType,
                        'url' => $mediaUrl,
                        'fallback_image' => $heroImage
                    ]
                ],
                'statistics' => $settings['statistics'] ?? [
                    ['value' => '44+', 'label_en' => 'Guests Capacity', 'label_bn' => 'অতিথি ধারণক্ষমতা'],
                    ['value' => '16', 'label_en' => 'Premium AC Cabins', 'label_bn' => 'প্রিমিয়াম এসি কেবিন'],
                ],
                'featured_tours' => TourResource::collection(Tour::where('is_featured', true)->with('destinations', 'tourType')->get()),
                'featured_cabins' => CabinResource::collection(CabinCategory::all()),
                'testimonials' => TestimonialResource::collection(Testimonial::where('is_featured', true)->latest()->take(3)->get()),
                'cta' => [
                    'headline' => [
                        'en' => 'Ready For Your Sundarbans Adventure?',
                        'bn' => 'আপনার সুন্দরবন ভ্রমণের জন্য প্রস্তুত?'
                    ],
                    'whatsapp_number' => '+8801234567890'
                ]
            ]
        ]);
    }
}
