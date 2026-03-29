import {
  ArrowRight01Icon as ArrowRight,
  Shield01Icon as ShieldIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/trpc";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroContainer}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>v1.0 is here</Text>
          </View>

          <View style={styles.brandRow}>
            <HugeiconsIcon icon={ZapIcon} size={48} color="#008ef0" />
            <Text style={styles.heroTitle}>FLAMINGO</Text>
          </View>

          <Text style={styles.heroSubtitle}>
            The ultimate tool for modern goal setting and execution.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              if (session) {
                // Navigate to dashboard or similar
              }
            }}
          >
            <Text style={styles.primaryButtonText}>
              {session ? "Enter Dashboard" : "Get Started"}
            </Text>
            <HugeiconsIcon icon={ArrowRight} size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <HugeiconsIcon icon={ZapIcon} size={24} color="#008ef0" />
            </View>
            <Text style={styles.featureTitle}>Fast & Fluid</Text>
            <Text style={styles.featureDescription}>
              Experience seamless interactions with our optimized mobile core.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <HugeiconsIcon icon={ShieldIcon} size={24} color="#008ef0" />
            </View>
            <Text style={styles.featureTitle}>Secure</Text>
            <Text style={styles.featureDescription}>
              Your data is protected by industry leading security standards.
            </Text>
          </View>
        </View>

        {session?.user && (
          <View style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>Logged in as</Text>
            <Text style={styles.sessionUser}>{session.user.name}</Text>
            <Text style={styles.sessionEmail}>{session.user.email}</Text>

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => {
                authClient.signOut();
                queryClient.invalidateQueries();
              }}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  heroContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.muted,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#008ef0",
    marginRight: theme.spacing.xs,
  },
  badgeText: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    fontWeight: "500",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  heroTitle: {
    color: theme.colors.typography,
    fontSize: theme.fontSize["4xl"],
    fontFamily: "Gabarito",
    fontWeight: "800",
    letterSpacing: -1,
  },
  heroSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.base,
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
  },
  primaryButton: {
    backgroundColor: "#008ef0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    width: "100%",
    shadowColor: "#008ef0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: theme.fontSize.base,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  featuresContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  featureCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(0, 142, 240, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  featureTitle: {
    color: theme.colors.typography,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.sm,
    lineHeight: 20,
  },
  sessionCard: {
    marginTop: theme.spacing.xl,
    marginHorizontal: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    alignItems: "center",
  },
  sessionTitle: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  sessionUser: {
    color: theme.colors.typography,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  sessionEmail: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.md,
  },
  signOutButton: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  signOutButtonText: {
    color: "#EF4444",
    fontWeight: "600",
  },
}));
