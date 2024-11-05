export type ConfigType = 
  | 'Aiden'
  | 'Aiden v2'
  | 'Bespoke with Aiden'
  | 'Bespoke without Aiden';

export interface SettingVisibility {
  id: string;
  isVisible: boolean;
}