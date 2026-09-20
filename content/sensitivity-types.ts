export type RefreshRate = 60 | 90 | 120 | 144;

export type SensitivityConfig = {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  fireButtonSize: number;
  recommendedDpi: number;
};

export type DeviceProfile = {
  id: string;
  brand: string;
  model: string;
  screenSizeInches: number;
  refreshRateHz: RefreshRate;
  config: SensitivityConfig;
};

export const REFRESH_RATES: RefreshRate[] = [60, 90, 120, 144];

const flagship: SensitivityConfig = {
  general: 100,
  redDot: 92,
  scope2x: 78,
  scope4x: 64,
  sniper: 58,
  freeLook: 90,
  fireButtonSize: 96,
  recommendedDpi: 460,
};

const mid: SensitivityConfig = {
  general: 98,
  redDot: 90,
  scope2x: 76,
  scope4x: 62,
  sniper: 56,
  freeLook: 88,
  fireButtonSize: 94,
  recommendedDpi: 430,
};

const budget: SensitivityConfig = {
  general: 96,
  redDot: 88,
  scope2x: 74,
  scope4x: 60,
  sniper: 54,
  freeLook: 86,
  fireButtonSize: 90,
  recommendedDpi: 400,
};

const emulator: SensitivityConfig = {
  general: 100,
  redDot: 94,
  scope2x: 80,
  scope4x: 66,
  sniper: 60,
  freeLook: 92,
  fireButtonSize: 100,
  recommendedDpi: 800,
};

export const POPULAR_DEVICES: DeviceProfile[] = [
  { id: "iphone-15-pro", brand: "Apple", model: "iPhone 15 Pro", screenSizeInches: 6.1, refreshRateHz: 120, config: flagship },
  { id: "iphone-13", brand: "Apple", model: "iPhone 13", screenSizeInches: 6.1, refreshRateHz: 60, config: budget },
  { id: "s24-ultra", brand: "Samsung", model: "Galaxy S24 Ultra", screenSizeInches: 6.8, refreshRateHz: 120, config: flagship },
  { id: "galaxy-a54", brand: "Samsung", model: "Galaxy A54", screenSizeInches: 6.4, refreshRateHz: 120, config: mid },
  { id: "xiaomi-14", brand: "Xiaomi", model: "Xiaomi 14", screenSizeInches: 6.36, refreshRateHz: 120, config: flagship },
  { id: "redmi-note-13-pro", brand: "Xiaomi", model: "Redmi Note 13 Pro", screenSizeInches: 6.67, refreshRateHz: 120, config: mid },
  { id: "poco-x6-pro", brand: "Poco", model: "X6 Pro", screenSizeInches: 6.67, refreshRateHz: 120, config: flagship },
  { id: "poco-f5", brand: "Poco", model: "F5", screenSizeInches: 6.67, refreshRateHz: 120, config: mid },
  { id: "tecno-camon-20", brand: "Tecno", model: "Camon 20", screenSizeInches: 6.67, refreshRateHz: 60, config: budget },
  { id: "infinix-note-30", brand: "Infinix", model: "Note 30", screenSizeInches: 6.78, refreshRateHz: 120, config: mid },
  { id: "moto-g84", brand: "Motorola", model: "Moto G84", screenSizeInches: 6.55, refreshRateHz: 120, config: mid },
  { id: "emulador-pc", brand: "Emulador PC", model: "BlueStacks / LDPlayer", screenSizeInches: 24, refreshRateHz: 144, config: emulator },
];