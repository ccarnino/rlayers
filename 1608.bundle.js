"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[1608],{1608:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var a=n(7294),r=n(6414),l=n(8465),o=(n(2031),n(4897));const s=new l.Z({featureProjection:"EPSG:3857"}),c=fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=population-francaise-par-departement-2018&q=&rows=200").then((e=>e.json())),u=(e,t)=>{var n,a;return null!==(a=null===(n=e.records.find((e=>e.fields.code_departement===t)))||void 0===n?void 0:n.fields.population)&&void 0!==a?a:0};function i(){const[e,t]=a.useState({records:[]}),[n,l]=a.useState(null);return a.useEffect((()=>{c.then((e=>t(e)))}),[]),a.createElement("div",{className:"d-flex flex-row"},a.createElement(o.rO,{className:"example-map",initial:(0,a.useMemo)((()=>({center:(0,r.mi)([2,46.5]),zoom:5.75})),[]),noDefaultControls:!0,noDefaultInteractions:!0},a.createElement(o.eK,{layer:"toner"}),a.createElement(o.jh,{zIndex:5,format:s,url:"https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson",onPointerEnter:(0,a.useCallback)((e=>l(e.target)),[]),onPointerLeave:(0,a.useCallback)((e=>n===e.target&&l(null)),[n])},a.createElement(o.P_.P_,{render:(0,a.useCallback)((t=>a.createElement(o.P_.X3,{color:`rgba(0, 0, ${u(e,t.get("code"))/5e3}, 0.75)`})),[e])})),a.createElement(o.jh,{zIndex:10},n?a.createElement("div",null,a.createElement(o.j$,{geometry:n.getGeometry()},a.createElement(o.Cs,{className:"example-overlay",autoPosition:!0},"Population in ",a.createElement("strong",null,n.get("nom"))," in 2018 is"," ",a.createElement("strong",null,u(e,n.get("code")))))):null)))}o.j$.hitTolerance=0}}]);