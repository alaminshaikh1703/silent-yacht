<?php

namespace App\Filament\Resources\CabinCategories\Pages;

use App\Filament\Resources\CabinCategories\CabinCategoryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCabinCategory extends EditRecord
{
    protected static string $resource = CabinCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
