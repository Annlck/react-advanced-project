import { useEffect, useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export function ColorModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = theme ?? resolvedTheme;
  const isActive = (mode) => {
    return current === mode;
  };

  return (
    <Button
      size={{ base: "xs", md: "sm" }}
      onClick={() => (isActive("light") ? setTheme("dark") : setTheme("light"))}
    >
      {isActive("light") ? <LuMoon /> : <LuSun />}
      <Text hideBelow="md">
        {isActive("light") ? "Dark mode" : "Light mode"}
      </Text>
    </Button>
  );
}
