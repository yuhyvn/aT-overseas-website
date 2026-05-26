/**
 * Branch configuration
 * ---------------------------------------------
 * Single source of truth for the current overseas branch.
 * To adapt this platform for another aT overseas branch
 * (e.g. Los Angeles, Tokyo, Paris), update the values below.
 *
 * Components and pages should import from this file instead of
 * hard-coding branch-specific values.
 */

export interface BranchOfficeHours {
  weekday: string;
  weekend: string;
  responseTime: string;
}

export interface BranchInfo {
  /** Full legal name of the parent organization */
  organization: string;
  /** Short acronym for the parent organization */
  organizationShort: string;
  /** Branch / city name, e.g. "New York" */
  branchName: string;
  /** Display name used in headers/footers, e.g. "aT New York" */
  displayName: string;
  /** Short site tagline shown under the logo */
  tagline: string;
  /** Target market label, e.g. "U.S.", "Japan", "EU" */
  market: string;
  /** Street + city + postal address (multi-line ok via \n) */
  address: string;
  /** Public phone number in international format */
  phone: string;
  /** Public fax number */
  fax: string;
  /** Public contact email */
  email: string;
  /** Year the branch was established (used in copy) */
  establishedYear: number;
  officeHours: BranchOfficeHours;
}

export const branch: BranchInfo = {
  organization: "Korea Agro-Fisheries & Food Trade Corporation",
  organizationShort: "aT",
  branchName: "New York",
  displayName: "aT New York",
  tagline: "K-Food Trade Platform",
  market: "U.S.",
  address: "15 East 40th St., #701, New York, NY 10016, USA",
  phone: "(212) 889-2561",
  fax: "(212) 889-2080",
  email: "info@atcenterny.com",
  establishedYear: 1989,
  officeHours: {
    weekday: "9:00 – 18:00 ET",
    weekend: "Closed",
    responseTime: "Within 48 business hours",
  },
};
