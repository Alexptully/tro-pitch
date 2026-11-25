import json
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter as L
from openpyxl.comments import Comment

exec(open(__file__.replace('build_xlsx.py','model.py')).read().split('rows=[]')[0])  # A, MONTHS, sga()

wb=Workbook(); ws=wb.active; ws.title="Pro Forma"
F="Arial"; BLUE=Font(name=F,color="0000FF"); BLACK=Font(name=F); BOLD=Font(name=F,bold=True)
YEL=PatternFill("solid",fgColor="FFFF00"); HEAD=PatternFill("solid",fgColor="E8E2D6")
CUR='$#,##0;($#,##0);-'; CUR2='$#,##0.00;($#,##0.00);-'; NUM='#,##0;(#,##0);-'; PCT='0.0%;(0.0%);-'
NM=len(MONTHS); FIRST=2; LASTC=FIRST+NM-1
YCOL={0:LASTC+1,1:LASTC+2,2:LASTC+3}

ws["A1"]="Guerilla Financial Pro Forma: trO (team estimates, monthly, Jan 2027 to Dec 2029)"; ws["A1"].font=Font(name=F,bold=True,size=13)
ws.cell(2,1,"").font=BOLD
for i,m in enumerate(MONTHS):
    c=ws.cell(2,FIRST+i,m); c.font=BOLD; c.fill=HEAD; c.alignment=Alignment(horizontal="center")
for y,col in YCOL.items():
    c=ws.cell(2,col,f"FY {2027+y}"); c.font=BOLD; c.fill=HEAD; c.alignment=Alignment(horizontal="center")

R=dict(rev_h=3,camp=4,season=5,ae=6,price=7,rev=8, cogs_h=10,band=11,ai=12,logi=13,supp=14,cogs=15,gp=16,gm=17,
       sga_h=19,team=20,eng=21,cloud=22,sales=23,legal=24,one=25,sga=26, ebitda=28,
       cash_h=30,new=31,fleet=32,fund=33,flow=34,endcash=35, asum_h=37)
# Assumption cells
AS=[("price","Price per attendee, per event (paid by the organizer)",A['price_per_attendee_event'],CUR2,"Team estimate. Comparable: Captag rents event wearables at $22 to $33 per device (Skift Meetings)."),
    ("aepc","Attendee-events per campus, per year",A['attendee_events_per_campus_year'],NUM,"Team estimate: career fairs, alumni mixers and club recruiting nights at one university."),
    ("unit","Band unit cost",A['band_unit_cost'],CUR2,"Midpoint of the $4 to $7 per reusable unit estimate from our HackSC prototype."),
    ("uses","Events per band before replacement",A['band_uses'],NUM,"Team estimate."),
    ("aic","AI transcription and summaries, per attendee-event",A['ai_cost_per_attendee_event'],CUR2,"Team estimate. Only charged when both people agree to notes."),
    ("logc","Cleaning, charging and shipping, per attendee-event",A['logistics_per_attendee_event'],CUR2,"Team estimate."),
    ("supc","Event-day support, per attendee-event",A['support_per_attendee_event'],CUR2,"Team estimate."),
    ("bpc","Bands shipped to each new campus",A['bands_per_new_campus'],NUM,"Team estimate: covers the largest single event on a campus."),
    ("pilot","Bands for the free USC pilot (Feb 2027)",A['pilot_bands'],NUM,"Team estimate."),
    ("raise","Pre-seed raise (Jan 2027)",750000,CUR,"The ask on our use of funds slide."),]
ws.cell(R['asum_h'],1,"Overall Model Assumptions").font=BOLD
ws.cell(R['asum_h'],2,"Value").font=BOLD; ws.cell(R['asum_h'],3,"Why we believe it").font=BOLD
ref={}
for k,(key,label,val,fmt,why) in enumerate(AS):
    r=R['asum_h']+1+k
    ws.cell(r,1,label).font=BLACK
    c=ws.cell(r,2,val); c.font=BLUE; c.fill=YEL; c.number_format=fmt
    ws.cell(r,3,why).font=BLACK
    ref[key]=f"$B${r}"
notes_r=R['asum_h']+len(AS)+2
prose=["How to read this sheet: blue numbers are typed-in assumptions, black numbers are formulas. Yellow cells are the levers to change.",
 "Hero revenue: organizers (career centers, alumni groups, student orgs) pay a flat fee for every attendee who wears a trO band at their event. Students never pay.",
 "Paying campuses (row 4) is our sales plan: USC pilots free in spring 2027 and converts in fall 2027, then LA-area campuses in 2028 and a national rollout in 2029.",
 "Seasonality (row 5) follows the academic calendar: almost no events in June and July, peaks in October and April. Each year's shares add to 100%.",
 "Band fleet purchases are cash, not EBITDA: we buy bands when a campus signs, then spread their cost over their useful life in COGS (row 11).",
 "SG&A rows 20 to 25 are monthly budgets typed in by year. Team pay covers three founders, plus one engineer from 2028 and two hires in 2029.",
 "Sources for comparables are on the deck's sources slide. Everything else is a team estimate, labeled as one."]
for i,t in enumerate(prose): ws.cell(notes_r+i,1,t).font=BLACK

def row(r,label,bold=False):
    c=ws.cell(r,1,label); c.font=BOLD if bold else BLACK
for k,label in [("rev_h","Revenue"),("cogs_h","Expenses (Cost of Goods Sold)"),("sga_h","SG&A (Operating Expenses)"),("cash_h","Cash")]:
    row(R[k],label,True)
labels=dict(camp="Paying campuses (end of month)",season="Share of the year's events this month",ae="Attendee-events (bands worn)",price="Price per attendee-event",rev="Revenue",
 band="Band wear (unit cost spread over its uses)",ai="AI notes",logi="Cleaning, charging and shipping",supp="Event-day support",cogs="Total COGS",gp="Gross profit",gm="Gross margin",
 team="Team pay",eng="Firmware and hardware engineering",cloud="Cloud and software",sales="Campus sales and marketing",legal="Legal, privacy and insurance",one="One-time: consent law review (Mar 2027), FCC certification (Jun 2027)",sga="Total SG&A",
 ebitda="EBITDA",new="New campuses signed",fleet="Band fleet purchases",fund="Funding raised",flow="Net cash flow",endcash="Ending cash")
for k,v in labels.items(): row(R[k],v, k in ("rev","cogs","gp","sga","ebitda","endcash"))

for i in range(NM):
    col=FIRST+i; C=L(col); P=L(col-1)
    def put(k,val,fmt,font=BLACK):
        c=ws.cell(R[k],col,val); c.number_format=fmt; c.font=font
    s=sga(i)
    put("camp",A['campuses'][i],NUM,BLUE); put("season",A['season'][i%12],PCT,BLUE)
    put("ae",f"={C}{R['camp']}*{ref['aepc']}*{C}{R['season']}",NUM)
    put("price",f"={ref['price']}",CUR2)
    put("rev",f"={C}{R['ae']}*{C}{R['price']}",CUR)
    put("band",f"={C}{R['ae']}*{ref['unit']}/{ref['uses']}",CUR)
    put("ai",f"={C}{R['ae']}*{ref['aic']}",CUR); put("logi",f"={C}{R['ae']}*{ref['logc']}",CUR); put("supp",f"={C}{R['ae']}*{ref['supc']}",CUR)
    put("cogs",f"=SUM({C}{R['band']}:{C}{R['supp']})",CUR)
    put("gp",f"={C}{R['rev']}-{C}{R['cogs']}",CUR)
    put("gm",f"=IF({C}{R['rev']}=0,0,{C}{R['gp']}/{C}{R['rev']})",PCT)
    for k in ("team","eng","cloud","sales","legal"): put(k,s[{"eng":"engineering"}.get(k,k)],CUR,BLUE)
    put("one",s['one_time'],CUR,BLUE)
    put("sga",f"=SUM({C}{R['team']}:{C}{R['one']})",CUR)
    put("ebitda",f"={C}{R['gp']}-{C}{R['sga']}",CUR)
    put("new", f"=MAX({C}{R['camp']},0)" if i==0 else f"=MAX({C}{R['camp']}-{P}{R['camp']},0)",NUM)
    pil=f"+{ref['pilot']}*{ref['unit']}" if i==1 else ""
    put("fleet",f"={C}{R['new']}*{ref['bpc']}*{ref['unit']}{pil}",CUR)
    put("fund",f"={ref['raise']}" if i==0 else 0,CUR, BLACK)
    put("flow",f"={C}{R['ebitda']}-{C}{R['fleet']}+{C}{R["fund"]}",CUR)
    put("endcash",f"={C}{R['flow']}" if i==0 else f"={P}{R['endcash']}+{C}{R['flow']}",CUR)

# annual totals
sumrows=["ae","rev","band","ai","logi","supp","cogs","gp","team","eng","cloud","sales","legal","one","sga","ebitda","new","fleet","fund","flow"]
for y,col in YCOL.items():
    a=L(FIRST+12*y); b=L(FIRST+12*y+11); C=L(col)
    for k in sumrows:
        c=ws.cell(R[k],col,f"=SUM({a}{R[k]}:{b}{R[k]})"); c.number_format=NUM if k in("ae","new") else CUR; c.font=BOLD
    c=ws.cell(R['camp'],col,f"={b}{R['camp']}"); c.number_format=NUM; c.font=BOLD
    c=ws.cell(R['gm'],col,f"=IF({C}{R['rev']}=0,0,{C}{R['gp']}/{C}{R['rev']})"); c.number_format=PCT; c.font=BOLD
    c=ws.cell(R['endcash'],col,f"={b}{R['endcash']}"); c.number_format=CUR; c.font=BOLD
ws.cell(R['camp'],1).comment=Comment("Sales plan, team estimate. Annual columns show the count at year end.","trO")

ws.column_dimensions['A'].width=58; ws.column_dimensions['C'].width=14
for col in range(2,YCOL[2]+1): ws.column_dimensions[L(col)].width=max(ws.column_dimensions[L(col)].width or 0,12)
ws.column_dimensions['C'].width=12
ws.freeze_panes="B3"
for r in range(R['asum_h']+1,R['asum_h']+1+len(AS)): ws.cell(r,3).alignment=Alignment(wrap_text=False)

# Use of funds sheet
u=wb.create_sheet("Use of Funds")
u["A1"]="Use of funds: where the $750K pre-seed goes, Jan 2027 to Dec 2028"; u["A1"].font=Font(name=F,bold=True,size=13)
u["A2"]="Spending by category over the first 24 months, pulled from the Pro Forma sheet. Revenue earned in the same months becomes our reserve."; u["A2"].font=BLACK
pf="'Pro Forma'"; a=L(FIRST); b=L(FIRST+23)
cats=[("Team pay",[R['team']],"Three founders, then a first engineer in 2028"),
      ("Product: firmware, certification and cloud",[R['eng'],R['cloud']],"Plus the FCC certification in the one-time row"),
      ("Band fleet and event operations",None,"Bands bought for each campus, plus COGS"),
      ("Campus sales and marketing",[R['sales']],"Demo events, travel and campus partnerships"),
      ("Legal, privacy and insurance",[R['legal']],"Plus the consent law review in the one-time row")]
for j,h in enumerate(["Category","Amount","Share","What it covers"]):
    c=u.cell(4,1+j,h); c.font=BOLD; c.fill=HEAD
for k,(name,rows_,what) in enumerate(cats):
    r=5+k; u.cell(r,1,name).font=BLACK; u.cell(r,4,what).font=BLACK
    if name.startswith("Band"):
        f=f"=SUM({pf}!{a}{R['fleet']}:{b}{R['fleet']})+SUM({pf}!{a}{R['cogs']}:{b}{R['cogs']})"
    else:
        f="="+"+".join(f"SUM({pf}!{a}{x}:{b}{x})" for x in rows_)
    if name.startswith("Product"): f+=f"+{pf}!G{R['one']}"   # Jun 2027 FCC
    if name.startswith("Legal"): f+=f"+{pf}!D{R['one']}"     # Mar 2027 review
    c=u.cell(r,2,f); c.number_format=CUR; c.font=Font(name=F,color="008000")
tot=5+len(cats)
u.cell(tot,1,"Total spending, 24 months").font=BOLD
c=u.cell(tot,2,f"=SUM(B5:B{tot-1})"); c.number_format=CUR; c.font=BOLD
for k in range(len(cats)):
    c=u.cell(5+k,3,f"=B{5+k}/$B${tot}"); c.number_format=PCT; c.font=BLACK
u.cell(tot+1,1,"Revenue earned over the same 24 months").font=BLACK
c=u.cell(tot+1,2,f"=SUM({pf}!{a}{R['rev']}:{b}{R['rev']})"); c.number_format=CUR; c.font=Font(name=F,color="008000")
u.cell(tot+2,1,"Cash left at Dec 2028 (reserve for the 2029 seed round)").font=BOLD
c=u.cell(tot+2,2,f"={pf}!{b}{R['endcash']}"); c.number_format=CUR; c.font=Font(name=F,bold=True,color="008000")
u.cell(tot+3,1,"Lowest cash balance in the 36 months").font=BLACK
c=u.cell(tot+3,2,f"=MIN({pf}!{L(FIRST)}{R['endcash']}:{L(LASTC)}{R['endcash']})"); c.number_format=CUR; c.font=Font(name=F,color="008000")
u.cell(tot+5,1,"Milestones by Dec 2028").font=BOLD
for k,t in enumerate(["15 paying campuses (Pro Forma row 4)","$480K annual revenue run rate at Dec 2028 (15 campuses x 8,000 attendee-events x $4)","FCC-certified band in production, 9,000+ bands in the field"]):
    u.cell(tot+6+k,1,t).font=BLACK
u.column_dimensions['A'].width=58; u.column_dimensions['B'].width=14; u.column_dimensions['C'].width=10; u.column_dimensions['D'].width=52

# Market size sheet
m=wb.create_sheet("TAM SAM SOM")
m["A1"]="Market size: TAM, SAM and SOM at $4 per attendee, per event"; m["A1"].font=Font(name=F,bold=True,size=13)
hdr=["Market","Who","Count","Attendee-events per year","Price","Annual market","Source"]
for j,h in enumerate(hdr):
    c=m.cell(3,1+j,h); c.font=BOLD; c.fill=HEAD
data=[("TAM","Every business-event participant worldwide, 2025",1_650_000_000,1,"EIC and Oxford Economics, 2026 Global Economic Significance of Business Events"),
      ("SAM","U.S. four-year degree-granting colleges, 2023-24",2691,f"={pf}!{ref['aepc']}","NCES IPEDS, 2023-24 (count); attendee-events per campus is a team estimate"),
      ("SOM","Paying campuses we plan to reach by Dec 2029",f"={pf}!{L(LASTC)}{R['camp']}",f"={pf}!{ref['aepc']}","Our pro forma sales plan (team estimate)")]
for k,(n,who,cnt,per,src) in enumerate(data):
    r=4+k
    m.cell(r,1,n).font=BOLD; m.cell(r,2,who).font=BLACK
    c=m.cell(r,3,cnt); c.number_format=NUM; c.font=BLUE if isinstance(cnt,int) else Font(name=F,color="008000")
    c=m.cell(r,4,per); c.number_format=NUM; c.font=BLUE if isinstance(per,int) else Font(name=F,color="008000")
    c=m.cell(r,5,f"={pf}!{ref['price']}"); c.number_format=CUR2; c.font=Font(name=F,color="008000")
    c=m.cell(r,6,f"=C{r}*D{r}*E{r}"); c.number_format=CUR; c.font=BLACK
    m.cell(r,7,src).font=BLACK
m.cell(8,1,"SOM as a share of SAM").font=BLACK
c=m.cell(8,6,"=F6/F5"); c.number_format=PCT
for col,w in zip("ABCDEFG",(8,48,16,22,10,18,70)): m.column_dimensions[col].width=w

wb.save(__file__.replace('scripts/pro-forma/build_xlsx.py','trO-pro-forma.xlsx'))

print("saved")
