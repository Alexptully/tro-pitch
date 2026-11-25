"""Writes trO-pro-forma.xlsx from the inputs in model.py, with live formulas so the sheet recalculates when an input changes."""
import os
import sys

from openpyxl import Workbook
from openpyxl.comments import Comment
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter as col_letter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import model  # noqa: E402

A, MONTHS, N = model.A, model.MONTHS, model.N
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

FONT = "Arial"
BLUE = Font(name=FONT, color="0000FF")
BLACK = Font(name=FONT)
GREEN = Font(name=FONT, color="008000")
BOLD = Font(name=FONT, bold=True)
YELLOW = PatternFill("solid", fgColor="FFFF00")
HEAD = PatternFill("solid", fgColor="E8E2D6")
CUR = "$#,##0;($#,##0);-"
CUR2 = "$#,##0.00;($#,##0.00);-"
NUM = "#,##0;(#,##0);-"
PCT = "0.0%;(0.0%);-"

FIRST = 2
LAST = FIRST + N - 1
YEAR_COL = {y: LAST + 1 + y for y in range(3)}

wb = Workbook()
ws = wb.active
ws.title = "Pro Forma"
ws["A1"] = "Guerilla Financial Pro Forma: trO (team estimates, monthly, Jan 2027 to Dec 2029)"
ws["A1"].font = Font(name=FONT, bold=True, size=13)
for i, month in enumerate(MONTHS):
    cell = ws.cell(2, FIRST + i, month)
    cell.font, cell.fill, cell.alignment = BOLD, HEAD, Alignment(horizontal="center")
for y, column in YEAR_COL.items():
    cell = ws.cell(2, column, f"FY {model.YEARS[y]}")
    cell.font, cell.fill, cell.alignment = BOLD, HEAD, Alignment(horizontal="center")

LAYOUT = [
    ("vol_h", "Volume", None),
    ("ae", "Attendee-events (one band worn at one event), our sales plan", NUM),
    ("booths", "Exhibitor booths using trO lead capture", NUM),
    ("units", "trO Personal bands sold, our sales plan", NUM),
    ("subs", "trO Pro subscribers (end of month)", NUM),
    (None, None, None),
    ("rev_h", "Revenue", None),
    ("rev_events", "Event fees (organizer pays per attendee)", CUR),
    ("rev_booths", "Exhibitor lead capture", CUR),
    ("rev_personal", "trO Personal band sales", CUR),
    ("rev_pro", "trO Pro subscriptions", CUR),
    ("rev", "Total revenue", CUR),
    (None, None, None),
    ("cogs_h", "Expenses (Cost of Goods Sold)", None),
    ("c_wear", "Event band wear (landed cost spread over its uses)", CUR),
    ("c_logi", "Shipping, charging, cleaning and loss", CUR),
    ("c_ai", "AI notes for events", CUR),
    ("c_onsite", "Onsite trO tech", CUR),
    ("c_booth", "Exhibitor support and reporting", CUR),
    ("c_personal", "trO Personal landed cost, shipping, fees and returns", CUR),
    ("c_pro", "trO Pro AI, cloud and payment fees", CUR),
    ("cogs", "Total COGS", CUR),
    ("gp", "Gross profit", CUR),
    ("gm", "Gross margin", PCT),
    (None, None, None),
    ("sga_h", "SG&A (Operating Expenses)", None),
    ("team", "Team pay, benefits and payroll tax", CUR),
    ("rd", "Hardware R&D and firmware", CUR),
    ("cloud", "Cloud and software", CUR),
    ("sales", "Event sales and brand marketing", CUR),
    ("cac", "trO Personal paid marketing", CUR),
    ("ga", "G&A: office, legal, insurance, accounting, privacy", CUR),
    ("one", "One-time: privacy review (Mar 2027), tooling (Apr 2027), FCC and CE (Jun 2027)", CUR),
    ("sga", "Total SG&A", CUR),
    (None, None, None),
    ("ebitda", "EBITDA", CUR),
    (None, None, None),
    ("cash_h", "Cash", None),
    ("needed", "Event bands needed this month", NUM),
    ("fleet", "Event band fleet (end of month)", NUM),
    ("new", "New event bands bought", NUM),
    ("capex", "Event band purchases", CUR),
    ("fund", "Funding raised", CUR),
    ("flow", "Net cash flow", CUR),
    ("cash", "Ending cash", CUR),
]
R = {}
row_number = 3
for key, label, _ in LAYOUT:
    if key:
        R[key] = row_number
        bold = key.endswith("_h") or key in ("rev", "cogs", "gp", "sga", "ebitda", "cash")
        ws.cell(row_number, 1, label).font = BOLD if bold else BLACK
    row_number += 1
FORMAT = {key: fmt for key, _, fmt in LAYOUT if key}

ASSUMPTIONS = [
    ("event_price", "Event fee per attendee, per event", CUR2, "Team estimate. Printed badges cost $1 to $3 each (vFairs) and smart-badge rental runs $22 to $33 a device (Skift Meetings). The fee replaces the badge and the door scan."),
    ("booth_price", "Exhibitor lead capture, per booth per event", CUR, "Low end of the $255 to $685 first licence on 2026 show order forms (Vendelux)."),
    ("booths_per_1000", "Booths sold per 1,000 attendees", NUM, "Team estimate across all events, including the many with no expo floor."),
    ("event_band_cost", "Landed cost of one event band", CUR2, "Team estimate at 10,000-unit volume: ESP32-C3, NFC, mic, battery, LEDs and an injection-molded band."),
    ("event_band_uses", "Events per event band before it retires", NUM, "Team estimate."),
    ("event_logistics", "Shipping, charging, cleaning and loss, per attendee-event", CUR2, "Team estimate, including a 3% loss allowance."),
    ("event_ai", "AI notes, per attendee-event", CUR2, "Team estimate. Speech-to-text runs only when both people agree."),
    ("event_onsite", "Onsite trO tech, per attendee-event", CUR2, "Team estimate: one tech per event, spread over attendees."),
    ("booth_cost", "Support and reporting, per booth", CUR, "Team estimate."),
    ("uses_per_band_month", "Events one band can serve in a month", NUM, "Team estimate. Sets how many bands the fleet needs."),
    ("personal_price", "trO Personal band price", CUR2, "Team estimate. Plaud NotePin sells for $159 (Plaud store)."),
    ("personal_cost", "trO Personal landed cost, shipping, fees and returns", CUR2, "Team estimate."),
    ("pro_price", "trO Pro subscription, per month", CUR2, "Team estimate. Plaud Pro is $99.99 a year (Sacra)."),
    ("pro_attach", "Share of Personal buyers who subscribe to Pro", PCT, "Plaud reports that nearly 50% of device buyers move to a paid plan (AI Weekly, 2026). We plan on 45%."),
    ("pro_churn", "Pro monthly churn", PCT, "Team estimate."),
    ("pro_cost", "Pro AI, cloud and payment fees, per subscriber-month", CUR2, "Team estimate."),
    ("personal_cac", "Paid marketing per Personal band sold", CUR2, "Team estimate."),
    ("raise_amount", "Seed raise (Jan 2027)", CUR, "The ask on our use of funds slide."),
]
assumption_row = R["cash"] + 3
ws.cell(assumption_row, 1, "Overall Model Assumptions").font = BOLD
ws.cell(assumption_row, 2, "Value").font = BOLD
ws.cell(assumption_row, 3, "Why we believe it").font = BOLD
ref = {}
for k, (key, label, fmt, why) in enumerate(ASSUMPTIONS):
    r = assumption_row + 1 + k
    ws.cell(r, 1, label).font = BLACK
    cell = ws.cell(r, 2, A[key])
    cell.font, cell.fill, cell.number_format = BLUE, YELLOW, fmt
    ws.cell(r, 3, why).font = BLACK
    ref[key] = f"$B${r}"

PROSE = [
    "How to read this sheet: blue numbers are typed-in assumptions, black numbers are formulas and green numbers link to another sheet. Yellow cells are the levers.",
    "trO Events: organizers pay a fee for every attendee who wears a trO band. The band is the ticket at the door and the networking tool inside. Bands come back at the exit.",
    "Exhibitors can add lead capture: every attendee who taps their booth band lands in their lead list, with notes when both people agree.",
    "trO Personal: a band people buy and keep. It works as the ticket at any trO event and as an everyday contact and notes band. trO Pro adds unlimited AI notes.",
    "Row 4 (attendee-events) and row 6 (Personal bands) are our sales plan. They grow from pilots in early 2027 with a spring and fall conference season.",
    "Event band purchases are cash, not EBITDA. We buy bands as the fleet grows and spread each band's cost over its uses in COGS.",
    "SG&A rows are monthly budgets typed in by year: about 8 people in 2027, 16 in 2028 and 24 in 2029. Personal paid marketing scales with units sold.",
]
for i, text in enumerate(PROSE):
    ws.cell(assumption_row + len(ASSUMPTIONS) + 2 + i, 1, text).font = BLACK


def put(key, column, value, font=BLACK):
    cell = ws.cell(R[key], column, value)
    cell.number_format, cell.font = FORMAT[key], font


def fill_month(i):
    column = FIRST + i
    C, P = col_letter(column), col_letter(column - 1)
    year = i // 12
    at = lambda key: f"{C}{R[key]}"
    put("ae", column, int(model.attendee_events[i]), BLUE)
    put("booths", column, f"={at('ae')}*{ref['booths_per_1000']}/1000")
    put("units", column, int(model.personal_units[i]), BLUE)
    previous_subs = "0" if i == 0 else f"{P}{R['subs']}"
    put("subs", column, f"={previous_subs}*(1-{ref['pro_churn']})+{at('units')}*{ref['pro_attach']}")
    put("rev_events", column, f"={at('ae')}*{ref['event_price']}")
    put("rev_booths", column, f"={at('booths')}*{ref['booth_price']}")
    put("rev_personal", column, f"={at('units')}*{ref['personal_price']}")
    put("rev_pro", column, f"={at('subs')}*{ref['pro_price']}")
    put("rev", column, f"=SUM({C}{R['rev_events']}:{C}{R['rev_pro']})")
    put("c_wear", column, f"={at('ae')}*{ref['event_band_cost']}/{ref['event_band_uses']}")
    put("c_logi", column, f"={at('ae')}*{ref['event_logistics']}")
    put("c_ai", column, f"={at('ae')}*{ref['event_ai']}")
    put("c_onsite", column, f"={at('ae')}*{ref['event_onsite']}")
    put("c_booth", column, f"={at('booths')}*{ref['booth_cost']}")
    put("c_personal", column, f"={at('units')}*{ref['personal_cost']}")
    put("c_pro", column, f"={at('subs')}*{ref['pro_cost']}")
    put("cogs", column, f"=SUM({C}{R['c_wear']}:{C}{R['c_pro']})")
    put("gp", column, f"={at('rev')}-{at('cogs')}")
    put("gm", column, f"=IF({at('rev')}=0,0,{at('gp')}/{at('rev')})")
    put("team", column, model.BUDGET["team"][year], BLUE)
    put("rd", column, model.BUDGET["hardware_rd"][year], BLUE)
    put("cloud", column, model.BUDGET["cloud"][year], BLUE)
    put("sales", column, model.BUDGET["sales_marketing"][year], BLUE)
    put("cac", column, f"={at('units')}*{ref['personal_cac']}")
    put("ga", column, model.BUDGET["g_and_a"][year], BLUE)
    put("one", column, model.ONE_TIME.get(i, ("", 0))[1], BLUE)
    put("sga", column, f"=SUM({C}{R['team']}:{C}{R['one']})")
    put("ebitda", column, f"={at('gp')}-{at('sga')}")
    put("needed", column, f"=ROUNDUP({at('ae')}/{ref['uses_per_band_month']},0)")
    previous_fleet = "0" if i == 0 else f"{P}{R['fleet']}"
    put("fleet", column, f"=MAX({previous_fleet},{at('needed')})")
    put("new", column, f"={at('fleet')}-{previous_fleet}")
    put("capex", column, f"={at('new')}*{ref['event_band_cost']}")
    put("fund", column, f"={ref['raise_amount']}" if i == 0 else 0)
    put("flow", column, f"={at('ebitda')}-{at('capex')}+{at('fund')}")
    previous_cash = "" if i == 0 else f"{P}{R['cash']}+"
    put("cash", column, f"={previous_cash}{at('flow')}")


for i in range(N):
    fill_month(i)

SUMMED = ["ae", "booths", "units", "rev_events", "rev_booths", "rev_personal", "rev_pro", "rev", "c_wear", "c_logi", "c_ai", "c_onsite", "c_booth", "c_personal", "c_pro",
          "cogs", "gp", "team", "rd", "cloud", "sales", "cac", "ga", "one", "sga", "ebitda", "new", "capex", "fund", "flow"]
for y, column in YEAR_COL.items():
    a, b, C = col_letter(FIRST + 12 * y), col_letter(FIRST + 12 * y + 11), col_letter(column)
    for key in SUMMED:
        put(key, column, f"=SUM({a}{R[key]}:{b}{R[key]})", BOLD)
    for key in ("subs", "fleet", "cash"):
        put(key, column, f"={b}{R[key]}", BOLD)
    put("gm", column, f"=IF({C}{R['rev']}=0,0,{C}{R['gp']}/{C}{R['rev']})", BOLD)
ws.cell(R["subs"], 1).comment = Comment("Annual columns show the count at year end.", "trO")
ws.column_dimensions["A"].width = 64
for column in range(2, YEAR_COL[2] + 1):
    ws.column_dimensions[col_letter(column)].width = 12
ws.freeze_panes = "B3"

# Use of funds: the first 24 months.
uf = wb.create_sheet("Use of Funds")
pf = "'Pro Forma'"
a, b = col_letter(FIRST), col_letter(FIRST + 23)
total = lambda key: f"SUM({pf}!{a}{R[key]}:{b}{R[key]})"
uf["A1"] = f"Use of funds: where the ${A['raise_amount'] / 1e6:.0f}M seed goes, Jan 2027 to Dec 2028"
uf["A1"].font = Font(name=FONT, bold=True, size=13)
uf["A2"] = "Spending by category over the first 24 months, linked to the Pro Forma sheet. Revenue earned in the same months pays for the rest."
CATEGORIES = [
    ("Team", f"={total('team')}", "About 8 people in 2027 and 16 in 2028: hardware, firmware, app, event ops and sales"),
    ("Product", f"={total('rd')}+{total('cloud')}+{pf}!E{R['one']}+{pf}!G{R['one']}", "Hardware R&D, injection-mold tooling, FCC and CE certification, cloud"),
    ("Band fleet and event operations", f"={total('capex')}+{total('cogs')}", "Event bands for the fleet, Personal bands we sell, AI, shipping and onsite techs"),
    ("Go to market", f"={total('sales')}+{total('cac')}", "Event sales, conference presence and Personal launch marketing"),
    ("G&A, legal and privacy", f"={total('ga')}+{pf}!D{R['one']}", "Office, insurance, accounting and a consent and privacy law review"),
]
for j, header in enumerate(["Category", "Amount", "Share", "What it covers"]):
    cell = uf.cell(4, 1 + j, header)
    cell.font, cell.fill = BOLD, HEAD
for k, (name, formula, detail) in enumerate(CATEGORIES):
    r = 5 + k
    uf.cell(r, 1, name).font = BLACK
    cell = uf.cell(r, 2, formula)
    cell.number_format, cell.font = CUR, GREEN
    uf.cell(r, 4, detail).font = BLACK
total_row = 5 + len(CATEGORIES)
uf.cell(total_row, 1, "Total spending, 24 months").font = BOLD
cell = uf.cell(total_row, 2, f"=SUM(B5:B{total_row - 1})")
cell.number_format, cell.font = CUR, BOLD
for k in range(len(CATEGORIES)):
    cell = uf.cell(5 + k, 3, f"=B{5 + k}/$B${total_row}")
    cell.number_format = PCT
LINKS = [
    ("Revenue earned over the same 24 months", f"={total('rev')}"),
    ("Cash at Dec 2028", f"={pf}!{b}{R['cash']}"),
    ("Lowest cash balance in the 36 months", f"=MIN({pf}!{col_letter(FIRST)}{R['cash']}:{col_letter(LAST)}{R['cash']})"),
    ("Attendee-events in 2028", f"={pf}!{col_letter(YEAR_COL[1])}{R['ae']}"),
    ("trO Pro subscribers at Dec 2028", f"={pf}!{b}{R['subs']}"),
    ("Event bands in the fleet at Dec 2028", f"={pf}!{b}{R['fleet']}"),
]
for k, (label, formula) in enumerate(LINKS):
    r = total_row + 1 + k
    uf.cell(r, 1, label).font = BLACK
    cell = uf.cell(r, 2, formula)
    cell.number_format, cell.font = (CUR if "ash" in label or "Revenue" in label else NUM), GREEN
uf.column_dimensions["A"].width = 44
uf.column_dimensions["B"].width = 16
uf.column_dimensions["C"].width = 10
uf.column_dimensions["D"].width = 80

# Market size
ms = wb.create_sheet("TAM SAM SOM")
ms["A1"] = "Market size for trO Events, priced at the event fee per attendee"
ms["A1"].font = Font(name=FONT, bold=True, size=13)
for j, header in enumerate(["Market", "Who", "Participants a year", "Price", "Annual market", "Source"]):
    cell = ms.cell(3, 1 + j, header)
    cell.font, cell.fill = BOLD, HEAD
MARKET = [
    ("TAM", "Every business-event participant worldwide, 2025", 1_645_000_000, "EIC and Oxford Economics, 2026 Global Economic Significance of Business Events"),
    ("SAM", "Business-event participants in North America, 2025", 336_000_000, "EIC and Oxford Economics, 2026 Global Economic Significance of Business Events"),
    ("SOM", "Attendee-events in our 2029 plan, plus exhibitor lead capture", None, "Our pro forma sales plan (team estimate)"),
]
for k, (name, who, participants, source) in enumerate(MARKET):
    r = 4 + k
    ms.cell(r, 1, name).font = BOLD
    ms.cell(r, 2, who).font = BLACK
    year3 = col_letter(YEAR_COL[2])
    cell = ms.cell(r, 3, participants if participants else f"={pf}!{year3}{R['ae']}")
    cell.number_format, cell.font = NUM, (BLUE if participants else GREEN)
    cell = ms.cell(r, 4, f"={pf}!{ref['event_price']}")
    cell.number_format, cell.font = CUR2, GREEN
    market_value = f"=C{r}*D{r}" if participants else f"={pf}!{year3}{R['rev_events']}+{pf}!{year3}{R['rev_booths']}"
    ms.cell(r, 5, market_value).number_format = CUR
    ms.cell(r, 6, source).font = BLACK
ms.cell(8, 1, "SOM as a share of SAM").font = BLACK
ms.cell(8, 5, "=E6/E5").number_format = "0.00%"
for column, width in zip("ABCDEF", (8, 60, 20, 10, 18, 72)):
    ms.column_dimensions[column].width = width

wb.save(os.path.join(ROOT, "trO-pro-forma.xlsx"))
print("saved")
