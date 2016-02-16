/**
 * Created by Johannes Rudolph <johannes.rudolph@gmx.de> on 10.02.2016.
 */

L.AISTrack = L.TrackSymbol.extend({

    initialize: function (options) {
        L.TrackSymbol.prototype.initialize.call(this,L.latLng(52.0,8.0) , options);
        options = options || {};

        //this.setTrackId(options.trackId || this._mmsi);
        this.setFill(options.fill || true);
        this.setFillColor(options.fillColor || '#d3d3d3');
        this.setFillOpacity(options.fillOpacity || 1.0);
        this.setStroke(options.stroke || true);
        this.setColor(options.color || '#000000');
        this.setOpacity(options.opacity || 1.0);
        this.setWeight(options.weight || 1.0);
        options.course = options.cog || 0;

        this.setMmsi(options.mssi || 0);
        this._aisVersionIndicator = options.aisVersionIndicator || 0;
        this._imoNumber = options.imoNumber || 0;
        this._callSign = options.callSign || "";
        this._name = options.name || "";
        this._typeOfShipAndCargo = options.typeOfShipAndCargo || 99;
        this._etaMonth = options.etaMonth || 0;
        this._etaDay = options.etaDay || 0;
        this._etaHour = options.etaHour || 0;
        this._etaMinute = options.etaMinute || 0;
        this._maxPresentStaticDraught = options.maxPresentStaticDraught || 0;
        this._destination = options.destination || "";
        this._dte = options.dte || 0;
        this._navigationStatus = options.navigationStatus || 0;
        this._rot = options.rot || 0;
        this._sog = options.sog || 0;
        this._positionAccuracy = options.positionAccuracy || 0;
        this._latitude = options.latitude || 0.0;
        this._longitude = options.longitude || 0.0;
        this._cog = options.cog || 0;
        this._trueHeading = options.trueHeading || 0;
        this._timeStamp = options.timeStamp || 0;
        this._specialManoeuvreIndicator = options.specialManoeuvreIndicator || 0;
        this._raimFlag = options.raimFlag || 0;
        this._communicationState = options.communicationState || 0;
        this._referencePositionA = options.referencePositionA || 0;
        this._referencePositionB = options.referencePositionB || 0;
        this._referencePositionC = options.referencePositionC || 0;
        this._referencePositionD = options.referencePositionD || 0;
        this._typeOfDevice = options.typeOfDevice || 0;
        this.setLastUpdate();

        //this._leaderTime = 600;

        this.bindLabel();
        this.bindPopup("",{className: "ais-track-popup"});

    },
    addData: function(aisData){
        if(aisData.navigationStatus) this.setNavigationStatus(aisData.navigationStatus);
        if(aisData.rot) this.setRot(aisData.rot);
        if(aisData.positionAccuracy) this.setPositionAccuracy(aisData.positionAccuracy);
        if(aisData.latitude) this.setLatitude(aisData.latitude);
        if(aisData.longitude) this.setLongitude(aisData.longitude);
        if(aisData.trueHeading) this.setTrueHeading(aisData.trueHeading);
        if(aisData.timeStamp) this.setTimeStamp(aisData.timeStamp);
        if(aisData.specialManoeuvreIndicator) this.setSpecialManoeuvreIndicator(aisData.specialManoeuvreIndicator);
        if(aisData.raimFlag) this.setRaimFlag(aisData.raimFlag);
        if(aisData.communicationState) this.setCommunicationState(aisData.communicationState);
        if(aisData.aisVersionIndicator) this.setAisVersionIndicator(aisData.aisVersionIndicator);
        if(aisData.imoNumber) this.setImoNumber(aisData.imoNumber);
        if(aisData.callSign) this.setCallSign(aisData.callSign);
        if(aisData.name) this.setName(aisData.name);
        if(aisData.typeOfShipAndCargo) this.setTypeOfShipAndCargo(aisData.typeOfShipAndCargo);
        if(aisData.referencePositionA) this.setReferencePositionA(aisData.referencePositionA);
        if(aisData.referencePositionB) this.setReferencePositionB(aisData.referencePositionB);
        if(aisData.referencePositionC) this.setReferencePositionC(aisData.referencePositionC);
        if(aisData.referencePositionC) this.setReferencePositionD(aisData.referencePositionD);
        if(aisData.typeOfDevice) this.setTypeOfDevice(aisData.typeOfDevice);
        if(aisData.eta) this.setEta(aisData.eta);
        if(aisData.maxPresentStaticDraught) this.setMaxPresentStaticDraught(aisData.maxPresentStaticDraught);
        if(aisData.destination) this.setDestination(aisData.destination);
        if(aisData.dte) this.setDte(aisData.dte);

        this.setMmsi(aisData.mmsi);
        this.getLatitude() && this.getLongitude() ?  this.setLatLng(L.latLng(this.getLatitude(), this.getLongitude())) : false;
        this.setLastUpdate();
    },

    _labelAndPopupUpdate: function (){
        this.updateLabelContent(this.getMmsi() + " " + this.getName());
        if(this._popup){
            this._popup.setContent(this._getPopupContent());
            //this._popup.update();
        }
    },

    _getPopupContent: function() {
        var headerText = this.getName().length !== 0  ? this.getName() : "MSSI: " + this.getMmsi();


        var content = "<div class='ais-popup-header'>"+headerText+"</div>" +
            "<div class='ais-popup-content'>" +
            "<table>";
        content += this._getTableRow("MSSI",this.getMmsi());
        content += this._getTableRow("Name",this.getName());
        content += this._getTableRow("IMO",this.getImoNumber());
        content += this._getTableRow("Call",this.getCallSign());
        content += this._getTableRow("Speed",this.getSog()," kn");
        content += this._getTableRow("Course",this.getCogDeg(),"&deg;");
        content += this._getTableRow("Heading",this.getTrueHeadingDeg(),"&deg;");
        content += this._getTableRow("Destination",this.getDestination());
        content += this._getTableRow("ETA",this.getEta());
        content += this._getTableRow("Navigation Status",this.getNavigationStatus()," "+this.getNavigationStatusText());
        content += this._getTableRow("Draught",this.getMaxPresentStaticDraught()," m");
        content += this._getTableRow("Last AIS Message",this.getLastUpdate());
        content += "</table></div>";
        content += "<div class='ais-popup-footer'>More Details on <a href='http://www.marinetraffic.com/en/ais/details/ships/mmsi:"+this.getMmsi()+"' target='_blank'>MarineTraffic.com</a></div>"
        return content;
    },

    _getTableRow: function(title,content,unit){
        if(!unit)
            unit = "";
        if(content)
            return  "<tr>" +
                "<td>" + title+  "</td>" +
                "<td>" + content + unit + "</td>" +
                "</tr>";
        return "";
    },

    _setColorsByTypeOfShip: function(){
        switch (this.getTypeOfShipAndCargo()){
            case 0: //FISHING
                this.setColor("#800000");
                this.setFillColor("#ffa07a");
                break;
            case 7: //Pleasure craft
                this.setColor("#8b008b");
                this.setFillColor("#ff00ff");
                break;
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49: //HSC
                this.setColor("#00008b");
                this.setFillColor("#90ee90");
                break;
            case 50: //PILOT
            case 51: //SAR
            case 52: //TUGS
            case 53: //Port tenders
            case 54: //Vessels with anti-pollution facilities or equipment
            case 55: //Law enforcement vessels
            case 56: //Spare – for assignments to local vessels
            case 57: //Spare – for assignments to local vessels
            case 58: //Medical transports (as defined in the 1949 Geneva Conventions and Additional Protocols)
            case 59: //Ships and aircraft of States not parties to an armed conflict
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69: //Passenger
                this.setColor("#00008b");
                this.setFillColor("#0000ff");
                break;
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79: //Cargo
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89: //TANKER
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            default: //Defauult
                this.setColor("#000000");
                this.setFillColor("#d3d3d3");
        }
    },

    getMmsi: function(){
        return this._mmsi;
    },

    setMmsi: function(mmsi){
        this._mmsi = mmsi;
        this._leaflet_id = mmsi;
        this._labelAndPopupUpdate();
    },

    getAisVersionIndicator: function(){
        return this._aisVersionIndicator;
    },

    setAisVersionIndicator: function(aisVersionIndicator){
        this._aisVersionIndicator = aisVersionIndicator;
    },

    getImoNumber: function() {
        return this._imoNumber;
    },

    setImoNumber: function(imoNumber){
        this._imoNumber = imoNumber;
    },

    getCallSign: function(){
        return this._callSign;
    },

    setCallSign: function(callSign){
        this._callSign = callSign;
    },

    getName: function(){
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },

    getTypeOfShipAndCargo: function(){
        return this._typeOfShipAndCargo;
    },

    setTypeOfShipAndCargo: function(typeOfShipAndCargo){
        this._typeOfShipAndCargo = typeOfShipAndCargo;
        this._setColorsByTypeOfShip();
    },

    getEta: function(){
        return this._eta;
    },

    setEta: function(eta){
        this._eta = eta;
    },

    getMaxPresentStaticDraught: function(){
        return this._maxPresentStaticDraught;
    },

    setMaxPresentStaticDraught: function(maxPresentStaticDraught){
        this._maxPresentStaticDraught = maxPresentStaticDraught;
    },

    getDestination: function(){
        return this._destination;
    },

    setDestination: function(destination){
        if(destination.length === 0)
            destination = false;
        this._destination = destination;
    },

    getDte: function(){
        return this._dte;
    },

    setDte: function(dte){
        this._dte = dte;
    },

    getNavigationStatus: function(){
        return this._navigationStatus;
    },

    getNavigationStatusText: function(){
        switch (this.getNavigationStatus()){
            case 0:
                return "under way using engine";
            case 1:
                return "at anchor";
            case 2:
                return "not under command";
            case 3:
                return "restricted manoeuvrability";
            case 4:
                return "constrained by her draught";
            case 5:
                return "moored";
            case 6:
                return "aground";
            case 7:
                return "engaged in fishing";
            case 8:
                return "under way sailing";
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                return "-";
            case 14:
                return "AIS-SART (active)";
            case 15:
                return "AIS-SART (test)";
        }
    },

    setNavigationStatus: function(navigationStatus){
        this._navigationStatus = navigationStatus;
    },

    getRot: function(){
        return this._rot;
    },

    setRot: function(rot){
        this._rot = rot;
    },

    getSog: function(){
        return this._sog;
    },

    setSog: function(sog){
        this._sog = sog;
        this.setSpeed(sog);
    },

    getPositionAccuracy: function(){
        return this._positionAccuracy;
    },

    setPositionAccuracy: function(positionAccuracy){
        this._positionAccuracy = positionAccuracy;
    },

    getLatitude: function(){
        return this._latitude;
    },

    setLatitude: function(lat){
        this._latitude = parseFloat(lat);
    },

    getLongitude: function(){
        return this._longitude;
    },

    setLongitude: function(lng){
        this._longitude = parseFloat(lng);
        if(this._popup)
            this._popup.setLatLng(L.latLng(this.getLatitude(),this.getLongitude()));
    },

    getCog: function(){
        return this._cog;
    },

    getCogDeg: function(){
        return Math.round(this.getCog() * (180/Math.PI));
    },

    setCog: function(cog){
        this._cog = cog;
        this._course = cog;
    },

    getTrueHeading: function(){
        return this._trueHeading;
    },

    getTrueHeadingDeg: function(){
        return Math.round(this.getTrueHeading() * (180/Math.PI));
    },

    setTrueHeading: function(trueHeading){
        this._trueHeading = trueHeading;
        this.setHeading(trueHeading);
    },

    getTimeStamp: function(){
        return this._timeStamp;
    },

    setTimeStamp: function(timeStamp){
        this._timeStamp = timeStamp;
    },

    getSpecialManoeuvreIndicator: function(){
        return this._specialManoeuvreIndicator;
    },

    setSpecialManoeuvreIndicator: function(specialManoeuvreIndicator){
        this._specialManoeuvreIndicator = specialManoeuvreIndicator;
    },

    getRaimFlag: function(){
        return this._raimFlag;
    },

    setRaimFlag: function(raimFlag){
        this._raimFlag = raimFlag;
    },

    getCommunicationState: function(){
        return this._communicationState;
    },

    setCommunicationState: function(communicationState){
        this._communicationState = communicationState;
    },

    getReferencePositionA: function(){
        return this._referencePositionA;
    },

    setReferencePositionA: function(referencePositionA){
        this._referencePositionA = referencePositionA;
    },

    getReferencePositionB: function(){
        return this._referencePositionB;
    },

    setReferencePositionB: function(referencePositionB){
        this._referencePositionB = referencePositionB;
    },

    getReferencePositionC: function(){
        return this._referencePositionC;
    },

    setReferencePositionC: function(referencePositionC){
        this._referencePositionC = referencePositionC;
    },

    getReferencePositionD: function(){
        return this._referencePositionD;
    },

    setReferencePositionD: function(referencePositionD){
        this._referencePositionD = referencePositionD;
    },

    getTypeOfDevice: function(){
        return this._typeOfDevice;
    },

    setTypeOfDevice: function(typeOfDevice){
        this._typeOfDevice = typeOfDevice;
    },

    getLastUpdate: function(){
        return this._lastUpdate;
    },

    setLastUpdate: function(){
        this._lastUpdate = new Date();
    }

});

L.aisTrack = function (options) {
    return new L.AISTrack(options);
};

