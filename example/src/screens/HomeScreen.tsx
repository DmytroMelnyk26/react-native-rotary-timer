import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface IExample {
  key: string;
  title: string;
  description: string;
}

interface IHomeScreenProps {
  examples: IExample[];
  onSelect: (key: string) => void;
}

export const HomeScreen = ({ examples, onSelect }: IHomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RotaryTimer Examples</Text>
      <Text style={styles.subtitle}>
        Tap an example to explore the library's capabilities
      </Text>
      <FlatList
        data={examples}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onSelect(item.key)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#6c757d',
    lineHeight: 18,
  },
});
