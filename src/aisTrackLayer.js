/**
 * Created by Johannes Rudolph <johannes.rudolph@gmx.com> on 16.02.2016.
 */

L.AISTrackLayer = L.FeatureGroup.extend({

    initialize: function(layers){
        L.LayerGroup.prototype.initialize.call(this, layers);
        this._intervalDeadObjs = setInterval(this._checkDeadObjects,1000,this);
        this.setRemoveTime(10);      
    },

    addAisData: function(mmsi,data){
        var trackMarker;
        if(this.getLayer(mmsi)){
            trackMarker = this.getLayer(mmsi);
            trackMarker.addData(data);
        }
        else{
            trackMarker = L.aisTrack( {
                contextmenu: true,
                contextmenuItems: [{
                    text: 'CPA Calculation',
                    index: 0
                }, {
                    separator: true,
                    index: 1
                }]});
            trackMarker.addData(data);
            this.addLayer(trackMarker);
        }
    },

    _checkDeadObjects: function(layerGroup) {
        var now = new Date();
        layerGroup.eachLayer(function(layer){
            if((now - layer.getLastUpdate()) > (layerGroup.getRemoveTime() * 60 * 1000 ))
                layerGroup.removeLayer(layer);
        });
    },

    /**
     *
     * @param searchText
     * @returns {*}
     */
    searchTrack: function (searchText) {
        for(var i = 0 ; i < this.getLayers().length; i++){
            var obj = this.getLayers()[i];
            if(obj.getMmsi() === parseInt(searchText)){
                return obj;
            }
            if(obj.getName().toLowerCase() === searchText.toLowerCase()){
                return obj;
            }
            if(obj.getImoNumber() === parseInt(searchText)){
                return obj;
            }
        }
        return false;
    },

    setRemoveTime: function(minutes){
        this._removeMinutes = minutes;
    },

    getRemoveTime: function(){
        return this._removeMinutes;
    }
});

L.aisTrackLayer = function() {
    return new L.AISTrackLayer();
};