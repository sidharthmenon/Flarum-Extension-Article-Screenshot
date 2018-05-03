import { extend } from 'flarum/extend';
import app from 'flarum/app';
import ScreenshotSettingsModal from 'sidharthmenon/flarum-screenshot/components/ScreenshotSettingsModal';

app.initializers.add('flarum-screenshot', () => {
	app.extensionSettings['sidharthmenon-screenshot'] = () => app.modal.show(new ScreenshotSettingsModal());
});