import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'
import { Checkbox } from 'expo-checkbox'
export default function Index() {

  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];


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
          clearButtonMode="always"
        />
      </View>

      {/*Todo list*/}
      <FlatList
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(
          ({ item }) =>
            <View style={styles.todoInfoContainer}>
              {/* each item */}
              <View style={styles.todoContainer}>
                <Checkbox value={item.isDone} />
                <Text style={[
                  styles.todoText,
                  item.isDone && { textDecorationLine: 'line-through' }
                ]}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => alert('Deleted ' + item.id)}>
                <Ionicons name="trash" size={24} color={'red'} />
              </TouchableOpacity>
            </View>
        )}
      />

      {/*Footer*/}
      <View style={styles.footer}>
        <TextInput placeholder='Add New Todo' style={styles.newTodoInput} />
        <TouchableOpacity style={styles.addButton} onPress={() => { }}>
          <Ionicons name="add" size={24} color={'#333'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}


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
    marginBottom: 10
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    backgroundColor: '#4630EB',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20
  }
})