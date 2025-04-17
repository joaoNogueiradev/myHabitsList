import { Habit } from "@/types/habit";

type Props = {
  habits: Habit[];
};

const HabitList = ({ habits }: Props) => {
  return (
    <div className="w-full max-w-md mt-6 space-y-4">
      {habits.length === 0 ? (
        <p className="text-center text-gray-400">
          Nenhum hábito adicionado ainda.
        </p>
      ) : (
        habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <span className="text-lg font-medium text-gray-900">
              {habit.name}
            </span>
            <span className="text-sm text-gray-500">
              Feito: {habit.doneCount}x
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;
