<?php

namespace App\Filament\Resources\CabinCategories;

use App\Filament\Resources\CabinCategories\Pages\CreateCabinCategory;
use App\Filament\Resources\CabinCategories\Pages\EditCabinCategory;
use App\Filament\Resources\CabinCategories\Pages\ListCabinCategories;
use App\Filament\Resources\CabinCategories\Schemas\CabinCategoryForm;
use App\Filament\Resources\CabinCategories\Tables\CabinCategoriesTable;
use App\Models\CabinCategory;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CabinCategoryResource extends Resource
{
    protected static ?string $model = CabinCategory::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return CabinCategoryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CabinCategoriesTable::configure($table);
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
            'index' => ListCabinCategories::route('/'),
            'create' => CreateCabinCategory::route('/create'),
            'edit' => EditCabinCategory::route('/{record}/edit'),
        ];
    }
}
