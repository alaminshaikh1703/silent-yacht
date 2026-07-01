<?php

namespace App\Filament\Resources\TourSchedules\Pages;

use App\Filament\Resources\TourSchedules\TourScheduleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTourSchedules extends ListRecords
{
    protected static string $resource = TourScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
