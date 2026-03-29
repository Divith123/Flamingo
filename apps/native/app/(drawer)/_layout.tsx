import {
  Book01Icon,
  File02Icon,
  Layers01Icon,
  Package01Icon,
  Settings02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useUnistyles } from "react-native-unistyles";

import { HeaderButton } from "../../components/header-button";

const DrawerLayout = () => {
  const { theme } = useUnistyles();

  const _iconColor = theme.colors.foreground;

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.foreground,
          fontFamily: theme.fonts.bold,
        },
        headerTintColor: theme.colors.foreground,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerLabelStyle: {
          color: theme.colors.foreground,
          fontFamily: theme.fonts.medium,
        },
        drawerInactiveTintColor: theme.colors.mutedForeground,
        drawerActiveBackgroundColor: `${theme.colors.accent}20`,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "Suite Home",
          drawerLabel: "Home",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={Book01Icon} size={size} color={color} />
          ),
        }}
      />

      {/* Flamingo Suite Modules */}
      <Drawer.Screen
        name="books"
        options={{
          headerTitle: "Books",
          drawerLabel: "Books",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={Book01Icon} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="expense"
        options={{
          headerTitle: "Expense",
          drawerLabel: "Expense",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={File02Icon} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="payroll"
        options={{
          headerTitle: "Payroll",
          drawerLabel: "Payroll",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={UserGroupIcon} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="inventory"
        options={{
          headerTitle: "Inventory",
          drawerLabel: "Inventory",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={Package01Icon} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="erp"
        options={{
          headerTitle: "ERP",
          drawerLabel: "ERP",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={Layers01Icon} size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: "Settings",
          drawerLabel: "Settings",
          drawerIcon: ({ size, color }) => (
            <HugeiconsIcon icon={Settings02Icon} size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
