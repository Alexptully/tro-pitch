"""trO pro forma: one hero revenue line (per attendee, per event), 36 months from Jan 2027."""
import json
MONTHS=[f"{m} {y}" for y in (2027,2028,2029) for m in "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()]
A=dict(
  price_per_attendee_event=4.00,
  attendee_events_per_campus_year=8000,
  season=[.09,.11,.11,.12,.05,.02,.02,.04,.12,.13,.12,.07],
  # paying campuses at end of each month (team estimate). USC pilot is free Feb-May 2027.
  campuses=[0,0,0,0,0,0,0,0,1,1,2,3,  4,4,5,6,6,6,7,8,10,12,13,15,  16,17,19,21,22,22,23,25,29,33,36,40],
  band_unit_cost=5.50, band_uses=25, bands_per_new_campus=600, pilot_bands=300,
  ai_cost_per_attendee_event=0.10, logistics_per_attendee_event=0.35, support_per_attendee_event=0.13,
)
def sga(i):
  y=i//12
  team=[9000,23000,40000][y]
  eng=[6000,3000,4000][y]
  cloud=[600,1500,3000][y]
  sales=[1500,4000,8000][y]
  legal=1000
  one=0
  if i==2: one+=10000   # privacy and recording-consent legal review, Mar 2027
  if i==5: one+=15000   # FCC certification for the band, Jun 2027
  return dict(team=team,engineering=eng,cloud=cloud,sales=sales,legal=legal,one_time=one)
rows=[]; cash=0; prev=0
for i,m in enumerate(MONTHS):
  c=A['campuses'][i]
  ae=c*A['attendee_events_per_campus_year']*A['season'][i%12]
  rev=ae*A['price_per_attendee_event']
  cogs_band=ae*A['band_unit_cost']/A['band_uses']
  cogs=ae*(A['band_unit_cost']/A['band_uses']+A['ai_cost_per_attendee_event']+A['logistics_per_attendee_event']+A['support_per_attendee_event'])
  s=sga(i); sg=sum(s.values())
  ebitda=rev-cogs-sg
  new=max(c-prev,0); prev=c
  fleet=new*A['bands_per_new_campus']*A['band_unit_cost'] + (A['pilot_bands']*A['band_unit_cost'] if i==1 else 0)
  rows.append(dict(m=m,c=c,ae=ae,rev=rev,cogs=cogs,sga=sg,ebitda=ebitda,fleet=fleet,**s))
for y in range(3):
  r=rows[y*12:(y+1)*12]
  f=lambda k: sum(x[k] for x in r)
  print(2027+y, 'rev',round(f('rev')),'cogs',round(f('cogs')),'GM%',round(100*(1-f('cogs')/max(f('rev'),1)),1),'sga',round(f('sga')),'ebitda',round(f('ebitda')),'fleet',round(f('fleet')), 'end campuses', r[-1]['c'])
cum=0;low=0
for x in rows:
  cum+=x['ebitda']-x['fleet']; low=min(low,cum)
  x['cum']=cum
print('max cumulative burn',round(low))
for x in rows[18:]: print(x['m'],round(x['rev']),round(x['ebitda']),round(x['cum']))
print('ARR Dec 2029', rows[-1]['c']*8000*4, 'ARR Dec 2028', rows[23]['c']*8000*4)
