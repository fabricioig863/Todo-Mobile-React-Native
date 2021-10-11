import React, { useState} from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert('Tak já cadastrada', ' Você não pode cadastrar uma task com o mesmo nome')
    }
    

    const NewTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, NewTask])
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }))
     
    const foundItem = updateTasks.find(item => item.id === id)

    if(!foundItem) {
      return;
    }

    foundItem.done = !foundItem.done;
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item ', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);

          setTasks(updatedTasks)
        }
      }
       
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs ) {
    const updateTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updateTasks.find(task => task.id === task.id)

    if (!taskToBeUpdated)
    return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updateTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})