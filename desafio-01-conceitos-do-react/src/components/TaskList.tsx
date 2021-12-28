import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function getId() {
    return Math.floor(Date.now() * Math.random());
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle) {
      const id = getId();
      const newTask = {
        id,
        title: newTaskTitle,
        isComplete: false
      }
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map( task => task.id === id ? { ...task, isComplete: !task.isComplete } : task);
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTasks = tasks.filter( task => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2 id="task-list-title">Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button 
            type="submit"
            data-testid="add-task-button" 
            onClick={handleCreateNewTask}
            aria-label="Adicionar tarefa"
          >
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul role="group" aria-labelledby="task-list-title">
          {tasks.map(task => (
            <li key={task.id}>
              <div 
                className={task.isComplete ? 'completed' : ''} 
                data-testid="task" 
                role="checkbox" 
                aria-checked={task.isComplete}
              >
                <label className="checkbox-container" >
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                    tabIndex={-1}
                  />
                  <span 
                    className="checkmark"
                    tabIndex={0} 
                    aria-labelledby={`task-title-${task.id}`}
                  >
                  </span>
                </label>
                <p id={`task-title-${task.id}`}>{task.title}</p>
              </div>

              <button 
                type="button" 
                data-testid="remove-task-button" 
                onClick={() => handleRemoveTask(task.id)}
                aria-label={`Remover tarefa ${task.title}`}
              >
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}