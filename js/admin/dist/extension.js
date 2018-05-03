'use strict';

System.register('sidharthmenon/flarum-screenshot/components/ScreenshotSettingsModal', ['flarum/components/SettingsModal'], function (_export, _context) {
	"use strict";

	var SettingsModal, ScreenshotSettingsModal;
	return {
		setters: [function (_flarumComponentsSettingsModal) {
			SettingsModal = _flarumComponentsSettingsModal.default;
		}],
		execute: function () {
			ScreenshotSettingsModal = function (_SettingsModal) {
				babelHelpers.inherits(ScreenshotSettingsModal, _SettingsModal);

				function ScreenshotSettingsModal() {
					babelHelpers.classCallCheck(this, ScreenshotSettingsModal);
					return babelHelpers.possibleConstructorReturn(this, (ScreenshotSettingsModal.__proto__ || Object.getPrototypeOf(ScreenshotSettingsModal)).apply(this, arguments));
				}

				babelHelpers.createClass(ScreenshotSettingsModal, [{
					key: 'className',
					value: function className() {
						return 'ScreenshotSettingsModal Modal--small';
					}
				}, {
					key: 'title',
					value: function title() {
						return app.translator.trans('Settings');
					}
				}, {
					key: 'form',
					value: function form() {
						return [m(
							'div',
							{ className: 'Form-group' },
							m(
								'label',
								null,
								'Wide Footer'
							),
							m('input', { className: 'FormControl', bidi: this.setting('sidharthmenon.flarum-screenshot.img_wide') })
						), m(
							'div',
							{ className: 'Form-group' },
							m(
								'label',
								null,
								'Mobile Footer'
							),
							m('input', { className: 'FormControl', bidi: this.setting('sidharthmenon.flarum-screenshot.img_mobile') })
						)];
					}
				}]);
				return ScreenshotSettingsModal;
			}(SettingsModal);

			_export('default', ScreenshotSettingsModal);
		}
	};
});;
'use strict';

System.register('sidharthmenon/flarum-screenshot/main', ['flarum/extend', 'flarum/app', 'sidharthmenon/flarum-screenshot/components/ScreenshotSettingsModal'], function (_export, _context) {
	"use strict";

	var extend, app, ScreenshotSettingsModal;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_sidharthmenonFlarumScreenshotComponentsScreenshotSettingsModal) {
			ScreenshotSettingsModal = _sidharthmenonFlarumScreenshotComponentsScreenshotSettingsModal.default;
		}],
		execute: function () {

			app.initializers.add('flarum-screenshot', function () {
				app.extensionSettings['sidharthmenon-screenshot'] = function () {
					return app.modal.show(new ScreenshotSettingsModal());
				};
			});
		}
	};
});