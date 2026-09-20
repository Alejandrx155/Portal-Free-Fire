import type { DeviceProfile, RefreshRate, SensitivityConfig } from "@/content/sensitivity-types";
import { POPULAR_DEVICES } from "@/content/sensitivity-types";
import { clamp } from "@/lib/utils";

export type CalibrationInput = {
  brand: string;
  model: string;
  screenSizeInches: number;
  refreshRateHz: RefreshRate;
  resolution?: { width: number; height: number };
};

export type CalibrationResult = {
  matched: boolean;
  source: "base-de-datos" | "calculo-matematico";
  profile?: DeviceProfile;
  config: SensitivityConfig;
  screenAreaInches: number;
};

const DEFAULT_RES = { width: 2400, height: 1080 };

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function screenArea(screenSizeInches: number, resolution?: { width: number; height: number }): number {
  const { width, height } = resolution ?? DEFAULT_RES;
  const ppi = Math.hypot(width, height) / screenSizeInches;
  return (width / ppi) * (height / ppi);
}

export function findDevice(brand: string, model: string): DeviceProfile | undefined {
  const b = norm(brand);
  const m = norm(model);
  const byModel = POPULAR_DEVICES.find((d) => m && norm(d.model).includes(m));
  if (byModel) return byModel;
  return POPULAR_DEVICES.find((d) => b && norm(d.brand).includes(b));
}

export function calibrate(input: CalibrationInput): CalibrationResult {
  const known = findDevice(input.brand, input.model);
  if (known) {
    return {
      matched: true,
      source: "base-de-datos",
      profile: known,
      config: known.config,
      screenAreaInches: screenArea(input.screenSizeInches, input.resolution),
    };
  }

  const { width, height } = input.resolution ?? DEFAULT_RES;
  const ppi = Math.hypot(width, height) / input.screenSizeInches;
  const area = (width / ppi) * (height / ppi);
  const isEmulator = input.screenSizeInches >= 12;

  const sizeMult = clamp(input.screenSizeInches / 6.5, 0.85, 1.2);
  const freqMult = clamp(1 + (60 - input.refreshRateHz) / 500, 0.85, 1.1);
  const base = 100 * sizeMult * freqMult * (isEmulator ? 1.08 : 1);
  const scopes = (mult: number) => clamp(Math.round(base * mult), 20, 100);

  const fireButtonSize = clamp(
    Math.round(80 + (input.screenSizeInches - 5.5) * 6 + (input.refreshRateHz >= 120 ? 3 : 0)),
    55,
    100
  );

  const recommendedDpi = isEmulator
    ? clamp(Math.round(800 + (input.screenSizeInches - 24) * 15), 600, 1600)
    : clamp(Math.round(360 + (input.refreshRateHz >= 120 ? 60 : 20) + (input.screenSizeInches - 6) * 40), 250, 600);

  return {
    matched: false,
    source: "calculo-matematico",
    config: {
      general: scopes(1),
      redDot: scopes(0.92),
      scope2x: scopes(0.78),
      scope4x: scopes(0.64),
      sniper: scopes(0.58),
      freeLook: scopes(0.9),
      fireButtonSize,
      recommendedDpi,
    },
    screenAreaInches: area,
  };
}