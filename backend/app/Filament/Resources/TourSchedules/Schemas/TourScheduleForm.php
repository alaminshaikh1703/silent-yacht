<?php

namespace App\Filament\Resources\TourSchedules\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TourScheduleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('tour_id')
                    ->required()
                    ->numeric(),
                TextInput::make('yacht_id')
                    ->required()
                    ->numeric(),
                DatePicker::make('start_date')
                    ->required(),
                DatePicker::make('end_date')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('scheduled'),
            ]);
    }
}
