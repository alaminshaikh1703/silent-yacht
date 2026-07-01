<?php

namespace App\Filament\Resources\Tours\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class TourForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('tour_type_id')
                    ->required()
                    ->numeric(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                RichEditor::make('description')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('duration_days')
                    ->required()
                    ->numeric()
                    ->default(3),
                TextInput::make('duration_nights')
                    ->required()
                    ->numeric()
                    ->default(2),
                TextInput::make('base_price')
                    ->numeric()
                    ->default(null)
                    ->prefix('$'),
                Toggle::make('is_featured')
                    ->required(),
                SpatieMediaLibraryFileUpload::make('featured_image')
                    ->collection('featured_image')
                    ->image(),
                SpatieMediaLibraryFileUpload::make('gallery')
                    ->collection('gallery')
                    ->multiple()
                    ->image()
                    ->columnSpanFull(),
                RichEditor::make('itinerary')
                    ->default(null)
                    ->columnSpanFull(),
                Textarea::make('facilities')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('seo_title')
                    ->default(null),
                Textarea::make('meta_description')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
