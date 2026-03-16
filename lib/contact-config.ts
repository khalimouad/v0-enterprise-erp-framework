// Configuration management for contact fields
export interface ContactConfig {
  industries: string[];
  regions: string[];
  cities: string[];
  countries: string[];
  statuses: string[];
  customFields: CustomField[];
}

export interface CustomField {
  id: string;
  name: string;
  type: "text" | "select" | "multiselect" | "date" | "number";
  options?: string[];
  required: boolean;
}

const DEFAULT_CONFIG: ContactConfig = {
  industries: [
    "Technologie",
    "Finance",
    "Vente au Détail",
    "Santé",
    "Fabrication",
    "Services",
    "Éducation",
    "Transports",
    "Autre"
  ],
  regions: [
    "Souss-Massa",
    "Marrakech-Safi",
    "Casablanca-Settat",
    "Fès-Meknès",
    "Tanger-Tétouan",
    "Rabat-Salé",
    "Béni Mellal-Khénifra",
    "Drâa-Tafilalet",
    "Guelmim-Oued Noun",
    "Laâyoune-Sakia El Hamra"
  ],
  cities: [
    "Agadir",
    "Marrakech",
    "Casablanca",
    "Fès",
    "Tanger",
    "Rabat",
    "Meknes",
    "Oujda",
    "Safi",
    "Essaouira"
  ],
  countries: [
    "Maroc",
    "Algérie",
    "Tunisie",
    "Libye",
    "Mauritanie",
    "France",
    "Espagne",
    "Belgique",
    "Pays-Bas",
    "Allemagne"
  ],
  statuses: [
    "Actif",
    "Inactif",
    "En Attente",
    "Prospect",
    "Archivé"
  ],
  customFields: []
};

export function getContactConfig(): ContactConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  
  try {
    const stored = localStorage.getItem("contact_config");
    return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
  } catch (error) {
    console.error("[v0] Error reading contact config:", error);
    return DEFAULT_CONFIG;
  }
}

export function saveContactConfig(config: ContactConfig): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("contact_config", JSON.stringify(config));
  } catch (error) {
    console.error("[v0] Error saving contact config:", error);
  }
}

export function addConfigItem(category: keyof Omit<ContactConfig, "customFields">, item: string): void {
  const config = getContactConfig();
  const list = config[category];
  
  if (Array.isArray(list) && !list.includes(item) && item.trim()) {
    list.push(item);
    saveContactConfig(config);
  }
}

export function removeConfigItem(category: keyof Omit<ContactConfig, "customFields">, item: string): void {
  const config = getContactConfig();
  const list = config[category];
  
  if (Array.isArray(list)) {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
      saveContactConfig(config);
    }
  }
}

export function addCustomField(field: CustomField): void {
  const config = getContactConfig();
  config.customFields.push(field);
  saveContactConfig(config);
}

export function removeCustomField(fieldId: string): void {
  const config = getContactConfig();
  config.customFields = config.customFields.filter(f => f.id !== fieldId);
  saveContactConfig(config);
}
