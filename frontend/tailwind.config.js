const flowbite = require("flowbite-react/tailwind")

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        flowbite.content(),
    ],
    theme: {},
    plugins: [
        require('@tailwindcss/forms'),
        flowbite.plugin(),
    ],
}