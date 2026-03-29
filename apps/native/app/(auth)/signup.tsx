import { GithubIcon, GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { LobeIcon } from "@/components/LobeIcon";
import { authClient } from "@/lib/auth-client";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !name) return;
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        { email, password, name },
        {
          onSuccess: () => {
            router.replace("/verify-email");
          },
          onError: (ctx) => {
            const err = ctx.error as Error & { error?: { message?: string } };
            Alert.alert("Error", err.error?.message || "Sign up failed");
          },
        },
      );
    } finally {
      setIsLoading(false);
    }
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
        <View style={styles.container}>
          <View style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoRow}>
                <LobeIcon size={36} color="#FFFFFF" />
                <Text style={styles.logoText}>SIGN UP</Text>
              </View>
            </View>

            {/* Socials */}
            <View style={styles.socials}>
              <Pressable style={styles.socialButton}>
                <HugeiconsIcon icon={GoogleIcon} size={18} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>
                  Continue with Google
                </Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <HugeiconsIcon icon={GithubIcon} size={18} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>
                  Continue with GitHub
                </Text>
              </Pressable>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Inputs */}
            <View style={styles.inputs}>
              <View style={styles.field}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#838383"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#838383"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#838383"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable
                style={[
                  styles.submitButton,
                  isLoading && styles.disabledButton,
                ]}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitText}>CREATE ACCOUNT</Text>
                )}
              </Pressable>

              <View style={styles.footerRow}>
                <Text style={styles.forgotText}>Already have an account?</Text>
                <Pressable onPress={() => router.push("/login")}>
                  <Text style={styles.footerLink}>LOGIN</Text>
                </Pressable>
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
  container: {
    flex: 1,
    backgroundColor: "#2c3338",
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingVertical: 40,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
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
  socials: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 48,
    borderRadius: 4,
    backgroundColor: "#3c4656",
  },
  socialButtonText: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: "#FFFFFF",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#434a52",
  },
  dividerText: {
    fontFamily: theme.fonts.semibold,
    fontSize: 11,
    color: "#838383",
    letterSpacing: 0.5,
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
    gap: 20,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#008ef0",
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
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
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  forgotText: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: "#838383",
  },
  footerLink: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: "#008ef0",
  },
}));
