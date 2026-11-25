/**
 * The pro forma. scripts/pro-forma/model.py is the one place the inputs live: running it writes proFormaData.json,
 * which this file reads, and build_xlsx.py writes the same model into trO-pro-forma.xlsx with live formulas.
 * Every input is a team estimate unless the spreadsheet names a source.
 */
import data from "./proFormaData.json";

const a = data.assumptions;

export const assumptions = {
  eventPrice: a.event_price,
  boothPrice: a.booth_price,
  eventBandCost: a.event_band_cost,
  eventBandUses: a.event_band_uses,
  personalPrice: a.personal_price,
  personalCost: a.personal_cost,
  proPrice: a.pro_price,
  proAttach: a.pro_attach,
  raise: a.raise_amount,
};

/** What one attendee at one event costs us: band wear, logistics, AI notes and the onsite tech. */
export const eventCostPerAttendee = a.event_band_cost / a.event_band_uses + a.event_logistics + a.event_ai + a.event_onsite;
export const eventMargin = 1 - eventCostPerAttendee / a.event_price;
export const personalMargin = 1 - a.personal_cost / a.personal_price;
export const proMargin = 1 - a.pro_cost / a.pro_price;

export type Month = {
  index: number;
  year: number;
  attendeeEvents: number;
  revenue: number;
  expenses: number;
  ebitda: number;
  cash: number;
};

export const months: Month[] = data.months.map((month) => ({
  index: month.index,
  year: month.year,
  attendeeEvents: month.attendee_events,
  revenue: month.revenue,
  expenses: month.cogs + month.sga,
  ebitda: month.ebitda,
  cash: month.cash,
}));

export const years = data.years.map((year) => ({
  year: year.year,
  attendeeEvents: year.attendee_events,
  personalUnits: year.personal_units,
  subscribersAtEnd: year.subscribers_end,
  eventsRevenue: year.rev_events,
  personalRevenue: year.rev_personal,
  revenue: year.revenue,
  grossMargin: year.gross_profit / year.revenue,
  expenses: year.cogs + year.sga,
  ebitda: year.ebitda,
  cashAtEnd: year.cash_end,
  fleetAtEnd: year.fleet_end,
}));

export type Year = (typeof years)[number];

const f = data.useOfFunds;

/** The first 24 months, which the raise pays for. */
export const useOfFunds = {
  raise: a.raise_amount,
  categories: [
    { id: "team", label: "Team", detail: "About 8 people in 2027 and 16 in 2028", amount: f.team },
    { id: "fleet", label: "Bands and event operations", detail: "The event band fleet, Personal bands, AI notes and onsite techs", amount: f.fleet_and_ops },
    { id: "market", label: "Go to market", detail: "Event sales, conference presence and the Personal launch", amount: f.go_to_market },
    { id: "product", label: "Product", detail: "Hardware R&D, mold tooling, FCC and CE certification, cloud", amount: f.product },
    { id: "ga", label: "G&A and privacy", detail: "Insurance, accounting and a consent law review", amount: f.g_and_a },
  ],
  revenueOverRunway: f.revenue,
  cashAtMilestone: f.cash_at_milestone,
  lowestCash: f.lowest_cash,
};

export const totalSpendOverRunway = useOfFunds.categories.reduce((total, category) => total + category.amount, 0);
