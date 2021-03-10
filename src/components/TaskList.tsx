import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { isCompositeComponent } from 'react-dom/test-utils';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if(!newTaskTitle) return;

    // ESTADO TEMPORÁRIO PARA CRIAÇÃO DA TASK
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    
    // oldState são os dados antigos, com Sprad ele apenas adicionará nossa novatask
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('')
    
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number){
    // FAÇO UM MAP PASSANDO POR TODAS AS TASKS
    //VERIFICO SE O ID DA TASK É IGUAL AO ID PASSADO,
    // SE FOR, EU FAÇO UM SPRED QUE PEGA TODOS OS VALORES ANTIGO DA TASK
    //ALTERO SOMENTE A PROPRIEDADE DESEJADA NEGANDO ELA MESMA, OU SEJA SE ELA FOR TRUE VAI PRA FALSE
    //CASO NÃO SEJA IGUAL AO ID EU PASSO ELA DA FORMA ORIGINAL
    const filterComplete = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task )

    setTasks(filterComplete)
    
    



    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    // UMA VARIAVEL QUE IRÁ CONTER O RESULTADO DO FILTRO
    //FILTRO TASKS COM O FILTER
    //MONTA UM ARRAY COM TODOS OS ID DIFERENTE DO ID CLICADO
    const filterTask = tasks.filter(task => task.id !== id)
    
    //EU RECRIO O ARRAY DE TASKS COM OS ID RETORNADOS
    setTasks(filterTask)
    // Remova uma task da listagem pelo ID
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}