import { Mail01Icon as MailIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    // TODO: Implement verification logic
    setTimeout(() => {
      setIsLoading(false);
      router.push("/(drawer)");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center bg-[#2c3338] px-6 py-10">
          <View style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoRow}>
                <HugeiconsIcon icon={MailIcon} size={48} color="#FFFFFF" />
                <Text style={styles.logoText}>VERIFY EMAIL</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.description}>
                We've sent a 6-digit verification code to your email. Please
                enter it below to continue.
              </Text>

              <View style={styles.inputs}>
                <View style={styles.field}>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="000000"
                    placeholderTextColor="#838383"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    maxLength={6}
                    textAlign="center"
                  />
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={handleVerify}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>
                    {isLoading ? "VERIFYING..." : "VERIFY EMAIL"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.resendRow}>
                  <Text style={styles.resendText}>Didn't receive a code?</Text>
                  <TouchableOpacity>
                    <Text style={styles.footerLink}>RESEND</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.footerLinkCenter}>BACK TO LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#2c3338",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoText: {
    fontFamily: theme.fonts.bold,
    fontSize: 28,
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  content: {
    gap: 24,
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: "#c0c4cc",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  inputs: {
    gap: 16,
    alignItems: "center",
  },
  field: {
    width: "100%",
    maxWidth: 240,
  },
  otpInput: {
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    color: "#FFFFFF",
    height: 64,
    borderRadius: 4,
    backgroundColor: "#3c4656",
    letterSpacing: 8,
  },
  actions: {
    gap: 20,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#008ef0",
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  resendText: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: "#838383",
  },
  footerLink: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: "#008ef0",
  },
  footerLinkCenter: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: "#008ef0",
    textAlign: "center",
    marginTop: 10,
  },
}));
