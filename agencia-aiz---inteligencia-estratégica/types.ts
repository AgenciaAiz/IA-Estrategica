
export interface StrategicPerspective {
  perspective_id: number;
  title: string;
  layer1_strategy: string;
  layer2_tactics: string;
  layer3_actions: string;
}

export interface Report {
  id: number;
  topic: string;
  perspectives: StrategicPerspective[];
  date: string;
}
