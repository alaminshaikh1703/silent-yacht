<?php

namespace App\Filament\Resources\Media\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Placeholder;
use Illuminate\Support\HtmlString;

class MediaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('file')
                    ->label('Upload File')
                    ->image()
                    ->required(fn (string $context): bool => $context === 'create')
                    ->visible(fn (string $context): bool => $context === 'create'),
                
                Placeholder::make('image_preview')
                    ->label('Image Preview')
                    ->content(fn ($record) => $record ? new HtmlString('<img src="'.$record->getUrl().'" style="max-height: 200px; border-radius: 8px;" />') : null)
                    ->visible(fn (string $context): bool => $context === 'edit'),

                TextInput::make('name')
                    ->label('Internal Name')
                    ->required(),
                TextInput::make('title')
                    ->label('Image Title (SEO)'),
                TextInput::make('alt_text')
                    ->label('Alt Text (SEO)'),
                Textarea::make('caption')
                    ->label('Caption'),
                Textarea::make('description')
                    ->label('Description (SEO)'),
                Select::make('category')
                    ->options([
                        'Hero' => 'Hero',
                        'Shared' => 'Shared',
                        'Global Gallery' => 'Global Gallery',
                        'Videos' => 'Videos',
                    ]),
            ]);
    }
}
