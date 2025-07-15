export default function TimeInput({ value, onChangeValue }) {
  return (
    <input
      type="text"
      className="outline-2 outline-[#2e4583] rounded p-1.5 my-0.5 text-[#a9aebb] duration-150 focus:outline-[#3e60c1] w-9 text-xl"
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
}
