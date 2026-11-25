/**
 * The pro forma, mirrored from scripts/pro-forma/model.py (which also builds trO-pro-forma.xlsx).
 * Every input is a team estimate. Change an input here and in model.py together.
 */
export const assumptions = {
  pricePerAttendeeEvent: 4,
  attendeeEventsPerCampusYear: 8000,
  /** Share of a year's events that fall in each month, January first. Follows the academic calendar. */
  seasonality: [0.09, 0.11, 0.11, 0.12, 0.05, 0.02, 0.02, 0.04, 0.12, 0.13, 0.12, 0.07],
  /** Paying campuses at the end of each month, Jan 2027 to Dec 2029. USC pilots free in spring 2027. */
  campuses: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 6, 6, 6, 7, 8, 10, 12, 13, 15, 16, 17, 19, 21, 22, 22, 23, 25, 29, 33, 36, 40],
  bandUnitCost: 5.5,
  bandUnitCostRange: [4, 7] as const,
  eventsPerBand: 25,
  aiCostPerAttendeeEvent: 0.1,
  logisticsPerAttendeeEvent: 0.35,
  supportPerAttendeeEvent: 0.13,
  bandsPerNewCampus: 600,
  pilotBands: 300,
  raise: 750_000,
};

/** Monthly SG&A budgets by year (2027, 2028, 2029), plus two one-time costs. */
const monthlyBudget = {
  team: [9000, 23000, 40000],
  engineering: [6000, 3000, 4000],
  cloud: [600, 1500, 3000],
  sales: [1500, 4000, 8000],
  legal: [1000, 1000, 1000],
};
const oneTimeCosts: Record<number, number> = { 2: 10_000, 5: 15_000 };

export const firstYear = 2027;
export const monthCount = assumptions.campuses.length;

export const costPerAttendeeEvent =
  assumptions.bandUnitCost / assumptions.eventsPerBand +
  assumptions.aiCostPerAttendeeEvent +
  assumptions.logisticsPerAttendeeEvent +
  assumptions.supportPerAttendeeEvent;

export const grossMargin = 1 - costPerAttendeeEvent / assumptions.pricePerAttendeeEvent;

export type Month = {
  index: number;
  year: number;
  campuses: number;
  revenue: number;
  cogs: number;
  team: number;
  product: number;
  sales: number;
  legal: number;
  fleet: number;
  expenses: number;
  ebitda: number;
  cash: number;
};

function budgetFor(index: number) {
  const year = Math.floor(index / 12);
  return {
    team: monthlyBudget.team[year],
    product: monthlyBudget.engineering[year] + monthlyBudget.cloud[year] + (index === 5 ? oneTimeCosts[5] : 0),
    sales: monthlyBudget.sales[year],
    legal: monthlyBudget.legal[year] + (index === 2 ? oneTimeCosts[2] : 0),
  };
}

function fleetPurchase(index: number) {
  const newCampuses = Math.max(assumptions.campuses[index] - (assumptions.campuses[index - 1] ?? 0), 0);
  const pilot = index === 1 ? assumptions.pilotBands : 0;
  return (newCampuses * assumptions.bandsPerNewCampus + pilot) * assumptions.bandUnitCost;
}

function buildMonths(): Month[] {
  let cash = 0;
  return assumptions.campuses.map((campuses, index) => {
    const attendeeEvents = campuses * assumptions.attendeeEventsPerCampusYear * assumptions.seasonality[index % 12];
    const revenue = attendeeEvents * assumptions.pricePerAttendeeEvent;
    const cogs = attendeeEvents * costPerAttendeeEvent;
    const budget = budgetFor(index);
    const sga = budget.team + budget.product + budget.sales + budget.legal;
    const fleet = fleetPurchase(index);
    const ebitda = revenue - cogs - sga;
    cash += ebitda - fleet + (index === 0 ? assumptions.raise : 0);
    return { index, year: firstYear + Math.floor(index / 12), campuses, revenue, cogs, ...budget, fleet, expenses: cogs + sga, ebitda, cash };
  });
}

export const months = buildMonths();

function sumOf(list: Month[], key: keyof Month) {
  return list.reduce((total, month) => total + (month[key] as number), 0);
}

export const years = [0, 1, 2].map((offset) => {
  const list = months.slice(offset * 12, offset * 12 + 12);
  return {
    year: firstYear + offset,
    revenue: sumOf(list, "revenue"),
    expenses: sumOf(list, "expenses"),
    ebitda: sumOf(list, "ebitda"),
    campusesAtEnd: list[list.length - 1].campuses,
    cashAtEnd: list[list.length - 1].cash,
  };
});

/** The first 24 months, which the raise pays for. */
const runway = months.slice(0, 24);

export const useOfFunds = {
  raise: assumptions.raise,
  categories: [
    { id: "team", label: "Team", detail: "Three founders, then our first engineer in 2028", amount: sumOf(runway, "team") },
    { id: "product", label: "Product", detail: "Firmware, FCC certification and cloud", amount: sumOf(runway, "product") },
    { id: "fleet", label: "Bands and event operations", detail: "A fleet of bands for every campus we sign", amount: sumOf(runway, "fleet") + sumOf(runway, "cogs") },
    { id: "sales", label: "Campus sales", detail: "Demo nights, travel and partnerships", amount: sumOf(runway, "sales") },
    { id: "legal", label: "Privacy and legal", detail: "Consent law review and insurance", amount: sumOf(runway, "legal") },
  ],
  revenueOverRunway: sumOf(runway, "revenue"),
  cashAtMilestone: runway[runway.length - 1].cash,
  lowestCash: Math.min(...months.map((month) => month.cash)),
  milestoneCampuses: runway[runway.length - 1].campuses,
  bandsInField: runway[runway.length - 1].campuses * assumptions.bandsPerNewCampus + assumptions.pilotBands,
};

export const totalSpendOverRunway = useOfFunds.categories.reduce((total, category) => total + category.amount, 0);

export function annualRunRate(campuses: number) {
  return campuses * assumptions.attendeeEventsPerCampusYear * assumptions.pricePerAttendeeEvent;
}

/** Months where revenue covers every cost, used to shade the chart. */
export const profitableMonths = months.filter((month) => month.ebitda > 0).map((month) => month.index);
