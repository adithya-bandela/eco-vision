import { z } from 'zod';
export const categories = ['plastic','paper','metal','glass','organic','e-waste','textile','hazardous','other'] as const;
const text = z.string().min(1).max(1800);
const list = z.array(text).max(12);
const percent = z.number().min(0).max(100);
export const itemSchema = z.object({
 name:text, category:z.enum(categories), material_detail:text, quantity_estimate:z.number().int().min(1).max(1000), confidence:percent,
 bounding_box:z.object({x:percent,y:percent,w:z.number().positive().max(100),h:z.number().positive().max(100)}).refine(b=>b.x+b.w<=100.000001&&b.y+b.h<=100.000001,'Box outside image'),
 decomposition_time:text,
 harm_if_not_recycled:z.object({environment:text,wildlife:text,human_health:text,climate:text}),
 recycling:z.object({recyclable:z.boolean(),process_steps:list,reuse_ideas:list,products_made_from_it:list}),
 disposal:z.object({bin_colour:z.enum(['blue','green','black','red','yellow']),prep_steps:list,do_not:list}),
 treatment_method:z.enum(['recycling','composting','incineration with energy recovery','hazardous waste facility','e-waste facility','landfill (last resort)'])
});
export const reportSchema=z.object({summary:text,overall_eco_score:percent,items:z.array(itemSchema).max(60),tips:z.array(text).min(1).max(5)});
export type Item=z.infer<typeof itemSchema>;
export type Report=z.infer<typeof reportSchema>;
export const colors:Record<string,string>={plastic:'#3a7eae',paper:'#ae752c',metal:'#7675bb',glass:'#409684',organic:'#709c36','e-waste':'#b96d42',textile:'#a76590',hazardous:'#c25151',other:'#68786e'};
