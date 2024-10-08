module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust this based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dim",
      "dark",
      "cupcake",
      {
        light: {
          primary: "#c79b53",
          secondary: "#ddc3ae",
          accent: "#38230f",
          neutral: "#e5e7eb",
          "base-100": "#f9f6ee",
          info: "#0369a1",
          success: "#00ff00",
          warning: "#fecaca",
          error: "#ff0000",
        },
      },
    ],
  },
};
