/* empty css                      */import{f as h,i as S}from"./assets/vendor-BbSUbo7J.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const d=document.querySelector("#datetime-picker"),a=document.querySelector("[data-start]"),g=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),q=document.querySelector("[data-seconds]");let f=null,m=null;a.disabled=!0;const i=r=>String(r).padStart(2,"0"),u=({days:r,hours:o,minutes:n,seconds:s})=>{g.textContent=i(r),b.textContent=i(o),D.textContent=i(n),q.textContent=i(s)},l=r=>{const t=Math.floor(r/864e5),c=Math.floor(r%864e5/36e5),p=Math.floor(r%864e5%36e5/6e4),y=Math.floor(r%864e5%36e5%6e4/1e3);return{days:t,hours:c,minutes:p,seconds:y}},v=()=>{const o=m-new Date;if(o<=0){clearInterval(f),u(l(0)),d.disabled=!1;return}u(l(o))};h(d,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(r){const o=r[0];o<=new Date?(S.error({title:"Error",message:"Please choose a date in the future"}),a.disabled=!0):(m=o,a.disabled=!1)}});a.addEventListener("click",()=>{a.disabled=!0,d.disabled=!0,f=setInterval(()=>{v()},1e3)});
//# sourceMappingURL=1-timer.js.map
