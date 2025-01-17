import React from 'react';
import {Map, Feature} from 'ol';
import {Heatmap as LayerHeatmap} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';

import {RContextType} from '../context';
import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import Geometry from 'ol/geom/Geometry';

export interface RLayerHeatmapProps extends RLayerBaseVectorProps {
    /** Blurring */
    blur?: number;
    /** Radius */
    radius?: number;
    /** Weight function for each RFeature, weight goes from 0 to 1 */
    weight?: (f: Feature<Geometry>) => number;
}

/** A vector layer that renders its RFeatures as a heatmap
 *
 * Compatible with RLayerVector
 *
 * Requires an `RMap` context
 *
 * Provides a vector layer for JSX-declared RFeatures
 */
export default class RLayerHeatmap extends RLayerBaseVector<RLayerHeatmapProps> {
    ol: LayerHeatmap;
    source: SourceVector<Geometry>;

    constructor(props: Readonly<RLayerHeatmapProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new SourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader
        });
        this.ol = new LayerHeatmap({...props, source: this.source});
        this.eventSources = [this.ol, this.source];
        this.source.on('featuresloadend', this.newFeature);
        this.source.on('addfeature', this.newFeature);
        this.attachEventHandlers();
    }

    refresh(prev?: RLayerHeatmapProps): void {
        super.refresh(prev);
        if (prev?.blur !== this.props.blur) this.ol.setBlur(this.props.blur);
        if (prev?.radius !== this.props.radius) this.ol.setRadius(this.props.radius);
    }
}
