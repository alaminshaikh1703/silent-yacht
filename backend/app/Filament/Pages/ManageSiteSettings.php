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
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use App\Models\SiteSetting;

class ManageSiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    public static function getNavigationIcon(): ?string { return 'heroicon-o-cog-6-tooth'; }
    public static function getNavigationGroup(): ?string { return 'System'; }
    public static function getNavigationSort(): ?int { return 100; }
    protected string $view = 'filament.pages.manage-site-settings';
    protected static ?string $title = 'General Settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSetting::getSetting('general_settings', []);
        $this->form->fill($settings);
    }

    public function form($form)
    {
        return $form
            ->schema([
                Tabs::make('Settings')
                    ->tabs([
                        Tabs\Tab::make('General')
                            ->schema([
                                TextInput::make('site_name')
                                    ->label('Site Name')
                                    ->required(),
                                FileUpload::make('site_logo')
                                    ->label('Site Logo')
                                    ->image()
                                    ->directory('settings'),
                                FileUpload::make('site_favicon')
                                    ->label('Site Favicon')
                                    ->image()
                                    ->directory('settings'),
                            ]),
                        Tabs\Tab::make('Contact Information')
                            ->schema([
                                TextInput::make('whatsapp_number')
                                    ->label('WhatsApp Number')
                                    ->prefix('+880')
                                    ->required(),
                                TextInput::make('phone_number')
                                    ->label('Phone Number'),
                                TextInput::make('email_address')
                                    ->label('Email Address')
                                    ->email(),
                                Textarea::make('office_address')
                                    ->label('Office Address')
                                    ->rows(3),
                            ]),
                        Tabs\Tab::make('Social Links')
                            ->schema([
                                TextInput::make('facebook_url')
                                    ->label('Facebook URL')
                                    ->url(),
                                TextInput::make('instagram_url')
                                    ->label('Instagram URL')
                                    ->url(),
                                TextInput::make('youtube_url')
                                    ->label('YouTube URL')
                                    ->url(),
                            ]),
                        Tabs\Tab::make('SEO Defaults')
                            ->schema([
                                TextInput::make('seo_title')
                                    ->label('Default SEO Title'),
                                Textarea::make('seo_description')
                                    ->label('Default Meta Description')
                                    ->rows(3),
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
            SiteSetting::setSetting('general_settings', $data);

            Notification::make()
                ->success()
                ->title('Settings Saved Successfully')
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
