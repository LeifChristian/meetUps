import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryList = ({ categories, onCategorySelect }) => {
  return (
    <View style={styles.container}>
    {categories.map((category) => (
  <TouchableOpacity key={category.key} onPress={() => onCategorySelect(category)} style={{margin: 'auto'}}>
    <View style={{ backgroundColor: category.color, marginLeft: '5%', marginTop: 10, padding: 10, borderRadius: 5, textAlign: 'center' }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{category.label}</Text>

    </View>
  </TouchableOpacity>
))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // add this line
  },
  categoryItem: {
    flex: 1,
    margin: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  categoryText: {
    fontSize: 14,
  },
});


export default CategoryList;
