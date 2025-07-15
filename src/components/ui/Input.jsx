export default function Input({ timerName, setTimerName }) {
  return (
    <input
      type="text"
      className="outline-2 outline-[#2e4583] rounded p-1.5 text-[#a9aebb] duration-150 focus:outline-[#3e60c1] text-xl w-full"
      placeholder="Timer Name"
      value={timerName}
      onChange={(e) => setTimerName(e.target.value)}
    />
  );
}
