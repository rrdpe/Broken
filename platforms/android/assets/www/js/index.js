/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
	mygoogle.initialize();
	app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

	listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var mygoogle = {
    map : "map",
    array:[],
    // Application Constructor
    initialize: function() {
	mygoogle.showMap();
    },
		
    showMap: function(){
	var mapProp = {
		center:new google.maps.LatLng(51.508742,-0.120850),
		zoom:3,
		mapTypeId:google.maps.MapTypeId.ROADMAP
		};
	this.map=new google.maps.Map(document.getElementById("map_canvas") ,mapProp);
    },
    
    startTracking: function() {
	setInterval(function () { track() }, 3000);
    },
    
    setDesignMode: function(value) {
	if (value == true) {
	    this.bindEvents(this.map, this.array);
	    this.map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
	} else {
	    this.unBindEvents();
	    this.map.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: false});
	}

    },
    
    track: function() {
	navigator.geolocation.getCurrentPosition(this.onSuccess, 
	this.onError, 
	{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    },
    
    onSuccess: function(position) {
	alert("Success");
	var latitudeAndLongitudeOne = new google.maps.LatLng(40, 40);
	
	var circleOptions = {
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 1,
		map: map,
		center: latitudeAndLongitudeOne,
		radius: 100000
	};
	
	cityCircle = new google.maps.Circle(circleOptions);
    },
    
    onError: function(error) {
	alert(error.code);												
    }, 
    
    bindEvents: function(map, array) {
	google.maps.event.addListener(this.map, 'mousedown', function(event) {
	    var circle ={
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: 'blue',
		fillOpacity: .4,
		scale: 4.5,
		strokeColor: 'white',
		strokeWeight: 1
	    };
	    
	    var position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
	    array.push(position);
	    
	    var boundPath = new google.maps.Polyline({
		path: array,
		geodesic: true,
		strokeColor: 'red',
		strokeOpacity: 1.0,
		strokeWeight: 2
	      });
	    
	    boundPath.setMap(map);
	    
	    var marker = new google.maps.Marker({
		position: position,
		map: map,
		icon: circle
	    });
	});
	
    },
    
    unBindEvents: function() {
	google.maps.event.clearListeners(this.map, 'mousedown');
    },
};