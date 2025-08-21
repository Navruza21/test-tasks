import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function Achievements() {
  const achievements = useSelector((state: RootState) => state.user.achievements);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-base md:text-2xl font-bold mb-4 text-center md:text-left"> Достижения </h1>

      {achievements.length === 0 ? (
        <p className="text-gray-500 text-center">Пока нет достижений</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a) => (
            <li
              key={a.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition bg-white"
            >
              <p className="font-semibold text-lg">{a.title}</p>
              <p className="text-gray-600 mt-1">{a.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
