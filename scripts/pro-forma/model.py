"""trO pro forma, 36 months from January 2027. Every input is a team estimate unless a comment names a source.

Running this file prints the yearly summary and writes src/content/proFormaData.json, which the slides read.
build_xlsx.py reads the same inputs and writes trO-pro-forma.xlsx with live formulas.
"""
import json
import math
import os

YEARS = (2027, 2028, 2029)
MONTHS = [f"{m} {y}" for y in YEARS for m in "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()]
N = len(MONTHS)

A = dict(
    # trO Events: organizers pay per attendee, per event. The band is the ticket, the badge and the networking tool.
    event_price=9.00,  # vs printed badges at $1 to $3 (vFairs) and smart-badge rental at $22 to $33 (Skift Meetings, Captag)
    booth_price=295.00,  # exhibitor lead capture, low end of $255 to $685 per show (Vendelux, 2026 order forms)
    booths_per_1000=6,  # booths sold per 1,000 attendees, across all events (many events have no expo)
    event_band_cost=16.00,  # landed cost of one event band at 10k-unit volume
    event_band_uses=40,  # events before a band is retired
    event_logistics=1.40,  # shipping, charging, cleaning and a 3% loss allowance, per attendee-event
    event_ai=0.25,  # speech-to-text and summaries, per attendee-event
    event_onsite=0.70,  # one trO tech per event, spread over attendees
    booth_cost=40.00,  # support and reporting, per booth
    uses_per_band_month=3,  # how many events one band can serve in a month
    # trO Personal: a band you own and wear every day, with an optional Pro subscription.
    personal_price=99.00,
    personal_cost=40.00,  # landed band, packaging, shipping to the customer, payment fees, 3% returns
    pro_price=8.00,  # per month; Plaud Pro is $99.99 a year (Sacra)
    pro_attach=0.45,  # share of buyers who subscribe; Plaud reports nearly 50% (AI Weekly, 2026)
    pro_churn=0.03,  # monthly
    pro_cost=1.30,  # AI, cloud and payment fees per subscriber-month
    personal_cac=30.00,  # marketing spend per personal band sold
    raise_amount=4_000_000,  # seed round, January 2027
)

# Attendee-events per month: pilots in early 2027, then growth with a spring and fall conference season.
SEASON = [0.80, 1.00, 1.15, 1.15, 1.10, 0.85, 0.55, 0.70, 1.20, 1.25, 1.10, 0.60]
EVENT_BASE = 3_000  # Jan 2027 run rate before seasonality
EVENT_GROWTH = 0.088  # monthly growth in the underlying run rate

# trO Personal launches in September 2027. Units sold per month, with a holiday bump.
PERSONAL_BASE = 600
PERSONAL_GROWTH = 0.085
PERSONAL_LAUNCH = 8  # month index (Sep 2027)
HOLIDAY = {10: 1.6, 11: 1.9}

# Monthly operating budgets by year (2027, 2028, 2029).
BUDGET = dict(
    team=[95_000, 210_000, 330_000],  # founders' pay, engineers, ops and sales; about 8, 16 and 24 people
    hardware_rd=[30_000, 20_000, 25_000],  # prototypes, firmware and design contractors
    cloud=[4_000, 12_000, 22_000],
    sales_marketing=[15_000, 35_000, 60_000],  # event sales, conference presence, brand; personal CAC is separate
    g_and_a=[12_000, 22_000, 35_000],  # office, legal, insurance, accounting, privacy compliance
)
ONE_TIME = {2: ("Consent and privacy law review", 25_000), 3: ("Band injection-mold tooling", 90_000), 5: ("FCC and CE certification", 30_000)}


def round_to(value, step):
    return int(round(value / step) * step)


def event_volume(i):
    return round_to(EVENT_BASE * math.exp(EVENT_GROWTH * i) * SEASON[i % 12], 100)


def personal_volume(i):
    if i < PERSONAL_LAUNCH:
        return 0
    months_live = i - PERSONAL_LAUNCH
    return round_to(PERSONAL_BASE * math.exp(PERSONAL_GROWTH * months_live) * HOLIDAY.get(i % 12, 1.0), 10)


attendee_events = [event_volume(i) for i in range(N)]
personal_units = [personal_volume(i) for i in range(N)]


def build():
    rows, subs, fleet, cash = [], 0.0, 0, 0.0
    for i, month in enumerate(MONTHS):
        year = i // 12
        ae, units = attendee_events[i], personal_units[i]
        booths = ae * A["booths_per_1000"] / 1000
        subs = subs * (1 - A["pro_churn"]) + units * A["pro_attach"]
        rev_events = ae * A["event_price"]
        rev_booths = booths * A["booth_price"]
        rev_personal = units * A["personal_price"]
        rev_pro = subs * A["pro_price"]
        revenue = rev_events + rev_booths + rev_personal + rev_pro
        cogs_events = ae * (A["event_band_cost"] / A["event_band_uses"] + A["event_logistics"] + A["event_ai"] + A["event_onsite"]) + booths * A["booth_cost"]
        cogs_personal = units * A["personal_cost"] + subs * A["pro_cost"]
        cogs = cogs_events + cogs_personal
        budget = {k: v[year] for k, v in BUDGET.items()}
        one_time = ONE_TIME.get(i, ("", 0))[1]
        cac = units * A["personal_cac"]
        sga = sum(budget.values()) + one_time + cac
        ebitda = revenue - cogs - sga
        fleet_needed = math.ceil(ae / A["uses_per_band_month"])
        new_bands = max(fleet_needed - fleet, 0)
        fleet = max(fleet, fleet_needed)
        fleet_capex = new_bands * A["event_band_cost"]
        raised = A["raise_amount"] if i == 0 else 0
        cash += ebitda - fleet_capex + raised
        rows.append(dict(month=month, index=i, year=YEARS[year], attendee_events=ae, booths=booths, personal_units=units, subscribers=subs,
                         rev_events=rev_events, rev_booths=rev_booths, rev_personal=rev_personal, rev_pro=rev_pro, revenue=revenue,
                         cogs=cogs, gross_profit=revenue - cogs, sga=sga, ebitda=ebitda, fleet=fleet, fleet_capex=fleet_capex, cash=cash,
                         team=budget["team"], product=budget["hardware_rd"] + budget["cloud"] + (one_time if i in (3, 5) else 0),
                         go_to_market=budget["sales_marketing"] + cac, g_and_a=budget["g_and_a"] + (one_time if i == 2 else 0)))
    return rows


def yearly(rows):
    out = []
    for y in YEARS:
        r = [x for x in rows if x["year"] == y]
        s = lambda k: sum(x[k] for x in r)
        out.append(dict(year=y, attendee_events=s("attendee_events"), personal_units=s("personal_units"), subscribers_end=r[-1]["subscribers"],
                        rev_events=s("rev_events") + s("rev_booths"), rev_personal=s("rev_personal") + s("rev_pro"), revenue=s("revenue"),
                        cogs=s("cogs"), gross_profit=s("gross_profit"), sga=s("sga"), ebitda=s("ebitda"), cash_end=r[-1]["cash"], fleet_end=r[-1]["fleet"]))
    return out


def use_of_funds(rows):
    runway = rows[:24]
    s = lambda k: sum(x[k] for x in runway)
    return dict(team=s("team"), product=s("product"), fleet_and_ops=s("fleet_capex") + s("cogs"), go_to_market=s("go_to_market"), g_and_a=s("g_and_a"),
                revenue=s("revenue"), cash_at_milestone=runway[-1]["cash"], lowest_cash=min(x["cash"] for x in rows))


if __name__ == "__main__":
    rows = build()
    years = yearly(rows)
    funds = use_of_funds(rows)
    for y in years:
        gm = y["gross_profit"] / y["revenue"]
        print(y["year"], {k: round(v) for k, v in y.items() if k != "year"}, f"GM {gm:.1%}")
    print("funds", {k: round(v) for k, v in funds.items()})
    print("Dec 2029 events run rate", attendee_events[-12:], "personal", personal_units[-12:])
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data = dict(assumptions=A, months=[{k: (round(v, 2) if isinstance(v, float) else v) for k, v in r.items()} for r in rows], years=years, useOfFunds=funds)
    with open(os.path.join(root, "src/content/proFormaData.json"), "w") as f:
        json.dump(data, f, indent=1)
