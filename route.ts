import { analyzeImage, AnalysisError } from '@/lib/analyze';
export const dynamic='force-dynamic';
export const runtime='nodejs';
export const maxDuration=120;
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export async function POST(request:Request){
 try{
  const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Cross-origin requests are not allowed.'},{status:403,headers});
  if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Use a JSON image request.'},{status:415,headers});
  const reader=request.body?.getReader();if(!reader)throw new AnalysisError('Choose an image first.',400);
  const chunks:Uint8Array[]=[];let size=0;while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>4_200_000){await reader.cancel();throw new AnalysisError('The compressed image is too large. Please try a smaller photo.',413)}chunks.push(value)}
  const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}
  let body;try{body=JSON.parse(new TextDecoder().decode(bytes))}catch{throw new AnalysisError('Invalid request body.',400)}
  if(!body||typeof body!=='object'||typeof body.image!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(body.image))throw new AnalysisError('Choose a valid JPG, PNG or WEBP image.',400);
  const region=['India','United States','United Kingdom','Australia'].includes(body.region)?body.region:'India';
  const config=process.env;
  const report=await analyzeImage(body.image,config.GROQ_API_KEY||process.env.GROQ_API_KEY||'',config.GROQ_MODEL||process.env.GROQ_MODEL||'qwen/qwen3.8-27b',region,fetch,config.GROQ_REPORT_MODE||process.env.GROQ_REPORT_MODE||'compact');
  return Response.json(report,{headers});
 }catch(error){return Response.json({error:error instanceof AnalysisError?error.message:'Something went wrong. Please try again.'},{status:error instanceof AnalysisError?error.status:500,headers})}
}
