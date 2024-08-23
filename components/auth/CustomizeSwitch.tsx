import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";

interface CustomSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const CustomizeSwitch: React.FC<CustomSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[isOn ? styles.switchOn : styles.switchOff]}
      className="w-[45px] h-[28px] rounded-[15px] p-[3px] justify-center"
      testID="custom-switch"
    >
      <View
        style={[styles.switchThumb, isOn ? styles.thumbOn : styles.thumbOff]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchOn: {
    backgroundColor: "#000000",
  },
  switchOff: {
    backgroundColor: "#d4d6da",
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  thumbOn: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  thumbOff: {
    backgroundColor: "#f4f3f4",
    alignSelf: "flex-start",
  },
});

export default CustomizeSwitch;
