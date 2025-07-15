import TimeInput from "../ui/TimeInput";
import Input from "../ui/Input";
import { useState } from "react";

export default function Form({
  hours,
  onChangeHours,
  minutes,
  onChangeMinutes,
  seconds,
  onChangeSeconds,
  onIncrement,
  onDecrement,
  onAddTimer,
}) {
  const [timerName, setTimerName] = useState("");

  return (
    <div className="flex justify-center">
      <div className="pt-3 pb-5 px-5 bg-[#212a45] rounded-2xl flex  flex-col items-center shadow-lg">
        <h4 className="text-2xl text-[#a9aebb] font-medium mb-4">
          Input Timer
        </h4>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setTimerName("");
            onAddTimer(timerName, hours, minutes, seconds);
          }}
        >
          <div className="flex items-center flex-col">
            <Input timerName={timerName} setTimerName={setTimerName} />

            <div className="my-4 time-input flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <div
                  onClick={() => onIncrement(hours, "hours")}
                  className="border-t-4 border-l-4 p-2 rotate-45 border-[#2e4583] duration-150 hover:border-[#3e60c1] cursor-pointer"
                ></div>
                <TimeInput value={hours} onChangeValue={onChangeHours} />
                <div
                  onClick={() => onDecrement(hours, "hours")}
                  className="border-b-4 border-r-4 p-2 rotate-45 border-[#2e4583] duration-150 hover:border-[#3e60c1] cursor-pointer"
                ></div>
              </div>
              <span className="text-2xl text-[#a9aebb] font-medium mx-2">
                :
              </span>
              <div className="flex flex-col justify-center items-center">
                <div
                  onClick={() => onIncrement(minutes, "minutes")}
                  className="border-t-4 border-l-4 p-2 rotate-45 border-[#2e4583] duration-150 hover:border-[#3e60c1] cursor-pointer"
                ></div>
                <TimeInput value={minutes} onChangeValue={onChangeMinutes} />
                <div
                  onClick={() => onDecrement(minutes, "minutes")}
                  className="border-b-4 border-r-4 p-2 rotate-45 border-[#2e4583] duration-150 hover:border-[#3e60c1] cursor-pointer"
                ></div>
              </div>
              <span className="text-2xl text-[#a9aebb] font-medium mx-2">
                :
              </span>
              <div className="flex flex-col justify-center items-center">
                <div
                  onClick={() => onIncrement(seconds, "seconds")}
                  className="border-t-4 border-l-4 p-2 rotate-45 border-[#2e4583] duration-150 hover:border-[#3e60c1] cursor-pointer"
                ></div>
                <TimeInput value={seconds} onChangeValue={onChangeSeconds} />
                <div
                  onClick={() => onDecrement(seconds, "seconds")}
                  className="border-b-4 border-r-4 p-2 rotate-45 border-[#2e4583] duration-150 hover:border-[#3e60c1] cursor-pointer"
                ></div>
              </div>
            </div>

            <button className="text-xl py-2 px-4 bg-[#2e4583] text-[#a9aebb] rounded-2xl duration-150 hover:bg-[#3e60c1] hover:text-[#d4d7dd] active:bg-[#3e60c1] active:text-[#d4d7dd] cursor-pointer">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
