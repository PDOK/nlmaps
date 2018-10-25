function err(e){throw e}function mergeConfig(e,t){return Object.assign({},e,t)}function parseBase(e){var t=mergeConfig(CONFIG.BASE_DEFAULTS,e.defaults);(!e.layers||e.layers.length<0)&&err("no basemap defined, please define a basemap in the configuration"),e.layers.forEach(function(e){e.name&&void 0===CONFIG.BASEMAP_PROVIDERS[e.name]||err("basemap names need to be defined and unique: "+e.name),CONFIG.BASEMAP_PROVIDERS[e.name]=formatBasemapUrl(mergeConfig(t,e))})}function parseWMS(e){var t=mergeConfig(CONFIG.WMS_DEFAULTS,e.defaults);e.layers&&e.layers.forEach(function(e){e.name&&void 0===CONFIG.WMS_PROVIDERS[e.name]||err("wms names need to be defined and unique: "+e.name),CONFIG.WMS_PROVIDERS[e.name]=applyTemplate(mergeConfig(t,e))})}function parseGeocoder(e){CONFIG.GEOCODER.lookupUrl=e.lookupUrl,CONFIG.GEOCODER.suggestUrl=e.suggestUrl,CONFIG.GEOCODER.placeholder=e.placeholder}function parseMap(e){CONFIG.MAP=mergeConfig(CONFIG.MAP,e)}function formatBasemapUrl(e){switch(e.type){case"wmts":e.url=e.url+"/"+e.type+"/"+e.layerName+"/"+e.crs+"/{z}/{x}/{y}."+e.format;break;case"tms":e.url=e.url+"/"+e.layerName+"/{z}/{x}/{y}."+e.format;break;default:e.url=e.url+"/"+e.type+"/"+e.layerName+"/"+e.crs+"/{z}/{x}/{y}."+e.format}return e}function applyTemplate(e){var t=e.url.indexOf("{");if(t>-1){var o=e.url.indexOf("}");"workspacename"===e.url.slice(t+1,o).toLowerCase()?e.url=e.url.slice(0,t)+e.workSpaceName+e.url.slice(o+1,-1):err("only workspacename templates are supported for now")}return e}function parseFeatureQuery(e){CONFIG.FEATUREQUERYBASEURL=e}function parseClasses(e){CONFIG.CLASSNAMES=mergeConfig(CONFIG.CLASSNAMES,e)}function parseMarker(e){CONFIG.MARKER=e}function httpGetAsync(e){return new Promise(function(t,o){var n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&200==n.status&&t(JSON.parse(n.responseText))},n.open("GET",e,!0),n.send(null)})}function wktPointToGeoJson(e){if(!e.includes("POINT"))throw TypeError("Provided WKT geometry is not a point.");var t=e.split("(")[1].split(")")[0];return{type:"Point",coordinates:[parseFloat(t.split(" ")[0]),parseFloat(t.split(" ")[1])]}}function parseClasses$1(e,t){t.forEach(function(t){e.classList.add(t)})}function getMarker(){return CONFIG.MARKER}function getExtent(){return CONFIG.MAP.extent}function getProvider(e){if(e in CONFIG.BASEMAP_PROVIDERS){var t=CONFIG.BASEMAP_PROVIDERS[e];return t.deprecated&&console&&console.warn&&console.warn(e+" is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference."),t}console.error("NL Maps error: You asked for a style which does not exist! Available styles: "+Object.keys(PROVIDERS).join(", "))}function getWmsProvider(e,t){var o=void 0;return e in CONFIG.WMS_PROVIDERS?(o=CONFIG.WMS_PROVIDERS[e]).deprecated&&console&&console.warn&&console.warn(e+" is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference."):(o=Object.assign({},CONFIG.WMS_DEFAULTS,t),console.log("NL Maps: You asked for a wms which does not exist! Available wmses: "+Object.keys(CONFIG.WMS_PROVIDERS).join(", ")+". Provide an options object to make your own WMS.")),o}function extentLeafletFormat(){var e=getExtent(),t=L.latLng(e[0],e[1]),o=L.latLng(e[2],e[3]);return L.latLngBounds(t,o)}function markerLayer(e){if("undefined"!=typeof L&&"object"===("undefined"==typeof L?"undefined":_typeof(L))){var t=void 0,o=void 0;if(void 0===e){var n=getMapCenter(map);t=n.latitude,o=n.longitude}else t=e.latitude,o=e.longitude;return new L.marker([t,o],{alt:"marker",icon:new L.icon({iconUrl:getMarker().url,iconSize:getMarker().iconSize,iconAnchor:getMarker().iconAnchor})})}}function bgLayer(e){if("undefined"!=typeof L&&"object"===("undefined"==typeof L?"undefined":_typeof(L)))return L.nlmapsBgLayer(e)}function overlayLayer(e,t){if("undefined"!=typeof L&&"object"===("undefined"==typeof L?"undefined":_typeof(L)))return L.nlmapsOverlayLayer(e,t)}function geoLocatorControl(e){if("undefined"!=typeof L&&"object"===("undefined"==typeof L?"undefined":_typeof(L)))return L.geoLocatorControl(e)}function zoomTo(e,t){t.fitBounds(L.geoJSON(e).getBounds(),{maxZoom:18})}function geocoderControl(e,t){var o=geocoder.createControl(zoomTo,e,t);e.getContainer().parentElement.insertBefore(o,e.getContainer().parentElement[0])}function getMapCenter(e){var t=e.getCenter();return{latitude:t.lat,longitude:t.lng}}var config={version:.2,basemaps:{defaults:{crs:"EPSG:3857",attribution:"Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> |             <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",minZoom:6,maxZoom:19,type:"wmts",format:"png",url:"https://geodata.nationaalgeoregister.nl/tiles/service"},layers:[{name:"standaard",layerName:"brtachtergrondkaart"},{name:"grijs",layerName:"brtachtergrondkaartgrijs"},{name:"pastel",layerName:"brtachtergrondkaartpastel"},{name:"luchtfoto",layerName:"2016_ortho25",url:"https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",format:"jpeg"}]},wms:{defaults:{url:"https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",version:"1.1.1",transparent:!0,format:"image/png",minZoom:0,maxZoom:24},layers:[{name:"gebouwen",workSpaceName:"bag",layerName:"pand"},{name:"percelen",workSpaceName:"kadastralekaartv3",layerName:"kadastralekaart"},{name:"drone-no-fly-zones",workSpaceName:"dronenoflyzones",layerName:"luchtvaartgebieden,landingsite"},{name:"hoogte",workSpaceName:"ahn2",layerName:"ahn2_05m_int",styleName:"ahn2:ahn2_05m_detail"},{name:"gemeenten",workSpaceName:"bestuurlijkegrenzen",layerName:"gemeenten",styleName:"bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"},{name:"provincies",workSpaceName:"bestuurlijkegrenzen",layerName:"provincies",styleName:"bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"}]},geocoder:{suggestUrl:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",lookupUrl:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?",placeholder:"Zoomen naar adres ..."},map:{style:"standaard",center:{latitude:52.093249,longitude:5.111994},zoom:8,attribution:!0,extent:[-180,-90,180,90],zoomposition:"topright"},marker:{url:"./assets/img/marker_icon.svg",iconSize:[64,64],iconAnchor:[63,32]},classnames:{geocoderContainer:["nlmaps-geocoder-control-container"],geocoderSearch:["nlmaps-geocoder-control-search"],geocoderButton:["nlmaps-geocoder-control-button"],geocoderResultList:["nlmaps-geocoder-result-list"],geocoderResultItem:["nlmaps-geocoder-result-item"],geocoderResultSelected:["nlmaps-geocoder-result-selected"]}},CONFIG={};CONFIG.BASE_DEFAULTS={crs:"EPSG:3857",attr:"",minZoom:0,maxZoom:19,type:"wmts",format:"png",url:""},CONFIG.WMS_DEFAULTS={url:"",version:"1.1.1",transparent:!0,format:"image/png",minZoom:0,maxZoom:24,styleName:""},CONFIG.BASEMAP_PROVIDERS={},CONFIG.WMS_PROVIDERS={},CONFIG.GEOCODER={},CONFIG.MAP={zoomposition:"bottomleft"},CONFIG.MARKER={},CONFIG.CLASSNAMES={geocoderContainer:["nlmaps-geocoder-control-container"],geocoderSearch:["nlmaps-geocoder-control-search"],geocoderButton:["nlmaps-geocoder-control-button"],geocoderResultList:["nlmaps-geocoder-result-list"],geocoderResultItem:["nlmaps-geocoder-result-item"]},.2!==config.version&&err("unsupported config version"),void 0!==config.featureQuery&&parseFeatureQuery(config.featureQuery.baseUrl),void 0!==config.map&&parseMap(config.map),parseBase(config.basemaps),void 0!==config.wms&&parseWMS(config.wms),void 0!==config.geocoder&&parseGeocoder(config.geocoder),void 0!==config.marker&&parseMarker(config.marker),void 0!==config.classnames&&parseClasses(config.classnames);var geocoder=CONFIG.GEOCODER;geocoder.resultList=[],geocoder.selectedResult=-1,geocoder.doSuggestRequest=function(e){return httpGetAsync(this.suggestUrl+"q="+encodeURIComponent(e))},geocoder.doLookupRequest=function(e){return httpGetAsync(this.lookupUrl+"id="+encodeURIComponent(e)).then(function(e){var t=e.response.docs[0];return t.centroide_ll=wktPointToGeoJson(t.centroide_ll),t.centroide_rd=wktPointToGeoJson(t.centroide_rd),t})},geocoder.createControl=function(e,t,o){var n=this;this.zoomTo=e,this.map=t,this.nlmaps=o;var r=document.createElement("div"),a=document.createElement("form"),s=document.createElement("input"),l=document.createElement("button"),i=document.createElement("div");return parseClasses$1(r,CONFIG.CLASSNAMES.geocoderContainer),parseClasses$1(a,CONFIG.CLASSNAMES.geocoderSearch),r.addEventListener("click",function(e){return e.stopPropagation()}),r.addEventListener("dblclick",function(e){return e.stopPropagation()}),s.id="nlmaps-geocoder-control-input",s.placeholder=geocoder.placeholder,s.setAttribute("aria-label",geocoder.placeholder),s.setAttribute("type","text"),s.setAttribute("autocapitalize","off"),s.setAttribute("autocomplete","off"),s.setAttribute("autocorrect","off"),s.setAttribute("spellcheck","false"),s.addEventListener("keydown",function(e){var t=n.resultList;n.resultList.length>0&&("ArrowDown"!==e.code&&40!==e.keyCode||(n.selectedResult<n.resultList.length-1&&n.selectedResult++,n.showLookupResult(t[n.selectedResult])),"ArrowUp"!==e.code&&38!==e.keyCode||(n.selectedResult>0&&n.selectedResult--,n.showLookupResult(t[n.selectedResult])),"Escape"===e.code&&n.clearSuggestResults(!0))}),s.addEventListener("input",function(e){n.suggest(e.target.value)}),s.addEventListener("focus",function(e){n.suggest(e.target.value)}),l.setAttribute("type","submit"),a.addEventListener("submit",function(e){e.preventDefault(),n.resultList.length>0&&n.lookup(n.resultList[n.selectedResult<0?0:n.selectedResult].id)}),l.setAttribute("aria-label",geocoder.placeholder),parseClasses$1(l,CONFIG.CLASSNAMES.geocoderButton),i.id="nlmaps-geocoder-control-results",parseClasses$1(i,CONFIG.CLASSNAMES.geocoderResultList),i.classList.add("nlmaps-hidden"),r.appendChild(a),a.appendChild(s),a.appendChild(l),r.appendChild(i),r},geocoder.suggest=function(e){var t=this;if(e.length<3)return void this.clearSuggestResults();this.doSuggestRequest(e).then(function(e){t.resultList=e.response.docs,t.showSuggestResults(t.resultList)})},geocoder.lookup=function(e){var t=this;this.doLookupRequest(e).then(function(e){t.zoomTo(e.centroide_ll,t.map),t.nlmaps.emit("search-select",{location:e.weergavenaam,latlng:e.centroide_ll,resultObject:e}),t.showLookupResult(e),t.clearSuggestResults()})},geocoder.clearSuggestResults=function(e){this.selectedResult=-1,e&&(document.getElementById("nlmaps-geocoder-control-input").value=""),document.getElementById("nlmaps-geocoder-control-results").innerHTML="",document.getElementById("nlmaps-geocoder-control-results").classList.add("nlmaps-hidden")},geocoder.showLookupResult=function(e){var t=document.getElementsByClassName(CONFIG.CLASSNAMES.geocoderResultItem);Array.prototype.map.call(t,function(e){return e.classList.remove(CONFIG.CLASSNAMES.geocoderResultSelected)});var o=document.getElementById(e.id);o&&o.classList.add(CONFIG.CLASSNAMES.geocoderResultSelected),document.getElementById("nlmaps-geocoder-control-input").value=e.weergavenaam},geocoder.showSuggestResults=function(e){var t=this;if(this.clearSuggestResults(),e.length>0){var o=document.createElement("ul");e.forEach(function(e){var n=document.createElement("li"),r=document.createElement("a");r.innerHTML=e.weergavenaam,r.id=e.id,parseClasses$1(r,CONFIG.CLASSNAMES.geocoderResultItem),r.setAttribute("href","#"),r.addEventListener("click",function(e){e.preventDefault(),t.lookup(e.target.id)}),n.appendChild(r),o.appendChild(n)}),document.getElementById("nlmaps-geocoder-control-results").classList.remove("nlmaps-hidden"),document.getElementById("nlmaps-geocoder-control-results").appendChild(o)}};var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};"undefined"!=typeof L&&"object"===("undefined"==typeof L?"undefined":_typeof(L))&&(L.NlmapsBgLayer=L.TileLayer.extend({initialize:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"standaard",t=arguments[1],o=getProvider(e),n=L.Util.extend({},t,{minZoom:o.minZoom,maxZoom:o.maxZoom,scheme:"xyz",attribution:o.attribution,subdomains:o.subdomains?o.subdomains:"abc",sa_id:e});L.TileLayer.prototype.initialize.call(this,o.url,n)}}),L.nlmapsBgLayer=function(e,t){return new L.NlmapsBgLayer(e,t)},L.NlmapsOverlayLayer=L.TileLayer.WMS.extend({initialize:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1],o=getWmsProvider(e,t),n=o.url;delete o.url;var r=L.Util.extend({},t,{layers:o.layerName,maxZoom:24,minZoom:1,styles:o.styleName,version:o.version,transparent:o.transparent,format:o.format});L.TileLayer.WMS.prototype.initialize.call(this,n,r)}}),L.nlmapsOverlayLayer=function(e,t){return new L.NlmapsOverlayLayer(e,t)},L.Control.GeoLocatorControl=L.Control.extend({options:{position:"topright"},initialize:function(e){for(var t in e)"object"===_typeof(this.options[t])?L.extend(this.options[t],e[t]):this.options[t]=e[t]},onAdd:function(e){function t(t){e.panTo([t.coords.latitude,t.coords.longitude])}var o=L.DomUtil.create("div");o.id="nlmaps-geolocator-control",o.className="nlmaps-geolocator-control";var n=document.createElement("img");return o.append(n),this.options.geolocator.isStarted()&&L.DomUtil.addClass(o,"started"),L.DomEvent.on(o,"click",function(){this.options.geolocator.start(),L.DomUtil.addClass(o,"started")},this),this.options.geolocator.on("position",function(e){L.DomUtil.removeClass(o,"started"),L.DomUtil.addClass(o,"has-position"),t(e)}),o},onRemove:function(e){return e}}),L.geoLocatorControl=function(e){return new L.Control.GeoLocatorControl({geolocator:e})});export{bgLayer,overlayLayer,markerLayer,extentLeafletFormat,getMapCenter,geoLocatorControl,geocoderControl};
//# sourceMappingURL=nlmaps-leaflet.es.js.map
