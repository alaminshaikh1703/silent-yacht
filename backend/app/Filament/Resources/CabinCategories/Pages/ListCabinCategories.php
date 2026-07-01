<?php

namespace App\Filament\Resources\CabinCategories\Pages;

use App\Filament\Resources\CabinCategories\CabinCategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCabinCategories extends ListRecords
{
    protected static string $resource = CabinCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
