import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
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
    <IconButton
      size={{ base: "xs", md: "sm" }}
      onClick={() => (isActive("light") ? setTheme("dark") : setTheme("light"))}
      colorPalette="blue"
      variant="ghost"
      color="white"
    >
      {isActive("light") ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
}
