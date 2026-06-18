export interface AlertItem {
  id: string;
  campaignId: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
}
