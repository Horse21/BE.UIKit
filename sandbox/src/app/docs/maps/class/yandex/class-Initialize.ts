import { ILoadApiMap, IInitMap } from "../../interface/i-init";
import * as  ObjectMap from "../class-objmap";
import * as mark from "../../test.markers.json";
import { Injectable } from "@angular/core";
export namespace Map.Yandex {
    declare var document: any;
    declare var ymaps: any;
    declare var require: any;
    var objMap: any;
    @Injectable()
    export class InitializeYandex implements IInitMap {
        source: ILoadApiMap;
        public loadScriptMap(source: ILoadApiMap): Promise<any> {
            try {
                return new Promise((resolve, reject) => {
                    this.source = source;
                    let script = document.createElement('script');
                    script.type = 'text/javascript';
                    let url: string;
                    url = source.src;
                    script.src = url;
                    script.id = 'mapAPI';
                    if (script.readyState) {
                        script.onreadystatechange = () => {
                            if (script.readyState === "loaded" || script.readyState === "complete") {
                                script.onreadystatechange = null;
                                resolve({ loaded: true, status: 'Loaded' });
                            }
                        };
                    } else {
                        script.onload = () => {
                        };
                        window['APILoaded'] = (ev) => {
                            console.log('yandex maps api loaded');
                            resolve({ loaded: true, status: 'Loaded' });
                        }
                    }
                    script.onerror = (error: any) => {
                        reject({ loaded: false, status: 'Error' });
                    };
                    document.getElementsByTagName('head')[0].appendChild(script);
                });
            }
            catch (error) {
                console.log(error);
            }
        }

        initializingMap(id: string): any {
            try {
                objMap = new ymaps.Map(id, {
                    center: [27.215556209029693, 18.45703125],
                    behaviors: ['default', 'scrollZoom'],
                    zoom: 3,
                    controls: []

                });
                objMap.options.set('minZoom', 3);
                objMap.options.set('maxZoom', 22);
                let markerCluster: any;
                markerCluster = new ymaps.Clusterer({
                    clusterIcons: [{
                        href: './assets/icons_map/icon_pointgroup.png',
                        size: [46, 46],
                        offset: [-22, -22],
                    }],

                }),

                    markerCluster.options.set({
                        gridSize: 140,
                        clusterDisableClickZoom: false,
                        minClusterSize: 2,
                        groupByCoordinates: false,
                        hasBalloon: false,
                    });

                let markers: any[];
                markers = mark.default;
                var ma = [];
                for (let i = 0; i < mark.default.length; i++) {
                    let item = markers[i];
                    var obj = new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: [item.Address.Lat, item.Address.Lng],
                        },
                        properties: {
                            hintContent: item.Hotelname,
                        }
                    }, {
                            iconLayout: 'default#image',
                            iconImageSize: [52, 56],
                            iconImageHref: './assets/icons_map/icon_hotel.png',
                            hintContent: item.Hotelname
                        })
                    ma.push(obj);
                }

                markerCluster.add(ma);
                objMap.geoObjects.add(markerCluster);

                return { objMap };
            }
            catch (error) {
                console.log(error);
            }
        }

        destroyMap(): void {
            try {
                ymaps = null;
                let apiScript = document.getElementById('mapAPI');
                if (apiScript != null && apiScript != undefined) {
                    apiScript.remove();
                }
                var style = document.querySelectorAll('style[data-ymaps]');
                for (let i = 0; i < style.length; i++) {
                    style[i].parentNode.removeChild(style[i])

                }
                console.log('yandex destroy')
                if (objMap != null && objMap != undefined) {
                    objMap.destroy();
                }
                document.getElementById('map').innerHTML = "";
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
