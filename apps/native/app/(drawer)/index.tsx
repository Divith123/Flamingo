import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { queryClient, trpc } from "@/utils/trpc";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const privateData = useQuery(trpc.privateData.queryOptions());
  const { data: session } = authClient.useSession();

  return (
    <Container>
      <ScrollView>
        <View style={styles.pageContainer}>
          <Text style={styles.headerTitle}>BETTER T STACK</Text>
          {session?.user ? (
            <View style={styles.sessionInfoCard}>
              <View style={styles.sessionUserRow}>
                <Text style={styles.welcomeText}>
                  Welcome,{" "}
                  <Text style={styles.userNameText}>{session.user.name}</Text>
                </Text>
              </View>
              <Text style={styles.emailText}>{session.user.email}</Text>

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
          ) : null}
          <View style={styles.apiStatusCard}>
            <Text style={styles.cardTitle}>API Status</Text>
            <View style={styles.apiStatusRow}>
              <View
                style={[
                  styles.statusIndicatorDot,
                  healthCheck.data
                    ? styles.statusIndicatorGreen
                    : styles.statusIndicatorRed,
                ]}
              />
              <Text style={styles.mutedText}>
                {healthCheck.isLoading
                  ? "Checking..."
                  : healthCheck.data
                    ? "Connected to API"
                    : "API Disconnected"}
              </Text>
            </View>
          </View>
          <View style={styles.privateDataCard}>
            <Text style={styles.cardTitle}>Private Data</Text>
            {privateData && (
              <View>
                <Text style={styles.mutedText}>
                  {privateData.data?.message}
                </Text>
              </View>
            )}
          </View>
          {!session?.user && (
            <>
              <SignIn />
              <SignUp />
            </>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  pageContainer: {
    paddingHorizontal: theme.spacing.sm,
  },
  headerTitle: {
    color: theme.colors.typography,
    fontSize: theme.fontSize["3xl"],
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
  },
  sessionInfoCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sessionUserRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  welcomeText: {
    color: theme.colors.typography,
    fontSize: theme.fontSize.base,
  },
  userNameText: {
    fontWeight: "500",
    color: theme.colors.typography,
  },
  emailText: {
    color: theme.colors.typography,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.md,
  },
  signOutButton: {
    backgroundColor: theme.colors.destructive,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignSelf: "flex-start",
  },
  signOutButtonText: {
    fontWeight: "500",
  },
  apiStatusCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  cardTitle: {
    marginBottom: theme.spacing.sm,
    fontWeight: "500",
    color: theme.colors.typography,
  },
  apiStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  statusIndicatorDot: {
    height: 12,
    width: 12,
    borderRadius: 9999,
  },
  statusIndicatorGreen: {
    backgroundColor: theme.colors.success,
  },
  statusIndicatorRed: {
    backgroundColor: theme.colors.destructive,
  },
  mutedText: {
    color: theme.colors.typography,
  },
  privateDataCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
}));
