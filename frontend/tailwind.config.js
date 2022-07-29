const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const customColorsList = {
    bg: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        accent: 'var(--color-bg-accent)',
    },
    textAndOther: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
    }
}

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    corePlugins: {
        preflight: false,
    },
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: customColorsList.bg,
            borderColor: {...customColorsList.textAndOther},
            textColor: customColorsList.textAndOther,
            fill: customColorsList.textAndOther,
            borderWidth: {
                '0.5': '0.5px',
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            green: colors.green,
            purple: colors.purple,
            gray: colors.gray,
            red: colors.red,
            yellow: colors.amber,
            blue: colors.blue,
            sky: colors.sky,
            slate: colors.slate,
            indigo: colors.indigo,
            cyan: colors.cyan,
            'dark-primary': '#3D3C3F',
            'dark-gray': '#aaa',
            'gray-text': '#ACACAC',
            'dark-secondary': '#242426',
        },
    },
    plugins: [],
}