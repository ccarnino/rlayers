"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[4433],{4433:(n,a,s)=>{s.r(a),s.d(a,{default:()=>t});const t='<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useCallback<span class="token punctuation">,</span> useMemo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Feature <span class="token keyword">from</span> <span class="token string">"ol/Feature"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> GeoJSON <span class="token keyword">from</span> <span class="token string">"ol/format/GeoJSON"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Geometry <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/geom"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  RMap<span class="token punctuation">,</span>\n  RLayerVector<span class="token punctuation">,</span>\n  RStyle<span class="token punctuation">,</span>\n  RFeature<span class="token punctuation">,</span>\n  ROverlay<span class="token punctuation">,</span>\n  RLayerStamen<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n\n<span class="token comment">// These are the French internal administrative borders in GeoJSON format</span>\n<span class="token keyword">const</span> departements <span class="token operator">=</span>\n  <span class="token string">"https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> parser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GeoJSON</span><span class="token punctuation">(</span><span class="token punctuation">{</span> featureProjection<span class="token operator">:</span> <span class="token string">"EPSG:3857"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// Population by French administrative division</span>\n<span class="token comment">// https://public.opendatasoft.com/explore/dataset/population-francaise-par-departement-2018/</span>\n<span class="token comment">// Published under Etalab Open License https://www.etalab.gouv.fr/wp-content/uploads/2018/11/open-licence.pdf</span>\n<span class="token keyword">const</span> inputData <span class="token operator">=</span>\n  <span class="token string">"https://public.opendatasoft.com/api/records/1.0/search/?dataset=population-francaise-par-departement-2018&amp;q=&amp;rows=200"</span><span class="token punctuation">;</span>\n<span class="token keyword">type</span> <span class="token class-name">inputDataType</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  records<span class="token operator">:</span> <span class="token punctuation">{</span> fields<span class="token operator">:</span> <span class="token punctuation">{</span> code_departement<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> population<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> fetchData <span class="token operator">=</span> <span class="token function">fetch</span><span class="token punctuation">(</span>inputData<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span>raw<span class="token punctuation">)</span> <span class="token operator">=></span> raw<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>inputDataType<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">getData</span> <span class="token operator">=</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> inputDataType<span class="token punctuation">,</span> dep<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n  data<span class="token punctuation">.</span>records<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">=></span> el<span class="token punctuation">.</span>fields<span class="token punctuation">.</span>code_departement <span class="token operator">===</span> dep<span class="token punctuation">)</span><span class="token operator">?.</span>fields\n    <span class="token punctuation">.</span>population <span class="token operator">??</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token comment">// The default hitbox around the features is 3px wide making narrow gaps between the borders difficult to select</span>\nRFeature<span class="token punctuation">.</span>hitTolerance <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">GeoData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>data<span class="token punctuation">,</span> setData<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> records<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token keyword">as</span> inputDataType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>current<span class="token punctuation">,</span> setCurrent<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span>\n    <span class="token keyword">null</span> <span class="token keyword">as</span> Feature<span class="token operator">&lt;</span>Geometry<span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">null</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  React<span class="token punctuation">.</span><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    fetchData<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setData</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d-flex flex-row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span>\n        <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-map<span class="token punctuation">"</span></span>\n        <span class="token attr-name">initial</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">useMemo</span><span class="token punctuation">(</span>\n          <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> center<span class="token operator">:</span> <span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">46.5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zoom<span class="token operator">:</span> <span class="token number">5.75</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n          <span class="token punctuation">[</span><span class="token punctuation">]</span>\n        <span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">noDefaultControls</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">noDefaultInteractions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerStamen</span></span> <span class="token attr-name">layer</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toner<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n\n        </span><span class="token punctuation">{</span><span class="token comment">/* This the internal borders layer, initialized with the GeoJSON\n         * useCallback is a performance optimization, it allows to always have\n         * the same function object unless \'current\' changes\n         * without it you will create a new function at every frame rendered */</span><span class="token punctuation">}</span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerVector</span></span>\n          <span class="token attr-name">zIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>parser<span class="token punctuation">}</span></span>\n          <span class="token attr-name">url</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>departements<span class="token punctuation">}</span></span>\n          <span class="token attr-name">onPointerEnter</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setCurrent</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">onPointerLeave</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n            <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> current <span class="token operator">===</span> e<span class="token punctuation">.</span>target <span class="token operator">&amp;&amp;</span> <span class="token function">setCurrent</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>current<span class="token punctuation">]</span>\n          <span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token punctuation">{</span><span class="token comment">/* When styling each feature, compute the color from the population data\n           * The function is memoized and it is replaced only once - when the population data\n           * becomes available. Without memoization (useCallback) all the features will need to\n           * be re-evaluated at every frame */</span><span class="token punctuation">}</span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStyle</span></span>\n            <span class="token attr-name">render</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n              <span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RFill</span></span>\n                  <span class="token attr-name">color</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">rgba(0, 0, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>\n                    <span class="token function">getData</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">5000</span>\n                  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, 0.75)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span></span>\n                <span class="token punctuation">/></span></span>\n              <span class="token punctuation">)</span><span class="token punctuation">,</span>\n              <span class="token punctuation">[</span>data<span class="token punctuation">]</span>\n            <span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token punctuation">{</span><span class="token comment">/* This is a layer with a single feature - current - that holds the highlighted borders\n         * It is styled with the default OpenLayers style */</span><span class="token punctuation">}</span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerVector</span></span> <span class="token attr-name">zIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token punctuation">{</span>current <span class="token operator">?</span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RFeature</span></span> <span class="token attr-name">geometry</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>current<span class="token punctuation">.</span><span class="token function">getGeometry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROverlay</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-overlay<span class="token punctuation">"</span></span> <span class="token attr-name">autoPosition</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                  Population in </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>current<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"nom"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token plain-text"> in 2018 is</span><span class="token punctuation">{</span><span class="token string">" "</span><span class="token punctuation">}</span><span class="token plain-text">\n                  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span><span class="token punctuation">{</span><span class="token function">getData</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> current<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">ROverlay</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RFeature</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n          <span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);