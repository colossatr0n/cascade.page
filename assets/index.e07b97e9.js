import{o as e,c as t,F as n,r as s,a as r,t as i,d as a,T as l,b as o,e as d,f as m,w as c,v as h,g as u,h as g,i as p}from"./vendor.06fcf6a3.js";var v={props:["list"]};const w={class:"flex flex-col mx-3"},f=r("h3",{class:"text-xl border-b"},"My timelines",-1),y={key:0,class:""},x={class:""},k={class:"ml-auto mt-1"},b=r("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"},null,-1),S={key:1,class:""},C=r("div",{class:""},"No saved timelines",-1);v.render=function(a,l,o,d,m,c){return e(),t("div",w,[f,o.list&&o.list.length>0?(e(),t("div",y,[(e(!0),t(n,null,s(o.list,(n=>(e(),t("div",{class:[a.selected?"bg-blue-100":"","cursor-pointer flex flex-row align-baseline mb-1 hover:bg-blue-100 rounded px-1 transition-color duration-100"],key:n,onClick:e=>a.$emit("selected",n)},[r("div",x,i(n),1),r("div",k,[(e(),t("svg",{onClick:e=>a.$emit("delete",n),xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 hover:text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[b],8,["onClick"]))])],10,["onClick"])))),128))])):(e(),t("div",S,[C]))])};var T={props:["events"],data:()=>({numColumns:0,numRows:0,columnWidth:120,years:{start:2e3,end:2010}}),watch:{events(e,t){this.years=this.getBoundingYears(this.events),this.numColumns=this.years.end-this.years.start,this.numRows=e.length+1}},computed:{timelineStyles(){return`\n          grid-template-columns: repeat(${this.numColumns}, ${this.columnWidth}px [year-start]);\n          grid-template-rows: 40px repeat(${this.numRows-1}, 19px) minmax(50vh, 1fr);`}},methods:{getWidthForRange(e){var t,n;if(e.to){const s=(13-(null!=(t=e.from.month)?t:1))*(this.columnWidth/12);return e.to.month?e.from.year===e.to.year?(1+e.to.month-(null!=(n=e.from.month)?n:1))*(this.columnWidth/12):s+(e.to.year-e.from.year-1)*this.columnWidth+e.to.month*(this.columnWidth/12):e.from.year===e.to.year?s:s+(e.to.year-e.from.year)*this.columnWidth}return e.from.month?10:this.columnWidth},getLeftMarginForDate(e,t){let n=(e.startingYear()-this.years.start)*this.columnWidth;return console.log(n),t.month?n+10*(t.month-1):n+0},range:(e,t=0)=>[...Array(e).keys()].map((e=>e+t)),getBoundingYears(e){let t=e[0].startingYear(),n=e[0].getNextYear();for(let s of e)s.startingYear()<t&&(t=s.startingYear()),s.getNextYear()>n&&(n=s.getNextYear());return{start:t-1,end:n+6}}}};const M={class:"yearTitle text-sm"},D={class:"eventDate"};T.render=function(a,l,o,d,m,c){return e(),t("div",{id:"timeline",style:c.timelineStyles},[(e(!0),t(n,null,s(c.range(m.years.end-m.years.start+1,m.years.start),(n=>(e(),t("div",{class:"year",key:n,style:`grid-column: ${n-m.years.start+1} / ${n-m.years.start+2}; grid-row: 1 / -1;`},[r("h6",M,i(n),1)],4)))),128)),(e(!0),t(n,null,s(o.events,((n,s)=>(e(),t("div",{class:"eventRow",key:s,style:{"grid-column":"1 / -1","grid-row":s+2,"margin-left":`${this.getLeftMarginForDate(n,n.range.from)}px`}},[r("div",{class:"eventBar",style:`width: ${this.getWidthForRange(n.range)}px;`},null,4),r("p",D,i(n.getDateHtml()),1),r("p",{class:"eventTitle",innerHTML:n.getInnerHtml()},null,8,["innerHTML"])],4)))),128))],4)};class I{constructor(e){this.originalString=e;const t=e.indexOf("//");t>=0&&(e=e.substring(0,t));const[n,s]=e.split("-");this.from=this.toYearMonthDay(n),this.to=s?this.toYearMonthDay(s):void 0}toYearMonthDay(e){"now"===e&&(e=(new Date).toLocaleDateString());let[t,n,s]=e.split("/").reverse();const r=parseInt(t);return n?s?{year:r,month:parseInt(s),day:parseInt(n)}:{year:r,month:parseInt(n)}:{year:r}}getNextYear(){return this.to?this.to.year+1:this.from.year+1}}class Y{constructor(e,t){this.linkRegex=/\[([\w\s\d\.]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g,this.range=e,this.event=t}startingYear(){return this.range.from.year}getNextYear(){return this.range.getNextYear()}getInnerHtml(){return this.event.replace(this.linkRegex,((e,t,n)=>`<a class="underline" href="${n}">${t}</a>`))}getDateHtml(){return this.range.originalString}}var H={components:{Timeline:T},props:{eventString:{type:String,default:""}},data:()=>({htmlString:"",events:[]}),watch:{eventString:function(e,t){this.debouncedParse()}},created(){this.debouncedParse=a(400,this.parse)},methods:{debouncedParse:()=>{},parse(){let e=this.eventString.split("\n");this.events=e.filter((e=>!!e&&null===e.match(/^\s*\/\/.*/))).map((e=>{const t=e.indexOf(":");if(-1===t)throw new Error(`Error parsing '${e}': missing separating colon (:)`);const n=e.substring(0,t).trim();return new Y(new I(n),e.substring(t+1).trim())}))}},mounted(){this.parse()}};const R={class:"flex flex-col"},N={class:"flex"};H.render=function(n,s,i,a,d,m){const c=o("timeline");return e(),t("div",R,[r("div",N,[(e(),t(l,{to:"body"},[r(c,{events:d.events},null,8,["events"])]))])])};var W={components:{TimelineMaker:H,Storage:v},data:()=>({collapsed:!1,currentTimelineName:"",events:"08/2008-05/2012: Psych degree\n02/2010-06/2012: Dispatcher\n10/2010: Barn built across the street\n06/2011-08/2011: Westover Air Reserve Base\n\n// 2013\n03/15/2013-04/2015: China\n\n// 2014\n07/2014: 4th of July in DC\n\n// 2015\n05/2015-08/2015: Summer classes so I can graduate in two years\n05/2015: James graduation\n06/2015: Built desk\n06/2015: Kim and Matt wedding\n08/2015-05/2017: CS degree\n\n// 2016\n05/22/2016-08/12/2016: Cardinal Health\n08/16/2016-08/27/2016: Italy\n\n// 2017\n05/2017-05/2018: Cladwell\n06/10/2017-06/17/2017: The Hague & Copenhagen\n\n// 2018\n07/21/2018-07/22/2018: Chicago\n07/26/2018-07/31/2018: LA and Seattle (interviewing)\n08/04/2018-08/14/2018: Mexico City\n09/05/2018-09/11/2018: Hong Kong and Macau\n09/19/2018-09/22/2018: Road trip to Seattle\n10/01/2018-01/2021: [Google](https://www.google.com)\n12/28/2018-12/29/2018: Nemacolin and Fallingwater\n\n// 2019\n06/08/2019: Paula's wedding\n07/04/2019: 4th of July in Seattle with siblings\n08/23/2019-08/27/2019: SF and Bishop's Ranch\n09/2019: Hawaii with Google\n12/20/2019-12/22/2019: Train from Seattle to Chicago\n12/2019: Christmas at home, Dad to hospital\n\n// 2020\n02/29/2020: Molly and Kaitlyn to Seattle (thus starting covid)\n03/28/2020: James to Austin\n05/24/2020: Sold the Impala\n07/2020: Oregon & Crater Lake\n08/2020: Mt. Rainier\n08/2020: Oak Island\n09/2020: Hurricane Ridge\n9/2020: Trip to Coeur d'Alene\n11/2020: Trip to Denver\n12/2020: Reese\n12/25/2020: Christmas in Blaine\n\n// 2021\n01/2021: qr.new featured on [Hacker News](https://news.ycombinator.com/item?id=25481772)\n02/2021: Hawaii\n02/01/2021-now: Working on [swink](https://sw.ink) full time\n05/25/2021: [cascade.page](https://cascade.page) featured on [Hacker News](https://news.ycombinator.com/item?id=27282842)",list:[]}),mounted(){this.getTimelines()},methods:{deleteTimeline(e){confirm(`Delete ${e}?`)&&(localStorage.removeItem(e),this.list.splice(this.list.indexOf(e),1),localStorage.setItem("timelines",this.list.join(",")))},selectedTimeline(e){this.loadTimeline(e)},save(){const e=prompt("Save timeline as: ",this.currentTimelineName);if(e){if(localStorage.setItem(e,this.events),this.list.includes(e))return;this.list.push(e),localStorage.setItem("timelines",this.list.join(","))}},loadTimeline(e){var t;this.events=null!=(t=localStorage.getItem(e))?t:"",this.currentTimelineName=e},getTimelines(){const e=localStorage.getItem("timelines");e&&(this.list=e.split(","),this.loadTimeline(this.list[0]))}}};const $={class:"backdrop-filter backdrop-blur-sm"},B={class:"flex flex-row"},F=r("div",{class:"underline flex items-end"},[r("a",{href:"https://github.com/kochrt/timeline-maker"},"Github")],-1),L={key:0,xmlns:"http://www.w3.org/2000/svg",class:"h-3 w-3 ml-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},A=r("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"},null,-1),j={key:1,xmlns:"http://www.w3.org/2000/svg",class:"h-3 w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},O=r("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 15l7-7 7 7"},null,-1),P={class:"flex md:flex-row flex-col p-3 h-100"},J={class:"flex flex-col mr-3 mb-3 text-black"};W.render=function(n,s,a,l,g,p){const v=o("storage"),w=o("timeline-maker");return e(),t("div",$,[r("div",B,[F,r("button",{class:"ml-auto hover:bg-gray-500 rounded px-3 flex flex-row items-center",onClick:s[1]||(s[1]=e=>g.collapsed=!g.collapsed)},[d(i(g.collapsed?"Expand":"Collapse")+" ",1),g.collapsed?m("",!0):(e(),t("svg",L,[A])),g.collapsed?(e(),t("svg",j,[O])):m("",!0)])]),c(r("div",P,[r(v,{list:g.list,onSelected:p.selectedTimeline,onDelete:p.deleteTimeline},null,8,["list","onSelected","onDelete"]),r("div",J,[c(r("textarea",{class:"border shadow-md flex-grow p-2",name:"eventsField",cols:"40",rows:"10","onUpdate:modelValue":s[2]||(s[2]=e=>g.events=e)},null,512),[[u,g.events]]),r("button",{class:"bg-blue-100 mt-3 rounded shadow-md hover:shadow-none transition-all duration-100",onClick:s[3]||(s[3]=(...e)=>p.save&&p.save(...e))}," Save timeline ")]),r(w,{eventString:g.events,class:"flex-grow mr-3 mb-3"},null,8,["eventString"])],512),[[h,!g.collapsed]])])};var E=g({name:"App",components:{MainVue:W}});E.render=function(n,s,r,i,a,l){const d=o("main-vue");return e(),t(d)};p(E).mount("#app");
