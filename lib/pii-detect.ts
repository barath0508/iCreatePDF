export type PiiType = 'email' | 'phone' | 'ssn' | 'creditCard' | 'iban';

export interface PiiMatch {
  type: PiiType;
  start: number;
  end: number;
  value: string;
}

const PATTERNS: { type: PiiType; regex: RegExp }[] = [
  { type: 'email', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
  { type: 'ssn', regex: /\b\d{3}-\d{2}-\d{4}\b/g },
  { type: 'iban', regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g },
  // Phone: optional country code, then a 10-digit number split across 2-4 groups
  // with spaces/dots/dashes/parens; guarded so it doesn't match inside longer digit runs.
  { type: 'phone', regex: /(?<!\d)(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}(?!\d)/g },
  // Credit card candidate: 13-19 digits, optionally grouped in 4s with spaces/dashes.
  // Luhn-validated below to cut false positives before it's ever surfaced.
  { type: 'creditCard', regex: /(?<!\d)\d{4}[ -]?\d{4}[ -]?\d{3,7}[ -]?\d{0,4}(?!\d)/g },
];

function luhnValid(digits: string): boolean {
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

/**
 * Scan free text for common PII patterns (email, phone, SSN, credit card, IBAN).
 * Returns non-overlapping matches sorted by position — overlaps are resolved by
 * preferring the earliest-starting, then longest, match.
 */
export function detectPii(text: string): PiiMatch[] {
  const candidates: PiiMatch[] = [];

  for (const { type, regex } of PATTERNS) {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text))) {
      const value = m[0];
      if (type === 'creditCard') {
        const digitsOnly = value.replace(/[ -]/g, '');
        if (!luhnValid(digitsOnly)) continue;
      }
      candidates.push({ type, start: m.index, end: m.index + value.length, value });
      if (m[0].length === 0) regex.lastIndex++; // guard against zero-length matches
    }
  }

  candidates.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  const accepted: PiiMatch[] = [];
  let lastEnd = -1;
  for (const c of candidates) {
    if (c.start >= lastEnd) {
      accepted.push(c);
      lastEnd = c.end;
    }
  }

  return accepted;
}
