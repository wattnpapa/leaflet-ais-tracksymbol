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
        this._nameOfAtoN = options.nameOfAtoN || "";
        this._utcYear = options.utcYear || 0;
        this._utcMonth = options.utcMonth || 0;
        this._utcDay = options.utcDay || 0;
        this._utcHour = options.utcHour || 24;
        this._utcMinute = options.utcMinute || 60;
        this._utcSecond = options.utcSecond || 60;
        this._virtualAtoNFlag = options.virtualAtoNFlag || 0;
        this._assignedModeFlag = options.assignedModeFlag || 0;
        this.setLastUpdate();

        this.bindLabel();
        this.bindPopup("",{className: "ais-track-popup"});

    },
    addData: function(aisData){
        this.setMmsi(aisData.mmsi);
        this.setMsgId(aisData.aisMsgId);
        if(aisData.navigationStatus) this.setNavigationStatus(aisData.navigationStatus);

        if(aisData.positionAccuracy) this.setPositionAccuracy(aisData.positionAccuracy);
        if(aisData.latitude) this.setLatitude(aisData.latitude);
        if(aisData.longitude) this.setLongitude(aisData.longitude);

        if(this.getLatitude() && this.getLongitude()) this.setLatLng(L.latLng(this.getLatitude(), this.getLongitude()));

        if(aisData.rot) this.setRot(aisData.rot);
        if(aisData.sog) this.setSog(aisData.sog);
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
        if(aisData.cog) this.setCog(aisData.cog);      
        if(this.getReferencePositions()) this.setGPSRefPos(this.getReferencePositions());
        if(aisData.typeOfAtoN) this.setTypeOfAtoN(aisData.typeOfAtoN);
        if(aisData.nameOfAtoN) this.setName(aisData.nameOfAtoN);
        if(aisData.virtualAtoNFlag) this.setVirtualAtoNFlag(aisData.virtualAtoNFlag);
        if(aisData.assignedModeFlag) this.setAssignedModeFlag(aisData.assignedModeFlag); 
        if(aisData.utcYear) this.setUTCYear(aisData.utcYear);
        if(aisData.utcMonth) this.setUTCMonth(aisData.utcMonth);
        if(aisData.utcDay) this.setUTCDay(aisData.utcDay);
        if(aisData.utcHour) this.setUTCHour(aisData.utcHour);
        if(aisData.utcMinute) this.setUTCMinute(aisData.utcMinute);
        if(aisData.utcSecond) this.setUTCSecond(aisData.utcSecond);
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
    
    getTypeOfAtoNText: function(){
        this._setColorByTypeOfAtoN();
        switch (this.getTypeOfAtoN()){
            case 0:
                return "Default, Type of AtoN not specified";
            case 1:
                return "Reference point";
            case 2:
                return "RACON";
            case 3:
                return "Fixed structures off-shore";
            case 4:
                return "Emergency Wreck Marking Buoy";
            case 5:
                return "Light, without sectors";
            case 6:
                return "Light, with sectors";
            case 7:
                return "Leading Light Front";
            case 8:
                return "Leading Light Rear";
            case 9:
                return "Beacon, Cardinal N";
            case 10:
                return "Beacon, Cardinal E";
            case 11:
                return "Beacon, Cardinal S";
            case 12:
                return "Beacon, Cardinal W";
            case 13:
                return "Beacon, Port hand";
            case 14:
                return "Beacon, Starboard hand";
            case 15:
                return "Beacon, Preferred Channel port hand";            
            case 16:
                return "Beacon, Preferred Channel starboard hand";
            case 17:
                return "Beacon, Isolated danger";
            case 18:
                return "Beacon, Safe water";
            case 19:
                return "Beacon, Special mark";
            case 20:
                return "Cardinal Mark N";
            case 21:
                return "Cardinal Mark E";
            case 22:
                return "Cardinal Mark S";
            case 23:
                return "Cardinal Mark W";
            case 24:
                return "Port hand Mark";
            case 25:
                return "Starboard hand Mark";
            case 26:
                return "Preferred Channel Port hand";
            case 27:
                return "Preferred Channel Starboard hand";
            case 28:
                return "Isolated danger";
            case 29:
                return "Safe Water";
            case 30:
                return "Special Mark";
            case 31:
                return "Light Vessel/LANBY/Rigs";
        }
    },

    setTypeOfAtoN: function(typeOfAtoN){
        this._typeOfAtoN = typeOfAtoN;        
    },
    
    getNameOfAtoN: function(){
        return this._nameOfAtoN;
    },
    
    setVirtualAtoNFlag: function(virtualAtoNFlag){
        this._virtualAtoNFlag = virtualAtoNFlag;        
    },
    
    getVirtualAtoNFlag: function(){
        return this._virtualAtoNFlag;
    },
    
    getVirtualAtoNFlagText: function(){        
        switch (this.getVirtualAtoNFlag()){
            case 0:
                return "real AtoN at indicated position";
            case 1:
                return "virtual AtoN, does not physically exist";            
        }
    },
    
    setAssignedModeFlag: function(assignedModeFlag){
        this._assignedModeFlag = assignedModeFlag;        
    },
    
    getAssignedModeFlag: function(){
        return this._assignedModeFlag;
    },
    
    getAssignedModeFlagText: function(){        
        switch (this.getAssignedModeFlag()){
            case 0:
                return "Station operating in autonomous and continuous mode";
            case 1:
                return "Station operating in assigned mode";            
        }
    },

    setNameOfAtoN: function(nameOfAtoN){
        this._nameOfAtoN = nameOfAtoN;
    },
    
    setUTCYear: function(utcYear){
        this._utcYear = utcYear;        
    },
    
    getUTCYear: function(){
        return this._utcYear;
    },
    
    setUTCMonth: function(utcMonth){
        if (utcMonth >= 10)
            this._utcMonth = utcMonth;
        else
            this._utcMonth = "0" + utcMonth;
    },
    
    getUTCMonth: function(){
        return this._utcMonth;
    },
    
    setUTCDay: function(utcDay){
        if (utcDay >= 10)
            this._utcDay = utcDay;
        else
            this._utcDay = "0" + utcDay;
    },
    
    getUTCDay: function(){
        return this._utcDay;
    },
    
    setUTCHour: function(utcHour){
        if (utcHour >= 10)
            this._utcHour = utcHour; 
        else
            this._utcHour = "0" + utcHour;               
    },
    
    getUTCHour: function(){
        return this._utcHour;
    },
    
    setUTCMinute: function(utcMinute){
        if (utcMinute >= 10)
            this._utcMinute = utcMinute;
        else
            this._utcMinute = "0" + utcMinute;
    },
    
    getUTCMinute: function(){
        return this._utcMinute;
    },
    
    setUTCSecond: function(utcSecond){
        if (utcSecond >= 10)
            this._utcSecond = utcSecond;
        else
            this._utcSecond = "0" + utcSecond;
    },
    
    getUTCSecond: function(){
        return this._utcSecond;
    },
    
    getUTCTime: function(){
       return this.getUTCYear() + "." + this.getUTCMonth() + "." + this.getUTCDay() + " " + this.getUTCHour() + ":" + this.getUTCMinute() + ":" + this.getUTCSecond() + " UTC";
    },
    
    
    getTypeOfDevice: function(){
        return this._typeOfDevice;
    },
    
    getTypeOfDeviceText: function(){
        this._setColorByTypeOfDevice();
        switch (this.getTypeOfDevice()){
            case 0:
                return "undefined (default)";
            case 1:
                return "global positioning system (GPS)";
            case 2:
                return "GNSS (GLONASS)";
            case 3:
                return "combined GPS/GLONASS";
            case 4:
                return "Loran-C";
            case 5:
                return "Chayka";
            case 6:
                return "integrated navigation system";
            case 7:
                return "surveyed";
            case 8:
                return "Galileo";
            case 9:
            case 10:                
            case 11:                
            case 12:                
            case 13:                
            case 14:                
            case 15:
                return "internal GNSS";
        }
    },

    setTypeOfDevice: function(typeOfDevice){
        this._typeOfDevice = typeOfDevice;        
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

    getShipLength: function(){
        return this._referencePositionA + this._referencePositionB;
    },

    getShipWidth: function(){
        return this._referencePositionC + this._referencePositionD;
    },

    getTypeOfShipText: function(){
        switch (this.getTypeOfShipAndCargo()){
            case 0:
                return "NOT AVAILABLE OR NO SHIP";
            case 1:
                return "RESERVED";
            case 2:
                return "RESERVED";
            case 3:
                return "RESERVED";
            case 4:
                return "RESERVED";
            case 5:
                return "RESERVED";
            case 6:
                return "RESERVED";
            case 7:
                return "RESERVED";
            case 8:
                return "RESERVED";
            case 9:
                return "RESERVED";
            case 10:
                return "RESERVED";
            case 11:
                return "RESERVED";
            case 12:
                return "RESERVED";
            case 13:
                return "RESERVED";
            case 14:
                return "RESERVED";
            case 15:
                return "RESERVED";
            case 16:
                return "RESERVED";
            case 17:
                return "RESERVED";
            case 18:
                return "RESERVED";
            case 19:
                return "RESERVED";
            case 20:
                return "Wing In Grnd";
            case 21:
                return "Wing In Grnd";
            case 22:
                return "Wing In Grnd";
            case 23:
                return "Wing In Grnd";
            case 24:
                return "Wing In Grnd";
            case 25:
                return "Wing In Grnd";
            case 26:
                return "Wing In Grnd";
            case 27:
                return "Wing In Grnd";
            case 28:
                return "Wing In Grnd";
            case 29:
                return "Wing In Grnd";
            case 30:
                return "Fishing";
            case 31:
                return "Tug";
            case 32:
                return "Tug";
            case 33:
                return "Dredger";
            case 34:
                return "Dive Vessel";
            case 35:
                return "Military Ops";
            case 36:
                return "Sailing Vessel";
            case 37:
                return "Pleasure Craft";
            case 38:
                return "RESERVED";
            case 39:
                return "RESERVED";
            case 40:
                return "High-Speed Craft";
            case 41:
                return "High-Speed Craft";
            case 42:
                return "High-Speed Craft";
            case 43:
                return "High-Speed Craft";
            case 44:
                return "High-Speed Craft";
            case 45:
                return "High-Speed Craft";
            case 46:
                return "High-Speed Craft";
            case 47:
                return "High-Speed Craft";
            case 48:
                return "High-Speed Craft";
            case 49:
                return "High-Speed Craft";
            case 50:
                return "Pilot Vessel";
            case 51:
                return "SAR";
            case 52:
                return "Tug";
            case 53:
                return "Port Tender";
            case 54:
                return "Anti-Pollution";
            case 55:
                return "Law Enforce";
            case 56:
                return "Local Vessel";
            case 57:
                return "Local Vessel";
            case 58:
                return "Medical Trans";
            case 59:
                return "Special Craft";
            case 60:
                return "Passenger";
            case 61:
                return "Passenger";
            case 62:
                return "Passenger";
            case 63:
                return "Passenger";
            case 64:
                return "Passenger";
            case 65:
                return "Passenger";
            case 66:
                return "Passenger";
            case 67:
                return "Passenger";
            case 68:
                return "Passenger";
            case 69:
                return "Passenger";
            case 70:
                return "Cargo";
            case 71:
                return "Cargo - Hazard A";
            case 72:
                return "Cargo - Hazard B";
            case 73:
                return "Cargo - Hazard C";
            case 74:
                return "Cargo - Hazard D";
            case 75:
                return "Cargo";
            case 76:
                return "Cargo";
            case 77:
                return "Cargo";
            case 78:
                return "Cargo";
            case 79:
                return "Cargo";
            case 80:
                return "Tanker";
            case 81:
                return "Tanker - Hazard A";
            case 82:
                return "Tanker - Hazard B";
            case 83:
                return "Tanker - Hazard C";
            case 84:
                return "Tanker - Hazard D";
            case 85:
                return "Tanker";
            case 86:
                return "Tanker";
            case 87:
                return "Tanker";
            case 88:
                return "Tanker";
            case 89:
                return "Tanker";
            case 90:
                return "Other";
            case 91:
                return "Other";
            case 92:
                return "Other";
            case 93:
                return "Other";
            case 94:
                return "Other";
            case 95:
                return "Other";
            case 96:
                return "Other";
            case 97:
                return "Other";
            case 98:
                return "Other";
            case 99:
                return "Other";
            default:
                return "Other";
        }
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

