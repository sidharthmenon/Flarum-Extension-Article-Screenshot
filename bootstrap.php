<?php

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\ConfigureClientView;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;

class LoadSettingsFromDatabase {
	protected $settings;
	
	protected $toLoadSettings = [
		'sidharthmenon.flarum-screenshot.img_wide','sidharthmenon.flarum-screenshot.img_mobile'
	];
	public function __construct(SettingsRepositoryInterface $settings) {
		$this->settings = $settings;
	}
	public function subscribe(Dispatcher $events) {
		$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
	}
	
	/*
	* Get the setting values from the database and make them available
	* in the forum.
	*/
	public function prepareApiAttributes(PrepareApiAttributes $event) {
		if ($event->isSerializer(ForumSerializer::class)) {
			foreach ($this->toLoadSettings as $setting) {
				$event->attributes[$setting] = $this->settings->get($setting);
			}
		}
	}
}

return function (Dispatcher $events) {
  $events->listen(ConfigureClientView::class, function (ConfigureClientView $event) {
    if ($event->isForum()) {
      $event->addAssets(__DIR__.'/js/forum/dist/extension.js');
      $event->view->addHeadString('<script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js"></script>');
      $event->view->addHeadString('<script src="https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"></script>');
      //add main.js
      $event->addBootstrapper('sidharthmenon/flarum-screenshot/main');
    }
    
    if ($event->isAdmin()) {
            $event->addAssets(__DIR__.'/js/admin/dist/extension.js');
            $event->addBootstrapper('sidharthmenon/flarum-screenshot/main');
    }
  });

	$events->subscribe(LoadSettingsFromDatabase::class);
	
};