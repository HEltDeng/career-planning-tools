from pathlib import Path
import json,re,shutil
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph,Table,TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'outputs'
PERSON=OUT/'邓禾-202527010311-成长赛道'
PERSON.mkdir(parents=True,exist_ok=True)
EXTRA=OUT/'备赛资料';EXTRA.mkdir(exist_ok=True)
FONT='/Library/Fonts/Arial Unicode.ttf'
pdfmetrics.registerFont(TTFont('CN',FONT))
INK='#172E3C'; ACC='#C15C32'; MUT='#526670'; BG='#FAF8F3'
W,H=595.276,841.89
styles={
 'body':ParagraphStyle('body',fontName='CN',fontSize=10.5,leading=17.5,textColor=HexColor(INK),wordWrap='CJK'),
 'small':ParagraphStyle('small',fontName='CN',fontSize=8.3,leading=13,textColor=HexColor(MUT),wordWrap='CJK'),
 'cell':ParagraphStyle('cell',fontName='CN',fontSize=9.3,leading=15,textColor=HexColor(INK),wordWrap='CJK'),
}
texts=[]
path=PERSON/'邓禾-生涯发展报告.pdf'
c=canvas.Canvas(str(path),pagesize=(W,H))
c.setTitle('让技术更容易被使用｜邓禾生涯发展报告');c.setAuthor('邓禾')
def txt(s,x,y,size=10.5,color=INK):
 texts.append(s);c.setFillColor(HexColor(color));c.setFont('CN',size);c.drawString(x,y,s)
def para(s,x,y,w,style='body'):
 texts.append(re.sub('<[^>]+>','',s));p=Paragraph(s,styles[style]);_,h=p.wrap(w,1000);p.drawOn(c,x,y-h);return y-h
def page(n,label):
 c.setFillColor(HexColor(BG));c.rect(0,0,W,H,fill=1,stroke=0)
 txt('长沙理工大学第十四届职业规划大赛',46,H-33,9,MUT)
 txt('成长赛道 · 高教组',425,H-33,9,MUT)
 c.setStrokeColor(HexColor('#D8DFDF'));c.line(46,47,W-46,47)
 txt('邓禾  |  202527010311',46,30,8.3,MUT)
 txt(f'{label}  /  {n:02d}',398,30,8.3,MUT)
def heading(s,y):txt(s,46,y,15,ACC);return y-17
def table(data,widths,y,rowh=None):
 vals=[[Paragraph(str(v),styles['cell']) for v in row]for row in data]
 for row in data:texts.extend(str(v) for v in row)
 t=Table(vals,colWidths=widths,rowHeights=rowh)
 t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#E8EDED')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),('LINEBELOW',(0,0),(-1,-1),0.5,HexColor('#D6DFDF'))]))
 _,h=t.wrap(503,1000);t.drawOn(c,46,y-h);return y-h

page(1,'职业目标')
txt('让技术更容易被使用',46,748,27)
txt('AI 产品经理生涯发展报告',46,713,17,ACC)
txt('邓禾 · 国际工学院 · 土木工程专业2503班',46,676,10.5)
txt('2025级本科生  |  2026年10月',46,655,10,MUT)
y=heading('一、职业目标的形成',610)
y=para('我希望成为面向真实生活场景的AI产品经理，近期聚焦适老化与校园服务。目标源于具体实践：长辈面对手机功能会找不到入口，学生使用校园服务时会被复杂流程打断。我更愿意从这些问题出发，推动产品变得清楚、可用。',46,y,503)-14
y=para('在《再教我一次》和“我的川农”项目中，我借助AI开发工具推进原型，主要投入需求表达、功能取舍和体验验收。实践让我逐渐把职业兴趣明确为产品工作：理解用户为何受阻，再决定做什么、怎样检验效果。',46,y,503)-22
y=heading('二、专业基础与岗位认知',y)
y=para('土木工程学习要求关注现实约束、系统关系与可靠性。我计划把这种工程思维用于产品判断，同时完成本专业课程；后续再探索工程知识服务等场景，不把专业背景直接等同于AI技术能力。',46,y,503)-13
y=para('国务院“人工智能+”行动强调技术与民生等领域融合。企业AI产品经理岗位则要求需求分析、方案设计、技术沟通和效果评估，部分岗位有相关专业要求。这使我认识到：跨专业发展需要可验证的作品，也需要补齐技术与数据基础。',46,y,503)-19
y=table([['已有起点','当前差距','补齐方式'],['能提出具体交互问题，并跟进原型修改','对LLM、Agent、RAG的理解尚未系统化','结合一个小型应用解释原理与边界'],['留有原型、演示及迭代记录','缺少规范用户研究和量化效果证据','建立访谈、任务测试与复盘档案']],[168,168,167],y)
c.showPage()

page(2,'学习实践')
txt('实践中的问题与成长',46,752,24)
y=heading('三、行动与阶段性成果',712)
y=para('《再教我一次》：我把“长辈不会用软件”的问题具体化为操作现场的步骤提示，提出一句话输入、悬浮卡片和语音提醒。在真机体验中，我发现卡片遮挡、拖动不便以及教程入口与软件版本不一致，并逐项反馈，推动调整。',46,y,503)-11
y=para('目前留有Android测试原型、源码、演示录屏与汇报材料；本地教程、悬浮手动确认和中文朗读形成了可演示流程。OCR虽已接入，但自动推进未通过现场验证，真实模型调用也未完成验收。项目已归档，这些问题成为我的后续学习案例。',46,y,503)-14

# Two source screenshots form one explicitly labelled evidence figure.
im1=ROOT/'素材/image3.png';im2=ROOT/'素材/image6.png'
height=202; widths=[]
for p,x in [(im1,145),(im2,350)]:
 im=Image.open(p);w=height*im.width/im.height; widths.append(w)
 c.drawImage(ImageReader(str(p)),x,y-height,width=w,height=height,mask='auto')
y-=height+8
y=para('图1  个人原型演示画面：一句话生成本地步骤／悬浮卡片手动跟学。',46,y,503,'small')-20
y=para('“我的川农”：我围绕校园服务持续提出交互改进，包括减少重复认证、区分网络未连接与身份失效、把状态和可执行操作放在一起。已形成移动端原型及相关改动记录。这个过程让我开始关注异常场景与数据边界，重新审视“好用”的含义。',46,y,503)-15
y=para('岗位学习：2026年10月26日，我对照AI产品经理岗位描述，梳理LLM、Agent、RAG及多模态局限。我的技术理解仍处于打基础阶段；下一步要把概念用于产品方案和测试设计，逐步建立与研发讨论问题的能力。',46,y,503)
c.showPage()

page(3,'计划与调整')
txt('用验证结果调整行动',46,752,24)
y=heading('四、阶段计划与资源使用',710)
y=para('以下为拟执行计划，不作为已取得的成果。以学业为前提，每周安排固定项目学习时间，优先利用专业课程、学校就业指导活动和项目实践，向教师与从业者请教。',46,y,503)-14
y=table([['阶段','行动重点','计划形成的证据'],['2026.11—2027.01','选定一个服务场景；完成6次访谈与5人任务测试；学习Python和SQL基础','访谈纪要、需求文档、任务完成记录及失败原因'],['2027.02—2027.07','做小型RAG／Agent学习样例；建立30条测试用例；向教师和从业者求反馈','可演示样例、准确性与耗时记录、成本估算及复盘'],['大三至大四','结合专业课程完善作品集，争取产品相关实习；持续核对岗位的专业与能力要求','完整项目案例、真实反馈和实习申请记录']],[106,218,179],y)-24
y=heading('五、动态调整与职业责任',y)
y=para('第一次调整来自教程入口错误：功能描述再完整，也要核对用户当前版本。今后先验证任务路径，再扩展应用范围。第二次调整来自自动推进失败：把“接入模块”和“效果达标”分开，保留可用的手动流程，不把待验证能力写成成果。',46,y,503)-13
y=para('我计划每月复盘任务完成率、失败原因和学习进度。若连续两轮测试仍反复卡在同一步，先缩小场景、修复关键流程；若技术基础影响方案判断，增加基础学习时间。若通用AI产品岗位的专业限制较强，再评估工程数字化产品等相关方向。',46,y,503)-13
y=para('我希望形成的职业习惯，是认真听需求、承认能力边界，并对交付结果负责。让长辈愿意尝试、让学生少一次无效操作，将是我持续检验职业选择的具体标准。',46,y,503)-22
txt('参考依据',46,y,10.5,ACC);y-=15
y=para('① 国务院《关于深入实施“人工智能+”行动的意见》（国发〔2025〕11号）。<br/>② 滴普科技官网“AI产品经理”校招岗位（查阅于2026年10月28日）。<br/>③ 个人项目归档、演示材料与2026年10月的迭代记录。',46,y,503,'small')
c.linkURL('https://www.cac.gov.cn/2025-08/27/c_1758018277755538.htm',(46,y+26,549,y+39),relative=0)
c.linkURL('https://www.deepexi.com/join-us/campus/c6',(46,y+13,549,y+26),relative=0)
c.save()
alltext='\n'.join(texts)
(ROOT/'报告正文核对.txt').write_text(alltext)
count=len(re.sub(r'\s','',alltext))
print(json.dumps({'pdf':str(path),'all_nonspace_chars':count,'pages':3,'figures_tables':3,'size_bytes':path.stat().st_size},ensure_ascii=False))
assert count<=2000, count
