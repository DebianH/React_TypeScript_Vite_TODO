import { useRef, useState } from "react";
import "./App.css";

type FoEl = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const onInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (ev: FoEl) => {
    ev.preventDefault();
    console.log("enviando...");
    addTask(newTask);
    setNewTask("");
    onInput.current?.focus();
  };
  const validate = (name: string) => {
    if (newTask.length < 4) return "Add task";
  };
  const ErrorMessage = () => {
    if (validate(newTask)) return true;
    else return false;
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control pt-1 pb-1 "
                  onChange={(ev) => setNewTask(ev.target.value)}
                  value={newTask}
                  placeholder="Add Task"
                  ref={onInput}
                  autoFocus
                />
                <button
                  className="btn btn-outline-primary btn-sm mt-3 px-5"
                  disabled={ErrorMessage()}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {tasks.map((t: ITask, i: number) => (
          <div className="col-sm-4" key={i}>
            <div className="card">
              <div className="card-body">
                <h5
                  className={`card-title ${t.done === true ? "letters" : ""}`}
                >
                  {t.name}
                </h5>
                <button
                  className="btn btn-outline-info btn-sm  mt-2 px-3"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-outline-danger btn-sm px-1 pt-0 yes"
                  onClick={() => removeTask(i)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
