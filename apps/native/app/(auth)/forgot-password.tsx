import {
  Tick01Icon as CheckIcon,
  Mail01Icon as MailIcon,
} from "@hugeicons/core-free-icons";
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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetRequest = async () => {
    setIsLoading(true);
    // TODO: Implement password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
                <Text style={styles.logoText}>RECOVERY</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {!isSubmitted ? (
                <>
                  <Text style={styles.description}>
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </Text>

                  <View style={styles.inputs}>
                    <View style={styles.field}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#838383"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        isLoading && styles.disabledButton,
                      ]}
                      onPress={handleResetRequest}
                      disabled={isLoading}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.submitText}>
                        {isLoading ? "SENDING..." : "SEND RESET LINK"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/login")}>
                      <Text style={styles.footerLinkCenter}>BACK TO LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View style={styles.successContainer}>
                  <View style={styles.successCircle}>
                    <HugeiconsIcon icon={CheckIcon} size={32} color="#FFFFFF" />
                  </View>
                  <Text style={styles.successTitle}>Check your email</Text>
                  <Text style={styles.successDescription}>
                    We've sent a password reset link to {email}.
                  </Text>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => router.push("/login")}
                  >
                    <Text style={styles.submitText}>BACK TO LOGIN</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  },
  field: {
    gap: 8,
  },
  input: {
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: "#FFFFFF",
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: "#3c4656",
  },
  actions: {
    gap: 24,
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
  footerLinkCenter: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: "#008ef0",
    textAlign: "center",
  },
  successContainer: {
    alignItems: "center",
    gap: 20,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#008ef0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  successTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    color: "#FFFFFF",
  },
  successDescription: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: "#c0c4cc",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
}));
