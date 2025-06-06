import tailwindCSSAnimate from "tailwindcss-animate";
import tailwindCSSTypography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				red: {
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
					950: "#450a0a",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["var(--font-noto-sans)"],
				serif: ["var(--font-noto-serif)"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontSize: {
				// Add missing line height
				"5xl": ["3rem", "3.25rem"],
				"6xl": ["3.75rem", "4.25rem"],
				"7xl": ["4.5rem", "5rem"],
				"8xl": ["6rem", "6.75rem"],
				"9xl": ["8rem", "9rem"],
			},
		},
	},
	plugins: [
		tailwindCSSAnimate,
		tailwindCSSTypography,

		// https://github.com/tailwindlabs/tailwindcss/discussions/5541
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					"auto-fill": value => ({ gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))` }),
					"auto-fit": value => ({ gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))` }),
				},
				{ values: theme("width", {}) },
			);
		}),
	],
} satisfies Config;
