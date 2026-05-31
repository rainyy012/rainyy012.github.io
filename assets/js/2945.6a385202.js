"use strict";(self.webpackChunkrains_blog=self.webpackChunkrains_blog||[]).push([["2945"],{7080(e,t,a){a.d(t,{diagram:()=>D});var i=a(5717),l=a(5796),r=a(2337),s=a(501),n=a(7970),o=a(9953),p=a(5123),d=s.UI.pie,c={sections:new Map,showData:!1,config:d},g=c.sections,u=c.showData,h=structuredClone(d),f=(0,n.K2)(()=>structuredClone(h),"getConfig"),m=(0,n.K2)(()=>{g=new Map,u=c.showData,(0,s.IU)()},"clear"),x=(0,n.K2)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,t),n.Rm.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,n.K2)(()=>g,"getSections"),$=(0,n.K2)(e=>{u=e},"setShowData"),S=(0,n.K2)(()=>u,"getShowData"),y={getConfig:f,clear:m,setDiagramTitle:s.ke,getDiagramTitle:s.ab,setAccTitle:s.SV,getAccTitle:s.iN,setAccDescription:s.EI,getAccDescription:s.m7,addSection:x,getSections:w,setShowData:$,getShowData:S},C=(0,n.K2)((e,t)=>{(0,l.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),T={parse:(0,n.K2)(async e=>{let t=await (0,o.qg)("pie",e);n.Rm.debug(t),C(t,y)},"parse")},b=(0,n.K2)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),k=(0,n.K2)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return(0,p.rLf)().value(e=>e.value).sort(null)(a)},"createPieArcs"),D={parser:T,db:y,renderer:{draw:(0,n.K2)((e,t,a,l)=>{n.Rm.debug("rendering pie chart\n"+e);let o=l.db,d=(0,s.D7)(),c=(0,r.$t)(o.getConfig(),d.pie),g=(0,i.D)(t),u=g.append("g");u.attr("transform","translate(225,225)");let{themeVariables:h}=d,[f]=(0,r.I5)(h.pieOuterStrokeWidth);f??=2;let m=c.textPosition,x=(0,p.JLW)().innerRadius(0).outerRadius(185),w=(0,p.JLW)().innerRadius(185*m).outerRadius(185*m);u.append("circle").attr("cx",0).attr("cy",0).attr("r",185+f/2).attr("class","pieOuterCircle");let $=o.getSections(),S=k($),y=[h.pie1,h.pie2,h.pie3,h.pie4,h.pie5,h.pie6,h.pie7,h.pie8,h.pie9,h.pie10,h.pie11,h.pie12],C=0;$.forEach(e=>{C+=e});let T=S.filter(e=>"0"!==(e.data.value/C*100).toFixed(0)),b=(0,p.UMr)(y).domain([...$.keys()]);u.selectAll("mySlices").data(T).enter().append("path").attr("d",x).attr("fill",e=>b(e.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(T).enter().append("text").text(e=>(e.data.value/C*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let D=u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText"),v=[...$.entries()].map(([e,t])=>({label:e,value:t})),K=u.selectAll(".legend").data(v).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*v.length/2)+")");K.append("rect").attr("width",18).attr("height",18).style("fill",e=>b(e.label)).style("stroke",e=>b(e.label)),K.append("text").attr("x",22).attr("y",14).text(e=>o.getShowData()?`${e.label} [${e.value}]`:e.label);let A=Math.max(...K.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0)),R=D.node()?.getBoundingClientRect().width??0,M=Math.min(0,225-R/2),z=Math.max(512+A,225+R/2)-M;g.attr("viewBox",`${M} 0 ${z} 450`),(0,s.a$)(g,450,z,c.useMaxWidth)},"draw")},styles:b}}}]);