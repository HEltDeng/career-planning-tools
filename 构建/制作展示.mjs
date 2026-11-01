import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath,pathToFileURL } from 'node:url';
import { Presentation,PresentationFile } from '@oai/artifact-tool';

const DIR=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.dirname(DIR),WORKSPACE=ROOT;
const OUT=path.join(ROOT,'outputs');
const PERSON=path.join(OUT,'邓禾-202527010311-成长赛道');
const PREVIEW=path.join(ROOT,'成品预览');
async function presentationTools() {
 if (process.env.PRESENTATIONS_SKILL_DIR) return process.env.PRESENTATIONS_SKILL_DIR;
 const cache=path.join(os.homedir(),'.codex/plugins/cache/openai-primary-runtime/presentations');
 const versions=(await fs.readdir(cache)).sort((a,b)=>b.localeCompare(a,undefined,{numeric:true}));
 for (const version of versions) {
  const candidate=path.join(cache,version,'skills/presentations');
  try { await fs.access(path.join(candidate,'container_tools/artifact_tool_utils.mjs')); return candidate; } catch {}
 }
 throw new Error('Set PRESENTATIONS_SKILL_DIR to the installed Codex presentations tools.');
}
const SKILL=await presentationTools();
const PY=process.env.PYTHON_EXECUTABLE || path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3');
if (!process.env.RUNTIME_NODE_MODULES && !process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) {
 process.env.RUNTIME_NODE_MODULES=await fs.realpath(path.join(ROOT,'node_modules'));
}
const FONT='Arial Unicode MS',INK='#172E3C',ACC='#C15C32',MUT='#526670',BG='#FAF8F3',LIGHT='#DDE7E7';
const p=Presentation.create({slideSize:{width:1280,height:720}});
p.theme.defaultFont=FONT;
const scripts=[];
function text(s,content,x,y,w,h,size=28,color=INK,bold=false){
 const q=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 q.text=content;q.text.style={typeface:FONT,fontSize:size,color,bold,autoFit:'none',wrap:'square',verticalAlignment:'top',insets:0};return q;
}
function base(title,num,section=''){const s=p.slides.add();s.background.fill=BG;text(s,title,64,65,1140,72,46);text(s,`${String(num).padStart(2,'0')}  /  12`,1118,673,100,25,17,MUT);if(section)text(s,section,64,676,900,24,17,MUT);return s;}
function para(s,title,body,x,y,w=490){text(s,title,x,y,w,44,30,ACC);text(s,body,x,y+54,w,128,27);}
async function img(s,name,x,y,w,h){const b=await fs.readFile(path.join(ROOT,'素材',name));s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:name.endsWith('.jpeg')?'image/jpeg':'image/png',alt:name,fit:'contain',position:{left:x,top:y,width:w,height:h}});}
function table(s,values,widths,y=190,h=380,font=25){
 const t=s.tables.add({rows:values.length,columns:widths.length,left:64,top:y,width:1152,height:h,columnWidths:widths,values});
 t.borders.assign({fill:'#D6DFDF',style:'solid',width:.7});
 for(let r=0;r<values.length;r++)for(let c=0;c<widths.length;c++){
  const cell=t.getCell(r,c);cell.fill=r===0?'#E7EDED':BG;cell.text.style={typeface:FONT,fontSize:r===0?font:font,color:r===0?ACC:INK,wrap:'square',autoFit:'none',insets:{left:18,right:18,top:16,bottom:16}};
 }
 return t;
}
function notes(s,title,sec,body,sources=[]){s.speakerNotes.text=`建议用时：${sec}秒。\n\n${body}\n\n资料依据：\n${sources.join('\n')}`;scripts.push({title,sec,body});}
const policy='国务院《关于深入实施“人工智能+”行动的意见》（国发〔2025〕11号）：https://www.cac.gov.cn/2025-08/27/c_1758018277755538.htm';
const job='滴普科技官网：AI产品经理校园招聘岗位（2026-10-28查阅；作为能力参考，不代表本人满足该岗位资格）：https://www.deepexi.com/join-us/campus/c6';
const teach='个人项目《再教我一次》2026-10-24归档、原型录屏与本人体验反馈。截图摘自个人归档PPT；展示的是本地模板与手动确认流程。';
const cn='个人项目“我的川农”2026年10月交互改进记录；图片为2026-10-22 iOS原型首页，未展示个人学籍数据。';

// 01
{
 const s=p.slides.add();s.background.fill=INK;
 text(s,'长沙理工大学第十四届职业规划大赛',64,58,1120,36,23,LIGHT);
 text(s,'让技术更容易\n被使用',64,170,760,176,66,'#FFFFFF');
 text(s,'AI 产品经理 · 生涯发展展示',68,378,740,50,34,'#F4A579');
 text(s,'邓禾  |  202527010311',68,502,750,44,28,'#FFFFFF');
 text(s,'国际工学院 · 土木工程专业2503班',68,553,750,38,24,LIGHT);
 text(s,'成长赛道 · 高教组  /  2026.10',68,635,750,30,20,LIGHT);
 await img(s,'image.png',929,140,235,523);
 notes(s,'让技术更容易被使用',20,'各位老师好，我是国际工学院土木工程专业2503班的邓禾。我的目标是成为AI产品经理。我希望用几个已经做过的项目，说明这个目标怎样形成，也说明我现在还缺什么、接下来准备怎么补齐。',[teach]);
}
// 02
{
 const s=base('我的职业目标：AI 产品经理',2,'职业目标');
 text(s,'近期关注',64,181,400,44,25,ACC);
 text(s,'适老化与校园服务',64,236,650,66,48);
 para(s,'长辈的操作困难','不知道入口在哪里\n记住教程后，切回应用又忘了',64,350,520);
 para(s,'学生的服务体验','网络问题与认证问题混在一起\n重复输入、重复确认，打断任务',690,350,520);
 text(s,'“人工智能+”行动强调与民生等领域融合；我从身边的使用障碍切入。',64,568,1152,65,29,ACC);
 notes(s,'我的职业目标',35,'我的兴趣来自两个离自己比较近的场景。一个是长辈使用手机：看过教程，到了真实界面还是找不到按钮。另一个是校园服务：网络没连上，却提示重新认证，用户不知道下一步该做什么。我希望做的是把这些困难说清楚，再推动方案落地。国家“人工智能+”行动强调技术与民生等领域融合，这也让我愿意把职业目标放在技术真正帮助到人的地方。',[policy,teach,cn]);
}
// 03
{
 const s=base('岗位要求与我的起点',3,'职业认知');
 table(s,[['岗位需要','我的现有起点','需要补齐'],['理解用户与业务','能发现具体交互问题','系统访谈、需求优先级'],['理解技术边界','已接触AI开发和原型实践','LLM、Agent、RAG基础'],['验证产品效果','有体验反馈与修改记录','指标、测试集与数据分析']],[330,410,412],181,380,26);
 text(s,'土木工程提供工程思维训练；跨专业发展仍需补足技术基础和岗位证据。',64,591,1150,60,25,ACC);
 notes(s,'岗位要求与我的起点',40,'对照企业公开的AI产品经理岗位，我把要求归纳为用户理解、技术沟通和效果验证。现在我能提出具体的体验问题，也有原型实践，但这些还不能代替系统的技术学习和用户研究。部分岗位限制相关专业，我必须认真核对。土木工程让我习惯关注约束、系统和可靠性；我会完成本专业课程，把这种思维用于产品，同时通过作品集补充跨专业发展所需要的证据。',[job,'个人AI产品经理学习记录，2026-10-26。']);
}
// 04
{
 const s=base('2026年10月的实践记录',4,'学习实践');
 text(s,'10月23日起',64,189,260,50,31,ACC);
 text(s,'“我的川农”',350,186,840,50,35);
 text(s,'梳理欢迎页、服务状态与后续认证体验',350,245,840,60,28);
 text(s,'10月24日',64,334,260,50,31,ACC);
 text(s,'《再教我一次》',350,331,840,50,35);
 text(s,'完成适老化原型交付与演示材料归档',350,390,840,60,28);
 text(s,'10月26日',64,479,260,50,31,ACC);
 text(s,'岗位学习与项目复盘',350,476,840,50,35);
 text(s,'对照AI产品岗位学习，并继续检查真实交互问题',350,535,840,70,28);
 notes(s,'实践记录',35,'我用近期留存的项目记录来说明自己的行动。10月23日起，我持续调整“我的川农”的页面和服务体验；24日，《再教我一次》完成测试原型和演示材料归档；26日，我对照AI产品经理的岗位要求梳理相关知识，也继续反馈认证和网络状态的问题。这些经历让我更清楚自己愿意投入的是需求判断和体验验收，而不只是把一个页面做出来。',[teach,cn,'个人岗位学习对话，2026-10-26。']);
}
// 05
{
 const s=base('《再教我一次》：陪长辈完成一个动作',5,'学习实践 · 适老化原型');
 text(s,'我提出的需求',64,193,490,42,29,ACC);
 text(s,'一句话表达想做的事\n步骤留在操作现场\n语音提示可以反复听',64,255,490,150,32);
 text(s,'我的投入',64,454,490,42,29,ACC);
 text(s,'定义场景、检查真机体验\n反馈遮挡与路径错误\n推动调整功能优先级',64,510,490,132,28);
 await img(s,'image3.png',642,176,216,480);await img(s,'image6.png',954,176,216,480);
 notes(s,'适老化原型',50,'在《再教我一次》中，我把长辈不会用软件的问题，缩小成正在操作时需要一步提示。用户先用一句话表达需求，再由悬浮卡片和中文朗读陪着操作。右边是实际演示画面，当前展示的是本地模板生成步骤和手动确认。我主要负责表达场景、判断交互是否合理，并在真机上发现问题。实现过程中使用了AI开发工具，因此我把个人贡献放在需求和验收上，不把工具生成代码说成自己的独立技术能力。',[teach]);
}
// 06
{
 const s=base('真机反馈改变了功能取舍',6,'学习实践 · 迭代与反思');
 table(s,[['体验中发现的问题','采取的调整','形成的认识'],['卡片太大、遮挡按钮','反馈位置和拖动问题\n推动缩小操作干扰','帮助必须留在现场\n也不能阻碍操作'],['教程入口与当前版本不符','核对“界面与显示”\n修正调字体路径','先验证真实路径\n再扩展应用范围'],['OCR自动推进未成功','演示保留手动确认\n记录未通过的能力','模块已接入\n不等于效果已达标']],[380,390,382],177,420,25);
 notes(s,'真机反馈改变功能取舍',45,'这个项目给我最直接的训练，是把体验问题变成修改要求。卡片遮挡按钮，就要调整大小和拖动方式；教程入口写错，就要按当前软件版本重新核对。更重要的是，虽然接入了OCR，现场自动推进仍没有成功，所以最终展示保留手动确认。这个落差让我学会区分代码存在和用户任务完成，也提醒我在时间有限时先保证核心流程。项目已经归档，我会把这些留存问题作为后续学习案例。',[teach]);
}
// 07
{
 const s=base('“我的川农”：关注任务中的异常状态',7,'学习实践 · 校园服务');
 await img(s,'我的川农-原型首页.png',69,166,245,512);
 text(s,'我的观察',382,189,800,42,29,ACC);
 text(s,'没有连上网络，却要求重新认证\n用户不知道下一步该做什么',382,244,812,112,34);
 text(s,'我推动的改进方向',382,398,800,42,29,ACC);
 text(s,'区分网络连接与账号认证\n把状态、原因与操作放在一起\n减少重复输入和无效确认',382,455,812,141,29);
 text(s,'图片为2026年10月22日的原型首页',382,628,812,30,19,MUT);
 notes(s,'校园服务体验',45,'“我的川农”是另一类训练。用户点刷新之后遇到问题，如果所有原因都归到重新认证，就会让人不断输入账号。我在实际体验中指出：网络没有连上和身份失效是两件事，应当先呈现准确状态，再给出连接或重新检测等操作。这个项目留有移动端原型和修改记录，也让我开始关注异常流程、凭据处理和使用边界。现在的经历属于原型建设与迭代，不能据此声称已经有规模化运营成效。',[cn]);
}
// 08
{
 const s=base('阶段性收获与能力差距',8,'自我评估');
 text(s,'已经形成的实践基础',64,188,540,48,32,ACC);
 text(s,'把模糊想法拆成具体需求\n用真实操作发现问题\n提出修改，并回看体验\n保留原型与交付记录',64,270,530,256,31);
 text(s,'接下来需要补齐',690,188,540,48,32,ACC);
 text(s,'系统的用户访谈方法\nAI技术原理与能力边界\nPython、SQL与指标分析\n可复现的效果评测',690,270,530,256,31);
 text(s,'现阶段重点：用一个完整案例，证明自己能够持续发现并解决问题。',64,589,1152,61,28);
 notes(s,'阶段性收获与差距',40,'回顾这些实践，我已经有从想法到原型再到反馈的经历，但还缺少规范的方法。比如提出需求时，我更多依靠自己的体验，下一步需要访谈真正的目标用户。评估效果时，我也不能只凭感觉说更方便，而要记录完成率、耗时和失败原因。10月26日学习LLM、Agent和RAG时，我也明确认识到技术知识还没有形成体系，接下来要让概念进入实际方案与测试。',[teach,cn,job]);
}
// 09
{
 const s=base('未来三个月：把观察变成可检验的证据',9,'行动计划 · 以下均为计划目标');
 table(s,[['2026.11—2027.01','拟执行的行动','交付与判断依据'],['需求研究','完成6次访谈\n整理场景与阻碍','访谈纪要、优先级\n一份需求文档'],['任务验证','组织5人任务测试\n记录每一步的困难','完成情况、耗时\n失败原因与修改记录'],['基础学习','学习Python、SQL\n梳理AI技术边界','能解释方案选择\n能处理基础测试数据']],[315,420,417],183,410,26);
 notes(s,'未来三个月计划',35,'未来三个月，我准备先选定一个服务场景，把用户研究和效果验证补起来。计划完成六次访谈、五人的任务测试，保留原始问题、完成情况和失败原因，再形成一份需求文档。与此同时学习Python和SQL基础，帮助自己整理测试数据。这里的数字都是计划目标，还不是已完成成果；如果学业与项目冲突，我会先缩小项目范围。',['个人拟定行动计划，2026-10-28。']);
}
// 10
{
 const s=base('大学阶段的成长路径',10,'行动计划 · 资源与阶段安排');
 table(s,[['阶段','能力重点','资源与计划产出'],['大二下\n2027.02—07','做小型RAG／Agent样例\n建立30条测试用例','专业课程与公开技术资料\n教师、从业者反馈'],['大三','积累完整产品案例\n争取相关实习','学校就业指导活动\n作品集与实习申请记录'],['大四','核对岗位要求\n按反馈调整目标','校园招聘与项目复盘\n毕业求职方案']],[255,470,427],183,420,26);
 notes(s,'大学阶段成长路径',30,'大二下，我计划用一个小型样例把RAG或Agent学懂，并建立三十条测试用例，记录准确性、耗时和成本。大三重点完善作品集、争取产品相关实习，大四再结合真实招聘要求调整求职方案。学习资源优先来自学校课程、就业指导活动以及教师和从业者反馈，同时保留土木工程的专业学习，未来也可以探索工程数字化服务。',['个人拟定行动计划，2026-10-28。',job]);
}
// 11
{
 const s=base('每月复盘，按问题调整路径',11,'优化改进');
 table(s,[['复盘信号','下一步调整'],['连续两轮测试卡在同一步','缩小使用场景，优先修复关键流程'],['解释不清技术方案或失败原因','增加基础学习，再做简化样例验证'],['岗位专业要求与自身条件不匹配','评估工程数字化等相关产品方向']],[565,587],192,337,28);
 text(s,'每次保留：问题记录 → 修改理由 → 再次验证结果',64,581,1152,58,31,ACC);
 notes(s,'每月复盘',30,'我准备把复盘设成固定动作。如果连续两轮测试仍卡在同一步，就先修关键流程；如果解释不清技术方案，就补基础、缩小验证样例；如果岗位的专业要求不匹配，就重新评估工程数字化等相关方向。职业目标可以保持方向感，具体路径要允许调整。对我来说，调整必须能对应到实际发现的问题。',['个人拟定复盘机制，2026-10-28。']);
}
// 12
{
 const s=p.slides.add();s.background.fill=INK;
 text(s,'我的成长目标',64,76,1100,62,44,'#FFFFFF');
 text(s,'让真实任务\n更容易完成',64,218,1120,170,66,'#FFFFFF');
 text(s,'认真听需求，承认能力边界，对交付结果负责。',68,461,1100,74,34,'#F4A579');
 text(s,'邓禾  |  AI 产品经理职业方向  |  成长赛道',68,620,1100,40,24,LIGHT);
 notes(s,'我的成长目标',15,'我希望自己成为一个认真听需求、承认能力边界，并对交付结果负责的AI产品经理。让长辈愿意尝试，让学生少一次无效操作，是我检验职业选择的具体标准。谢谢各位老师。',['个人职业目标与实践总结。']);
}

await fs.mkdir(PREVIEW,{recursive:true});await fs.mkdir(PERSON,{recursive:true});
const candidate=path.join(DIR,'展示-候选.pptx');
await (await PresentationFile.exportPptx(p)).save(candidate);
console.log('Draft exported',candidate);
for(const [i,s]of p.slides.items.entries()){
 const b=await p.export({slide:s,format:'png',scale:1});
 await fs.writeFile(path.join(PREVIEW,`展示-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await b.arrayBuffer()));
 console.log('Rendered',i+1);
}
const {finalizePresentation}=await import(pathToFileURL(path.join(SKILL,'container_tools/artifact_tool_utils.mjs')).href);
const finalPath=path.join(PERSON,'邓禾-生涯发展展示.pptx');
const result=await finalizePresentation({workspaceDir:WORKSPACE,candidatePath:candidate,finalPath,pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...[3,6,9,10,11].flatMap(n=>['--require-native-table-slide',String(n)])],explicitTotalSlideCount:12,requiredNativeTableOwnerSlides:[3,6,9,10,11],requiredNativeChartOwnerSlides:[],fontPolicy:{basis:'design',families:[FONT]},verifyArtifactToolImport:true,receiptPath:path.join(DIR,'展示-姓名更正.validation.json')});
console.log(JSON.stringify(result));
await fs.writeFile(path.join(OUT,'备赛资料/7分钟逐页讲解提示.txt'),'邓禾｜成长赛道｜7分钟逐页讲解提示\n总建议用时：'+scripts.reduce((a,b)=>a+b.sec,0)+'秒\n\n'+scripts.map((v,i)=>`第${i+1}页 ${v.title}（约${v.sec}秒）\n${v.body}`).join('\n\n'));
await fs.writeFile(path.join(DIR,'讲解内容.json'),JSON.stringify(scripts,null,2));
