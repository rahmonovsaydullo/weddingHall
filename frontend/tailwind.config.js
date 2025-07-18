// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          "fade-in": "fadeIn 1s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        },
      },
    },
  };
  