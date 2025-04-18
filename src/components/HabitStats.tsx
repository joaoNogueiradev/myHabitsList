import { Habit } from "@/types/habit";

type Props = {
  habits: Habit[];
};

const HabitStats = ({ habits }: Props) => {
  const total = habits.length;
  const done = habits.filter((h) => h.isDoneToday).length;
  const pending = total - done;

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4 flex justify-between mt-6 text-sm text-gray-700">
      <div className="text-center flex-1">
        <p className="font-medium text-gray-600">Total</p>
        <p className="text-lg font-semibold">{total}</p>
      </div>
      <div className="text-center flex-1">
        <p className="font-medium text-gray-600">Feitos hoje</p>
        <p className="text-lg font-semibold text-green-600">{done}</p>
      </div>
      <div className="text-center flex-1">
        <p className="font-medium text-gray-600">Pendentes</p>
        <p className="text-lg font-semibold text-red-500">{pending}</p>
      </div>
    </div>
  );
};

export default HabitStats;
