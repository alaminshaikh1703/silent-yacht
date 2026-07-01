<?php

namespace App\Filament\Resources\TourSchedules\Pages;

use App\Filament\Resources\TourSchedules\TourScheduleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTourSchedule extends EditRecord
{
    protected static string $resource = TourScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
