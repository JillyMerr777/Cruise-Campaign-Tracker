export interface LifecycleStage {
  name: string;
  status: 'Complete' | 'In Progress' | 'Pending';
  owner?: string;
  dueDate?: string;
}

export interface CampaignLifecycle {
  campaignId: string;
  stages: LifecycleStage[];
}
