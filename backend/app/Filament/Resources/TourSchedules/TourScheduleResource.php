<?php

namespace App\Filament\Resources\TourSchedules;

use App\Filament\Resources\TourSchedules\Pages\CreateTourSchedule;
use App\Filament\Resources\TourSchedules\Pages\EditTourSchedule;
use App\Filament\Resources\TourSchedules\Pages\ListTourSchedules;
use App\Filament\Resources\TourSchedules\Schemas\TourScheduleForm;
use App\Filament\Resources\TourSchedules\Tables\TourSchedulesTable;
use App\Models\TourSchedule;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TourScheduleResource extends Resource
{
    protected static ?string $model = TourSchedule::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return TourScheduleForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TourSchedulesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTourSchedules::route('/'),
            'create' => CreateTourSchedule::route('/create'),
            'edit' => EditTourSchedule::route('/{record}/edit'),
        ];
    }
}
