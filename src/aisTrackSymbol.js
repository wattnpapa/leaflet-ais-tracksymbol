/**
 * Created by Johannes Rudolph <johannes.rudolph@gmx.de> on 14.11.2017.
 */


/**
 *
 * @param options
 * @returns {*}
 */
L.aisTrackSymbol = function (options) {
    if(options.iconListByTypeOfShip) {
        return new L.AISTrackSymbolMarker(options);
    }
    else {
        return new L.AISTrackSymbolPath(options);
    }
};

