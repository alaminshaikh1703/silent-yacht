<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Form;
use Filament\Schemas\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use App\Models\SiteSetting;

class ManageHomepage extends Page implements HasForms
{
    use InteractsWithForms;

    public static function getNavigationIcon(): ?string { return 'heroicon-o-home'; }
    public static function getNavigationGroup(): ?string { return 'Site Content'; }
    public static function getNavigationSort(): ?int { return 1; }
    protected string $view = 'filament.pages.manage-homepage';
    protected static ?string $title = 'Homepage Management';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSetting::getSetting('homepage_settings', []);
        $this->form->fill($settings);
    }

    public function form($form)
    {
        return $form
            ->schema([
                Tabs::make('Homepage')
                    ->tabs([
                        Tabs\Tab::make('Hero Section')
                            ->schema([
                                TextInput::make('hero_headline_en')
                                    ->label('Headline (English)'),
                                TextInput::make('hero_headline_bn')
                                    ->label('Headline (Bangla)'),
                                TextInput::make('hero_subheadline_en')
                                    ->label('Subheadline (English)'),
                                TextInput::make('hero_subheadline_bn')
                                    ->label('Subheadline (Bangla)'),
                                FileUpload::make('hero_image')
                                    ->label('Background Image')
                                    ->image()
                                    ->directory('homepage'),
                                FileUpload::make('hero_video')
                                    ->label('Background Video (Optional)')
                                    ->acceptedFileTypes(['video/mp4', 'video/webm'])
                                    ->directory('homepage'),
                            ]),
                        Tabs\Tab::make('Statistics')
                            ->schema([
                                Repeater::make('statistics')
                                    ->schema([
                                        TextInput::make('value')->required(),
                                        TextInput::make('label_en')->label('Label (English)')->required(),
                                        TextInput::make('label_bn')->label('Label (Bangla)')->required(),
                                    ])
                                    ->columns(3)
                                    ->defaultItems(4),
                            ]),
                        Tabs\Tab::make('CTA Section')
                            ->schema([
                                TextInput::make('cta_headline_en')
                                    ->label('Headline (English)'),
                                TextInput::make('cta_headline_bn')
                                    ->label('Headline (Bangla)'),
                                TextInput::make('cta_button_text_en')
                                    ->label('Button Text (English)'),
                                TextInput::make('cta_button_text_bn')
                                    ->label('Button Text (Bangla)'),
                            ]),
                    ])
                    ->columnSpanFull(),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        try {
            $data = $this->form->getState();
            
            $setting = SiteSetting::firstOrCreate(['key' => 'homepage_settings']);
            
            if (!empty($data['hero_image']) && is_string($data['hero_image']) && !str_starts_with($data['hero_image'], 'http')) {
                $setting->clearMediaCollection('hero_image');
                $media = $setting->addMediaFromDisk($data['hero_image'], 'public')->toMediaCollection('hero_image');
                $data['hero_image'] = $media->getUrl('large'); // Get the optimized 1920x1080 WebP
            }

            SiteSetting::setSetting('homepage_settings', $data);

            Notification::make()
                ->success()
                ->title('Homepage Settings Saved')
                ->send();
        } catch (\Exception $e) {
            Notification::make()
                ->danger()
                ->title('Failed to save settings')
                ->body($e->getMessage())
                ->send();
        }
    }
}
