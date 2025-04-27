export type Habit = {
  id: string;
  name: string;
  doneCount: number;
  isDoneToday: boolean;
};

export interface HabitListGroup {
  id: string;
  name: string;
  habits: Habit[];
}
