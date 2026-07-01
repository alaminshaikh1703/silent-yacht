<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Textarea::make('excerpt')
                    ->default(null)
                    ->columnSpanFull(),
                Textarea::make('content')
                    ->default(null)
                    ->columnSpanFull(),
                SpatieMediaLibraryFileUpload::make('featured_image')
                    ->collection('featured_image')
                    ->image(),
                TextInput::make('author_name')
                    ->default(null),
                DateTimePicker::make('published_at'),
                TextInput::make('seo_title')
                    ->default(null),
                Textarea::make('meta_description')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
