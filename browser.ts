import { reportSchema,type Report } from './schema';
import { disposalRule,impact } from './data';
export type Scan={id:string;date:string;region:string;report:Report};
export function getHistory():Scan[]{try{const value=JSON.parse(localStorage.getItem('ecovision.history')||'[]');if(!Array.isArray(value))return [];return value.filter(s=>typeof s.id==='string'&&typeof s.region==='string'&&Number.isFinite(Date.parse(s.date))&&reportSchema.safeParse(s.report).success).slice(0,50)}catch{return []}}
export function localDate(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
export function streak(scans:Scan[]){const dates=new Set(scans.map(s=>localDate(new Date(s.date))));const d=new Date();if(!dates.has(localDate(d)))d.setDate(d.getDate()-1);let n=0;while(dates.has(localDate(d))){n++;d.setDate(d.getDate()-1)}return n}
export async function compress(file:File):Promise<string>{
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Please choose a JPG, PNG or WEBP image.');
 if(file.size>10*1024*1024)throw Error('This file exceeds 10 MB. Please choose a smaller image.');
 if(!file.size)throw Error('This file is empty. Please choose another image.');
 const url=URL.createObjectURL(file);try{
 const img=new Image();img.src=url;await img.decode().catch(()=>{throw Error('This image could not be opened. Try another JPG, PNG or WEBP.')});
 const ratio=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.round(img.naturalWidth*ratio);canvas.height=Math.round(img.naturalHeight*ratio);const ctx=canvas.getContext('2d');if(!ctx)throw Error('Your browser could not prepare this image.');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);let data=canvas.toDataURL('image/jpeg',0.83);if(data.length>4_000_000)data=canvas.toDataURL('image/jpeg',0.65);if(data.length>4_000_000)throw Error('Please crop the photo or choose a smaller image.');return data;
 }finally{URL.revokeObjectURL(url)}
}
export async function downloadReport(report:Report,region:string,demo:boolean){
 const {jsPDF}=await import('jspdf');const pdf=new jsPDF();let y=23;
 function line(text:string,size=11){pdf.setFontSize(size);for(const row of pdf.splitTextToSize(text.replace(/[^\x20-\x7E\n]/g,' '),174)){if(y>276){pdf.addPage();y=22}pdf.text(row,18,y);y+=size*0.47+2}y+=3}
 line('EcoVision | Your material report',22);line(`${demo?'SAMPLE REPORT | ':''}${new Date().toLocaleDateString()} | Region: ${region}`,10);line(report.summary,13);line(`Eco score: ${report.overall_eco_score}/100 (AI educational estimate)`);
 for(const [idx,item] of report.items.entries()){line(`${idx+1}. ${item.name} | Qty: ${item.quantity_estimate}`,15);line(`${item.category} | ${item.material_detail} | Confidence: ${item.confidence}%`);line(`Decomposition: ${item.decomposition_time}`);for(const [k,v] of Object.entries(item.harm_if_not_recycled))line(`${k}: ${v}`);line(`Recycling: ${item.recycling.process_steps.join(' > ')}`);line(`New products: ${item.recycling.products_made_from_it.join(', ')}`);line(`Reuse: ${item.recycling.reuse_ideas.join('; ')}`);line(`Prepare: ${item.disposal.prep_steps.join('; ')}`);line(`Avoid: ${item.disposal.do_not.join('; ')}`);line(`Treatment: ${item.treatment_method}`)}
 line('Local disposal routes',15);report.items.forEach(item=>{const rule=disposalRule(item,region);line(`${item.name}: ${rule.label}. ${rule.note}`)});const estimate=impact(report);line('Illustrative impact at default assumed weights',15);line(`${estimate.co2.toFixed(2)} kg CO2; ${estimate.water.toFixed(1)} litres; ${estimate.energy.toFixed(2)} kWh. Scenario assumptions only, not measured or verified savings. This export uses default weights.`);line('Your next steps',15);report.tips.forEach(t=>line(t));line('Disclaimer: AI may miss or misidentify items. Local rules and bin colours vary; verify with your municipality. Eco score is not a certified environmental metric. No photo is included in this export.',9);pdf.save('EcoVision-report.pdf');
}
