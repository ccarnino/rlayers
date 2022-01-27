import React from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {
    RMap,
    ROSM,
    RLayerTile,
    RLayerVector,
    RControl,
    RStyle,
    RLayerTileJSON,
    RLayerWMS,
    RLayerTileWMS
} from 'rlayers';
import layersIcon from './svg/layers.svg';
import 'ol/ol.css';
import 'rlayers/control/layers.css';

const layersButton = (
    <button>
        <img src={layersIcon} alt='layers' />
    </button>
);

export default function Layers(): JSX.Element {
    return (
        <RMap className='example-map' initial={{center: fromLonLat([2.364, 48.82]), zoom: 11}}>
            <RControl.RLayers element={layersButton}>
                <ROSM properties={{label: 'OpenStreetMap'}} />
                <RLayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
                <RLayerTile
                    properties={{label: 'HillShading'}}
                    url='http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'
                />
                <RLayerTile
                    properties={{label: 'Mapnik'}}
                    url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
                />
                <RLayerTile
                    properties={{label: 'Transport'}}
                    url='http://tile.thunderforest.com/transport/{z}/{x}/{y}.png'
                />
                <RLayerTile
                    properties={{label: 'Watercolor'}}
                    url='https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
                />
                <RLayerTileJSON
                    properties={{label: 'Mapbox TileJSON'}}
                    url='https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1'
                />
                <RLayerWMS
                    properties={{label: 'Magellium OSM France Schools WMS'}}
                    url='https://magosm.magellium.com/geoserver/ows'
                    params={{LAYERS: 'magosm:france_schools_point', FORMAT: 'image/jpeg'}}
                />
                <RLayerTileWMS
                    properties={{label: 'Switzerland ArcGIS TileWMS'}}
                    url='https://wms.geo.admin.ch/'
                    params={{
                        LAYERS: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
                        FORMAT: 'image/jpeg',
                        serverType: 'mapserver'
                    }}
                />
            </RControl.RLayers>
            {/* This one is always visible */}
            <RLayerVector
                zIndex={5}
                format={new GeoJSON({featureProjection: 'EPSG:3857'})}
                url='https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson'
            >
                <RStyle.RStyle>
                    <RStyle.RStroke color='#007bff' width={3} />
                    <RStyle.RFill color='transparent' />
                </RStyle.RStyle>
            </RLayerVector>
        </RMap>
    );
}
