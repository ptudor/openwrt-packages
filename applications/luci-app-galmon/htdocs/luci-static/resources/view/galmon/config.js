'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m, s, o;
		
		m = new form.Map('galmon', _('Galmon'),
			_('Galmon Configuration.'));

		s = m.section(form.TypedSection, 'service', _('uxbtool Service Configuration'));
		s.anonymous = true;

		o = s.option(form.Flag, 'enabled', _('Enabled'),
			_('Enable ubxtool.'));
		o.default = '1';
		o.rmempty = false;

		o = s.option(form.Flag, 'gps', _('GPS'),
			_('Include GPS satellites.'));
		o.rmempty = false;

		o = s.option(form.Flag, 'galileo', _('Galileo'),
			_('Include Galileo satellites.'));
		o.rmempty = false;

		o = s.option(form.Flag, 'glonass', _('Glonass'),
			_('Include Glonass satellites.'));
		o.rmempty = false;

		o = s.option(form.Flag, 'beidou', _('Beidou'),
			_('Include Beidou satellites.'));
		o.rmempty = false;

		o = s.option(form.Flag, 'sbas', _('SBAS'),
			_('Include augmentation satellites.'));
		o.default = '1';
		o.rmempty = false;

		s.option(form.Value, 'port', _('Device Serial Port'),
			_('Path to serial device where receiver is attached.'));
		o.rmempty = false;

		s.option(form.Value, 'station', _('Station ID'),
			_('Unique numeric identification for this station.'));
		o.rmempty = false;

		s.option(form.Value, 'destination', _('Submit Destination'),
			_('Remote hostname of collector.'));
		o.rmempty = false;

		s.option(form.Value, 'owner', _('Owner'),
			_('Owner of this station.'));
		o.rmempty = false;

		s.option(form.Value, 'remark', _('Remark'),
			_('Remark for this station.'));
		o.rmempty = false;

		return m.render();
	},
});
