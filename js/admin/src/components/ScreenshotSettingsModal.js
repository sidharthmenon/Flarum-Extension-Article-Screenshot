import SettingsModal from 'flarum/components/SettingsModal';

export default class ScreenshotSettingsModal extends SettingsModal {
	className() {
		return 'ScreenshotSettingsModal Modal--small';
	}

	title() {
		return app.translator.trans('Settings');
	}

	form() {
		return [
			<div className="Form-group">
				<label>Wide Footer</label>
				<input className="FormControl" bidi={this.setting('sidharthmenon.flarum-screenshot.img_wide')}/>
			</div>,
			<div className="Form-group">
				<label>Mobile Footer</label>
				<input className="FormControl" bidi={this.setting('sidharthmenon.flarum-screenshot.img_mobile')}/>
			</div>,
		];
	}
}