L.Map.include({
	/**
	 *
	 * @param label
	 * @returns {*}
	 */
	showTracklayerLabel: function (label) {
		return this.addLayer(label);
	}
});