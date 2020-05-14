const requireAll = requireContent => requireContent.keys().map(requireContent)

const reqContext = require.context('.', false, /\.svg$/)

requireAll(reqContext)