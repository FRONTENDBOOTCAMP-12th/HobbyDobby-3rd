export interface AchievementCardProps {
  id: string;
  name: string | null;
  type?: string | null;
  level: number;
  current: number;
  total: number;
  description: string;
  isMax: boolean;
  onReward: () => void;
}
