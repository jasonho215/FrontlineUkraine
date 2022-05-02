import { CategoryEnum, ClusterColorStep } from './type';
import { PpeTypeEnum } from '../../models/ppeType';
import { LngLatBoundsLike } from 'mapbox-gl';

export const CATEGORIES: CategoryEnum[] = [
  CategoryEnum.Need,
  CategoryEnum.NeedMet,
  CategoryEnum.Supply,
];

export const CLUSTER_COLORS: Record<string, ClusterColorStep> = {
  needs: {
    small: {
      outer: 'rgb(241, 211, 87)',
      inner: 'rgb(240, 194, 12)',
    },
    medium: {
      outer: 'rgb(253, 156, 115)',
      inner: 'rgb(241, 128, 23)',
    },
    large: {
      outer: 'rgb(165, 26, 26)',
      inner: 'rgb(165, 26, 26)',
    },
  },
  needs_met: {
    small: {
      outer: 'rgb(0, 127, 255)',
      inner: 'rgb(0, 101, 204)',
    },

    medium: {
      outer: 'rgb(81, 129, 179)',
      inner: 'rgb(94, 94, 255)',
    },

    large: {
      outer: 'rgb(94, 94, 255)',
      inner: 'rgb(25, 25, 255)',
    },
  },
  supplies: {
    small: {
      outer: 'rgb(181, 226, 140)',
      inner: 'rgb(110, 204, 57)',
    },

    medium: {
      outer: 'rgb(73, 186, 74)',
      inner: 'rgb(55, 177, 82)',
    },

    large: {
      outer: 'rgb(0, 150, 107)',
      inner: 'rgb(13, 118, 88)',
    },
  },
};

export const POINT_COLORS: Record<CategoryEnum, string> = {
  [CategoryEnum.Need]: '#A51A1A',
  [CategoryEnum.NeedMet]: '#0065cc',
  [CategoryEnum.Supply]: '#00966B',
};

export const CATEGORY_NAME: Record<CategoryEnum, string> = {
  [CategoryEnum.Need]: 'Needs',
  [CategoryEnum.NeedMet]: 'Needs Met',
  [CategoryEnum.Supply]: 'Supplies',
};

export const PPE_TYPE_COLOR: Record<PpeTypeEnum, string> = {
  // Domestic - Sanitary
  [PpeTypeEnum.DomesticSanitaryBreastPads]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryHairbrushes]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryLiquidSoap]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryNappies]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryOther]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryPocketTissues]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitarySanitaryTowels]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryShavingGelRazors]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryToiletPaper]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryToothbrushes]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryToothpaste]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryTowels]: '#FFDA00',
  [PpeTypeEnum.DomesticSanitaryWetWipes]: '#FFDA00',
  // Domestic - Non-perishable food/ drinks
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood]: '#FFDA00',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood]: '#FFDA00',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood]: '#FFDA00',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks]: '#FFDA00',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood]: '#FFDA00',
  [PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars]: '#FFDA00',
  // Domestic - Other basic/ shelter
  [PpeTypeEnum.DomesticOtherBinBags]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherBootDriers]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherCookingStoves]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherDisposableTableware]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherElectricityGenerators]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherFoilSurvivalBlankets]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherHotWaterBottles]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherInsulatedFlasks]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherOther]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherSleepingBags]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherThermalClothingNew]: '#FFDA00',
  [PpeTypeEnum.DomesticOtherTorches]: '#FFDA00',
  // (Non-drug) Medical Supplies - Medical equipments
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit]: '#FFDA00',
  // (Non-drug) Medical Supplies - Consumables
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter]: '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges]: '#FFDA00',
  // (Non-drug) Medical Supplies - Surgical instruments and fixators
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval]:
    '#FFDA00',
  [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows]:
    '#FFDA00',
  // (Non-drug) Medical Supplies - PPE
  // Blues
  [PpeTypeEnum.TypeIIRSurgicalMasks]: '#A0C7E1',
  [PpeTypeEnum.FFP1RespiratorMasks]: '#4C80B6',
  [PpeTypeEnum.FFP2RespiratorMasks]: '#0C4C96',
  [PpeTypeEnum.FFP3RespiratorMasks]: '#20254B',
  // Greens
  [PpeTypeEnum.Gowns]: '#64AE3F',
  [PpeTypeEnum.Aprons]: '#21652D',
  [PpeTypeEnum.Gloves]: '#71C2AC',
  [PpeTypeEnum.Scrubs]: '#00966B',
  // Purples
  [PpeTypeEnum.SafetyGlasses]: '#9388AA',
  [PpeTypeEnum.FaceVisors]: '#4B3F72',
  [PpeTypeEnum.AlcoholHandGel]: '#54243C',
  //Grey
  [PpeTypeEnum.Other]: '#706F6F',
};

// Include UK and Ukraine
// Type: [sw, ne]
export const DEFAULT_MAP_BOUNDS: LngLatBoundsLike = [
  {
    lng: -15.153077355573117,
    lat: 34.13695366955437,
  },
  {
    lng: 73.8317035268714,
    lat: 59.72912564207206,
  },
];
