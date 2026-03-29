import {
  GithubIcon,
  GoogleIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { LobeIcon } from "@/components/LobeIcon";
import { authClient } from "@/lib/auth-client";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    try {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            router.replace("/(drawer)/(tabs)");
          },
          onError: (ctx) => {
            const err = ctx.error as Error & { error?: { message?: string } };
            Alert.alert("Error", err.error?.message || "Sign in failed");
          },
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <LobeIcon size={36} color="#FFFFFF" />
              <Text style={styles.logoText}>LOGIN</Text>
            </View>
          </View>

          {/* Socials */}
          <View style={styles.socials}>
            <Pressable style={styles.socialButton}>
              <HugeiconsIcon icon={GoogleIcon} size={18} color="#FFFFFF" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <HugeiconsIcon icon={GithubIcon} size={18} color="#FFFFFF" />
              <Text style={styles.socialButtonText}>Continue with GitHub</Text>
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
                placeholder="Username (Email)"
                placeholderTextColor="#838383"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.field}>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#838383"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    size={18}
                    color="#838383"
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.submitButton, isLoading && styles.disabledButton]}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitText}>SUBMIT</Text>
              )}
            </Pressable>

            <View style={styles.footerRow}>
              <Pressable onPress={() => router.push("/forgot-password")}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
              <Pressable onPress={() => router.push("/signup")}>
                <Text style={styles.footerLink}>Sign up now</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 4,
    backgroundColor: "#3c4656",
  },
  passwordInput: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: "#FFFFFF",
    paddingHorizontal: 16,
  },
  eyeIcon: {
    paddingHorizontal: 12,
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
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
