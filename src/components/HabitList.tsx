import { Habit } from "@/types/habit";

type Props = {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
};

const HabitList = ({ habits, onToggleHabit, onDeleteHabit }: Props) => {
  // Separa os hábitos entre pendentes e feitos
  const doneHabits = habits.filter((h) => h.isDoneToday);
  const pendingHabits = habits.filter((h) => !h.isDoneToday);

  return (
    <div className="w-full max-w-md mt-6 space-y-6">
      {/* Hábitos Pendentes */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          📋 Pendentes
        </h2>
        {pendingHabits.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum hábito pendente!</p>
        ) : (
          pendingHabits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white p-4 rounded-xl shadow flex items-center justify-between transition-shadow hover:shadow-md"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={habit.isDoneToday}
                onChange={() => onToggleHabit(habit.id)}
                className="w-5 h-5 accent-black mr-4"
              />

              {/* Nome e contador */}
              <div className="flex-1">
                <p
                  className={`text-base font-medium ${
                    habit.isDoneToday
                      ? "text-gray-400 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {habit.name}
                </p>
                <p className="text-sm text-gray-500">
                  Feito: {habit.doneCount}x
                </p>
              </div>

              {/* Botão de deletar hábito */}
              <button
                onClick={() => onDeleteHabit(habit.id)}
                className="text-red-400 hover:text-red-600 text-sm ml-2 cursor-pointer"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Hábitos Feitos */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          ✅ Feitos hoje
        </h2>
        {doneHabits.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Nenhum hábito concluído ainda.
          </p>
        ) : (
          doneHabits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white p-4 rounded-xl shadow flex items-center justify-between transition-shadow duration-200 hover:shadow-md"
            >
              <input
                type="checkbox"
                checked={habit.isDoneToday}
                onChange={() => onToggleHabit(habit.id)}
                className="w-5 h-5 accent-black mr-4"
              />

              <div className="flex-1">
                <p
                  className={`text-base font-medium ${
                    habit.isDoneToday
                      ? "text-gray-400 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {habit.name}
                </p>
                <p className="text-sm text-gray-500">
                  Feito: {habit.doneCount}x
                </p>
              </div>
              <button
                onClick={() => onDeleteHabit(habit.id)}
                className="text-red-400 hover:text-red-600 text-sm ml-2 cursor-pointer"
              >
                🗑️
              </button>
            </div>
          ))
        )}
        
      </div>
      
    </div>
  );
};

export default HabitList;
