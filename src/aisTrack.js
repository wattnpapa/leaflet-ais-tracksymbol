/**
 * Created by Johannes Rudolph <johannes.rudolph@gmx.de> on 10.02.2016.
 */

L.AISTrack = L.TrackSymbol.extend({

    initialize: function (options) {
        L.TrackSymbol.prototype.initialize.call(this,L.latLng(0.0,0.0) , options);
        options = options || {};

        //this.setTrackId(options.trackId || this._mmsi);
        this.setFill(options.fill || true);
        this.setFillColor(options.fillColor || '#d3d3d3');
        this.setFillOpacity(options.fillOpacity || 1.0);
        this.setStroke(options.stroke || true);
        this.setColor(options.color || '#000000');
        this.setOpacity(options.opacity || 1.0);
        this.setWeight(options.weight || 1.0);
        this._leaderTime = 300;
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
        this._typeOfAtoN = options.typeOfAtoN || 0;
        this.setLastUpdate();

        this.bindLabel();
        this.bindPopup("",{className: "ais-track-popup"});

    },
    addData: function(aisData){
        this.setMmsi(aisData.mmsi);
        this.setMsgId(aisData.aisMsgId);
        if(aisData.navigationStatus) this.setNavigationStatus(aisData.navigationStatus);
        if(aisData.rot) this.setRot(aisData.rot);
        if(aisData.sog) this.setSog(aisData.sog);
        if(aisData.positionAccuracy) this.setPositionAccuracy(aisData.positionAccuracy);
        if(aisData.latitude) this.setLatitude(aisData.latitude);
        if(aisData.longitude) this.setLongitude(aisData.longitude);
        if(this.getLatitude() && this.getLongitude()) this.setLatLng(L.latLng(this.getLatitude(), this.getLongitude()));

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

        if(this.getReferencePositions()) this.setGPSRefPos(this.getReferencePositions());
        if(aisData.typeOfAtoN) this.setTypeOfAtoN(aisData.typeOfAtoN);
        this._setNameByMMSITable();
        this.setLastUpdate();
        this._labelAndPopupUpdate();
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
    
    _setNameByMMSITable: function(){
        if (typeof MMSI !== 'undefined')
            if(MMSI[this.getMmsi()])
                this.setName(MMSI[this.getMmsi()]);
    },

    _setColorsByTypeOfShip: function(){
        switch (this.getTypeOfShipAndCargo()){
            case 0: //NOT AVAILABLE OR NO SHIP
                this.setColor("#000000");
                this.setFillColor("#d3d3d3");
                break;
            case 1: //RESERVED               
            case 2: //RESERVED
            case 3: //RESERVED
            case 4: //RESERVED
            case 5: //RESERVED
            case 6: //RESERVED
            case 8: //RESERVED
            case 9: //RESERVED
            case 10: //RESERVED
            case 11: //RESERVED
            case 12: //RESERVED
            case 13: //RESERVED
            case 14: //RESERVED
            case 15: //RESERVED
            case 16: //RESERVED
            case 17: //RESERVED
            case 18: //RESERVED
            case 19: //RESERVED
                this.setColor("#000000");
                this.setFillColor("#d3d3d3");
                break;
            case 20: //Wing In Grnd
            case 21: //Wing In Grnd
            case 22: //Wing In Grnd
            case 23: //Wing In Grnd
            case 24: //Wing In Grnd
            case 25: //Wing In Grnd
            case 26: //Wing In Grnd
            case 27: //Wing In Grnd
            case 28: //Wing In Grnd
                this.setColor("#000000");
                this.setFillColor("#d3d3d3");
                break;
            case 29: //SAR AIRCRAFT
                this.setColor("#000000");
                this.setFillColor("#d3d3d3");
                break;
            case 30: //Fishing
                this.setColor("#800000");
                this.setFillColor("#ffa07a");
                break;
            case 31: //Tug
            case 32: //Tug
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 33: //Dredger
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 34: //Dive Vessel
            case 35: //Military Ops
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 36: //Sailing Vessel
                this.setColor("#8b008b");
                this.setFillColor("#ff00ff");
                break;
            case 37: //Pleasure Craft
                this.setColor("#8b008b");
                this.setFillColor("#ff00ff");
                break;
            case 38: //RESERVED
            case 39: //RESERVED
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 40: //High-Speed Craft
            case 41: //High-Speed Craft
            case 42: //High-Speed Craft
            case 43: //High-Speed Craft
            case 44: //High-Speed Craft
            case 45: //High-Speed Craft
            case 46: //High-Speed Craft
            case 47: //High-Speed Craft
            case 48: //High-Speed Craft
            case 49: //High-Speed Craft
                this.setColor("#00008b");
                this.setFillColor("#ffff00");
                break;
            case 50: //Pilot Vessel
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 51: //SAR
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 52: //Tug
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 53: //Port Tender
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 54: //Anti-Pollution
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 55: //Law Enforce
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 56: //Local Vessel
            case 57: //Local Vessel
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 58: //Medical Trans (as defined in the 1949 Geneva Conventions and Additional Protocols)
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 59: //Special Craft
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            case 60: //Passenger
            case 61: //Passenger
            case 62: //Passenger
            case 63: //Passenger
            case 64: //Passenger
            case 65: //Passenger
            case 66: //Passenger
            case 67: //Passenger
            case 68: //Passenger
            case 69: //Passenger
                this.setColor("#00008b");
                this.setFillColor("#0000ff");
                break;
            case 70: //Cargo
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 71: //Cargo - Hazard A
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 72: //Cargo - Hazard B
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 73: //Cargo - Hazard C
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 74: //Cargo - Hazard D
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 75: //Cargo
            case 76: //Cargo
            case 77: //Cargo
            case 78: //Cargo
            case 79: //Cargo
                this.setColor("#006400");
                this.setFillColor("#90ee90");
                break;
            case 80: //Tanker
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            case 81: //Tanker - Hazard A
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            case 82: //Tanker - Hazard B
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            case 83: //Tanker - Hazard C
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            case 84: //Tanker - Hazard D
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            case 85: //Tanker
            case 86: //Tanker
            case 87: //Tanker
            case 88: //Tanker
            case 89: //Tanker
                this.setColor("#8b0000");
                this.setFillColor("#ff0000");
                break;
            case 90: //Other
            case 91: //Other
            case 92: //Other
            case 93: //Other
            case 94: //Other
            case 95: //Other
            case 96: //Other
            case 97: //Other
            case 98: //Other
            case 99: //Other
                this.setColor("#008b8b");
                this.setFillColor("#00ffff");
                break;
            default: //Default
                this.setColor("#000000");
                this.setFillColor("#d3d3d3");
        }
    },
        
    getMsgId: function(){
        return this._msgId;
    },

    setMsgId: function(msgId){
        this._msgId = msgId;
    },
    
    getMmsi: function(){
        return this._mmsi;
    },

    setMmsi: function(mmsi){
        this._mmsi = mmsi;
        this._leaflet_id = mmsi;
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
    
    getTypeOfAtoN: function(){
        return this._typeOfAtoN;
    },    

    setTypeOfAtoN: function(typeOfAtoN){
        this._typeOfAtoN = typeOfAtoN;        
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
    
    getSogKmH: function(){
        var speedKmH = this._sog * 1.852;
        return speedKmH.toFixed(1);
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
        this.setCourse(cog)
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

    getReferencePositions: function(){
        return (this.getReferencePositionA() && this.getReferencePositionB() && this.getReferencePositionC() && this.getReferencePositionD()) ? [this.getReferencePositionA(),this.getReferencePositionB() ,this.getReferencePositionC() , this.getReferencePositionD()] : false;
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
    },

    /**
     * Sets the line color of the symbol.
     * @method setColor
     * @param color {String} The color string.
     */
    setColor: function(color) {
        this.setStyle({color: color})
        return this.redraw();
    },

    /**
     * Sets the fill Opacity of the symbol.
     * @method setFillOpacity
     * @param fillOpacity {Number} The fill opacity.
     */
    setFillOpacity: function(fillOpacity) {
        this.setStyle({fillOpacity: fillOpacity})
        return this.redraw();
    },

    /**
     * Sets the Opacity of the symbol.
     * @method setOpacity
     * @param opacity {Number} The opacity.
     */
    setOpacity: function(opacity) {
        this.setStyle({opacity: opacity})
        return this.redraw();
    },

    /**
     * Sets the Weight of the symbol.
     * @method setWeight
     * @param weight {Number} The weight .
     */
    setWeight: function(weight) {
        this.setStyle({weight: weight})
        return this.redraw();
    },

    /**
     * Sets the fill of the symbol.
     * @method setFill
     * @param fill {Boolean} The fill.
     */
    setFill: function(fill) {
        this.setStyle({fill: fill})
        return this.redraw();
    },

    /**
     * Sets the stroke of the symbol.
     * @method setStroke
     * @param stroke {Boolean} The stroke.
     */
    setStroke: function(stroke) {
        this.setStyle({stroke: stroke})
        return this.redraw();
    },

    /**
     * Sets the fill color of the symbol.
     * @method setFillColor
     * @param color {String} The color string.
     */
    setFillColor: function(color) {
        this.setStyle({fillColor: color})
    }

});

L.aisTrack = function (options) {
    return new L.AISTrack(options);
};

