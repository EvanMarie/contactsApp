import React, { useState } from "react";
import {
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { InputStyles } from "~/style/myStyles";
import WidgetCard from "./widgetCard";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodoText, done: false }]);
    setNewTodoText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <WidgetCard title="To Do List" showButton={false}>
      <VStack spacing={4}>
        <HStack w="100%">
          <Input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add todo"
            {...InputStyles}
            maxW="300px"
          />
          <IconButton
            onClick={addTodo}
            icon={<AddIcon />}
            aria-label="Add todo"
            h="35px"
            w="35px"
          />
        </HStack>
        <VStack w="100%" spacing={1}>
          {todos.map((todo) => (
            <HStack key={todo.id} w="100%" justify="space-between">
              <HStack>
                <Checkbox
                  isChecked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <Text>{todo.text}</Text>
              </HStack>
              <IconButton
                onClick={() => deleteTodo(todo.id)}
                icon={<DeleteIcon />}
                aria-label="Delete todo"
                h="35px"
                w="35px"
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </WidgetCard>
  );
};

export default TodoList;
