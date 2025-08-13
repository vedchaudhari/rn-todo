import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'
import { Checkbox } from 'expo-checkbox'
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean
}

export default function Index() {

  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [oldTodo, setOldTodo] = useState<ToDoType[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        // await AsyncStorage.clear()
        const fetchedTodo = await AsyncStorage.getItem('my-todo');
        if (fetchedTodo) {
          setTodos(JSON.parse(fetchedTodo))
          setOldTodo(JSON.parse(fetchedTodo))
        }

      } catch (error) {
        console.log(error)
      }
    }

    loadTodos();
  }, [])

  const addTodo = async () => {
    try {
      if (todoText.trim() == "") {
        alert('Enter todo first');
        return;
      }

      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false
      }

      const updatedTodos = [newTodo, ...todos]
      setTodos(updatedTodos);
      setOldTodo(updatedTodos);
      await AsyncStorage.setItem('my-todo', JSON.stringify(updatedTodos));
      setTodoText('');
      Keyboard.dismiss();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const updatedTodos = todos.filter((item) => item.id != id);
      setTodos(updatedTodos);
      setOldTodo(updatedTodos)
      await AsyncStorage.setItem('my-todo', JSON.stringify(updatedTodos))
    } catch (error) {
      console.log(error);
    }
  }

  const handleIsDone = async (id: number) => {
    try {
      const updatedTodos = todos.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
      setTodos(updatedTodos);
      setOldTodo(updatedTodos);
      await AsyncStorage.setItem('my-todo', JSON.stringify(updatedTodos))

    } catch (error) {
      console.log(error)
    }
  }

  const onSearch = (query: string) => {
    if (!query.trim()) {
      setTodos(oldTodo)
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }

  }

  useEffect(() => {
    onSearch(searchText)
  }, [searchText])


  return (
    <SafeAreaView style={styles.container}>
      {/*Header*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { alert('Clicked') }}>
          <Ionicons name="menu" size={24} color={'#333'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8019/8019152.png' }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>

      </View>

      {/*Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.closeButton} onPress={() => setSearchText('')}>
          <Ionicons name="close" size={24} color={'#333'} />
        </TouchableOpacity>
      </View>

      {/*Todo list*/}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(
          ({ item }) =>
            <TodoItem item={item} deleteItem={deleteTodo} handleIsDone={handleIsDone} />
        )}
      />

      {/*Footer*/}
      <KeyboardAvoidingView style={styles.footer} behavior="padding" keyboardVerticalOffset={10}>
        <TextInput
          placeholder='Add New Todo'
          style={styles.newTodoInput}
          onChangeText={(text) => setTodoText(text)}
          value={todoText}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={'#fff'} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const TodoItem = ({ item, deleteItem, handleIsDone }
  : {
    item: ToDoType,
    deleteItem: (id: number) => void,
    handleIsDone: (id: number) => void
  }
) => (
  <View style={styles.todoInfoContainer}>
    {/* each item */}
    <View style={styles.todoContainer}>
      <Checkbox value={item.isDone} color={item.isDone ? '#4630EB' : 'black'} onValueChange={() => handleIsDone(item.id)} />
      <Text style={[
        styles.todoText,
        item.isDone && { textDecorationLine: 'line-through' }
      ]}>{item.title}</Text>
    </View>
    <TouchableOpacity onPress={() => {
      deleteItem(item.id);
      alert('Deleted ' + item.id)
    }}>
      <Ionicons name="trash" size={24} color={'red'} />
    </TouchableOpacity>
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  searchBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333'
  },
  todoInfoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  todoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333'
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    bottom: 20
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333'
  },
  addButton: {
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
  closeButton: {
    marginRight: 5
  }
})