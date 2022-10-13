export default function ButtonWithIcon({ title, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{title}</Text>
      {icon}
    </TouchableOpacity>
  );
}
