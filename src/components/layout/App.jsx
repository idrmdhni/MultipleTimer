import Header from "./Header";
import Main from "./Main";
import Form from "./Form";
import Wrapper from "./Wrapper";
import Timer from "../content/Timer";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [timers, setTimers] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Jika ini adalah render pertama...
    if (isInitialMount.current) {
      // Ubah nilainya menjadi false dan jangan lakukan apa-apa.
      isInitialMount.current = false;
    } else {
      // Untuk render selanjutnya (setelah data dimuat), baru jalankan logika ini.
      if (timers.length > 0) {
        localStorage.setItem("timers", JSON.stringify(timers));
      } else {
        localStorage.removeItem("timers");
      }
    }
  }, [timers]);

  useEffect(() => {
    const storedTimers = localStorage.getItem("timers");

    if (storedTimers) {
      const now = Date.now();

      setTimers(
        JSON.parse(storedTimers).map((timer) => {
          const elapsed = Math.floor((now - timer.startTime) / 1000);
          const remaining = timer.timerTime - elapsed;
          if (remaining > 0) {
            return { ...timer, startTime: now, timerTime: remaining };
          } else {
            return { ...timer, startTime: now, timerTime: 0 };
          }
        })
      );
    }
  }, []);

  function handleChangeHours(hours) {
    setHours(hours.replace(/[^0-9]/g, ""));
  }

  function handleChangeMinutes(minutes) {
    if (minutes.length <= 2) {
      const minutesFilter = minutes.replace(/[^0-9]/g, "");
      if (parseInt(minutesFilter) <= 60) {
        setMinutes(minutesFilter.toString());
      }
    }
  }

  function handleChangeSeconds(seconds) {
    if (seconds.length <= 2) {
      const secondsFilter = seconds.replace(/[^0-9]/g, "");
      if (parseInt(secondsFilter) <= 60) {
        setSeconds(secondsFilter.toString());
      }
    }
  }

  function handleIncrement(value, type) {
    switch (type) {
      case "hours": {
        let hours = parseInt(value, 10);
        if (isNaN(hours)) hours = 0;

        hours += 1;
        setHours(hours < 10 ? `0${hours}` : hours.toString());

        break;
      }
      case "minutes": {
        let minutes = parseInt(value, 10);
        if (isNaN(minutes)) minutes = 0;
        if (minutes < 59) {
          minutes += 1;
        } else {
          minutes = 0;
        }
        setMinutes(minutes < 10 ? `0${minutes}` : minutes.toString());
        break;
      }
      case "seconds": {
        let seconds = parseInt(value, 10);
        if (isNaN(seconds)) seconds = 0;
        if (seconds < 59) {
          seconds += 1;
        } else {
          seconds = 0;
        }
        setSeconds(seconds < 10 ? `0${seconds}` : seconds.toString());
        break;
      }
      default:
        break;
    }
  }

  function handleDecrement(value, type) {
    switch (type) {
      case "hours": {
        let hours = parseInt(value, 10);
        if (isNaN(hours)) hours = 0;
        if (hours > 0) {
          hours -= 1;
          setHours(hours < 10 ? `0${hours}` : hours.toString());
        }
        break;
      }
      case "minutes": {
        let minutes = parseInt(value, 10);
        if (isNaN(minutes)) minutes = 0;
        if (minutes > 0) {
          minutes -= 1;
        } else {
          minutes = 59;
        }
        setMinutes(minutes < 10 ? `0${minutes}` : minutes.toString());
        break;
      }
      case "seconds": {
        let seconds = parseInt(value, 10);
        if (isNaN(seconds)) seconds = 0;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
        }
        setSeconds(seconds < 10 ? `0${seconds}` : seconds.toString());
        break;
      }
      default:
        break;
    }
  }

  function handleAddTimer(timerName, hours, minutes, seconds) {
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    setTimers([
      ...timers,
      {
        timerId: Date.now(),
        startTime: Date.now(),
        timerName,
        timerTime: totalSeconds,
      },
    ]);

    setHours("00");
    setMinutes("00");
    setSeconds("00");
  }

  function handleDeleteTimer(id) {
    setTimers((prev) => prev.filter((timer) => timer.timerId != id));
  }

  return (
    <>
      <Header>
        <Form
          hours={hours}
          onChangeHours={handleChangeHours}
          minutes={minutes}
          onChangeMinutes={handleChangeMinutes}
          seconds={seconds}
          onChangeSeconds={handleChangeSeconds}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAddTimer={handleAddTimer}
        />
      </Header>
      <Main>
        {timers.map((timer) => (
          <Wrapper key={timer.timerId}>
            <Timer
              timer={timer}
              setTimers={setTimers}
              onDeleteTimer={handleDeleteTimer}
            />
          </Wrapper>
        ))}
      </Main>
    </>
  );
}

export default App;
