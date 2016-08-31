/*global LeafletTracksymbolLabel */

/**
 *
 */
L.Path.include({
	/**
	 *
	 * @param content
	 * @param options
	 * @returns {bindTracksymbolLabel}
	 */
	bindTracksymbolLabel: function (content, options) {
		if (!this.tracksymbollabel || this.tracksymbollabel.options !== options) {
			this.tracksymbollabel = new LeafletTracksymbolLabel(options, this);
		}

		this.tracksymbollabel.setContent(content);

		return this;
	},

	/**
	 *
	 * @returns {unbindTracksymbolLabel}
	 */
	unbindTracksymbolLabel: function () {
		if (this.tracksymbollabel) {
			this._hideTracksymbolLabel();
			this.tracksymbollabel = null;
		}
		return this;
	},

	/**
	 *
	 * @param content
	 */
	updateTracksymbolLabelContent: function (content) {
		if (this.tracksymbollabel) {
		    if (typeof content === 'string' && content !== "") {
                if (!this.tracksymbollabel.isOnMap()) {
                    this._showTracksymbolLabel();
                }
                this.tracksymbollabel.setContent(content);
            }
            else {
                if (this.tracksymbollabel.isOnMap()) {
                    this._hideTracksymbolLabel();
                }
            }
		}
	},

	/**
	 *
	 * @param latlng
	 */
	_showTracksymbolLabel: function () {
		if (this._map) {
			this._map.showTracklayerLabel(this.tracksymbollabel);
		}
	},

    /**
     *
     * @param latlng
     */
	updateTracksymolLabelLatLng: function (latlng) {
		this.tracksymbollabel.setLatLng(latlng);
	},

    /**
     *
     * @private
     */
	_hideTracksymbolLabel: function () {
		this.tracksymbollabel.close();
	}
});
