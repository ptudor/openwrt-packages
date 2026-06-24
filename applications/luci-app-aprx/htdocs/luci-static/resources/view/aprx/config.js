'use strict';
'require view';
'require fs';
'require ui';

/*
 * aprx is configured by its native, Apache-style /etc/aprx.conf -- it is not a
 * UCI application, so there is no /etc/config/aprx to bind a CBI form to.
 * Instead this view loads the raw config file into an editor; Save writes it,
 * Save & Apply writes it and restarts the procd service.
 */

var confPath = '/etc/aprx.conf';

return view.extend({
	load: function() {
		return L.resolveDefault(fs.read(confPath), '');
	},

	normalize: function(value) {
		value = (value || '').replace(/\r\n/g, '\n');
		if (value.length && value.charAt(value.length - 1) != '\n')
			value += '\n';
		return value;
	},

	render: function(data) {
		var content = (data || '').replace(/\r\n/g, '\n');

		this.editor = new ui.Textarea(content, {
			rows: 30,
			monospace: true,
			wrap: false
		});

		return E('div', { class: 'cbi-map' }, [
			E('h2', {}, _('aprx Configuration')),
			E('div', { class: 'cbi-map-descr' },
				_('aprx is configured through its native, Apache-style file %s — not UCI. Edit it below, then use Save & Apply to write the file and restart the service. At minimum set your mycall, an interface (serial-device or ax25-device), and a valid APRS-IS passcode.').format(confPath)),
			E('div', { class: 'cbi-section' }, [
				this.editor.render()
			])
		]);
	},

	handleSave: function() {
		var value = this.normalize(this.editor.getValue());
		return fs.write(confPath, value).then(function() {
			ui.addNotification(null, E('p', _('%s saved.').format(confPath)), 'info');
		}).catch(function(err) {
			ui.addNotification(null, E('p', _('Unable to save %s: %s').format(confPath, err.message)), 'danger');
		});
	},

	handleSaveApply: function() {
		var value = this.normalize(this.editor.getValue());
		return fs.write(confPath, value).then(function() {
			return fs.exec('/etc/init.d/aprx', [ 'restart' ]);
		}).then(function() {
			ui.addNotification(null, E('p', _('%s saved; aprx service restarted.').format(confPath)), 'info');
		}).catch(function(err) {
			ui.addNotification(null, E('p', _('Unable to apply changes: %s').format(err.message)), 'danger');
		});
	},

	handleReset: null
});
