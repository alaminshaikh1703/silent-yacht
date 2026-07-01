<?php

namespace App\Filament\Resources\CabinCategories\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class CabinCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('capacity')
                    ->required()
                    ->numeric()
                    ->default(2),
                Textarea::make('description')
                    ->default(null)
                    ->columnSpanFull(),
                Textarea::make('facilities')
                    ->default(null)
                    ->columnSpanFull(),
                SpatieMediaLibraryFileUpload::make('featured_image')
                    ->collection('featured_image')
                    ->image(),
                SpatieMediaLibraryFileUpload::make('gallery')
                    ->collection('gallery')
                    ->multiple()
                    ->image()
                    ->columnSpanFull(),
            ]);
    }
}
