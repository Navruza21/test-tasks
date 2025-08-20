import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function Achievements() {
  const achievements = useSelector((state: RootState) => state.user.achievements);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🏆 Achievements</h1>
      <ul className="space-y-2">
        {achievements.map(a => (
          <li key={a.id} className="border p-2 rounded-md shadow">
            <p className="font-semibold">{a.title}</p>
            <p>{a.description}</p>
            <span className="text-gray-500 text-sm">Desc: {a.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
