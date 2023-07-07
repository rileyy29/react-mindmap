const packages = require("./package.json");
const babel = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const { default: terser } = require("@rollup/plugin-terser");
const { default: resolve } = require("@rollup/plugin-node-resolve");

const envSetting = { modules: false };
const runtimeSetting = { runtime: "automatic" };

module.exports = {
    input: 'src/index.ts',
    output: {
        file: packages.main,
        format: 'esm',
        sourcemap: true
    },
    plugins: [
        resolve(),
        babel({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            babelHelpers: "runtime",
            plugins: [
                ['@babel/plugin-transform-react-jsx', runtimeSetting],
                "@babel/plugin-transform-runtime"
            ],
            presets: [
                ["@babel/preset-env", envSetting],
                ["@babel/preset-react", runtimeSetting],
                "@babel/preset-typescript",
            ],
        }),
        terser({
            format: { comments: false },
            compress: { passes: 2 }
        }),
        typescript({ outputToFilesystem: true })
    ],
    external: [...Object.keys(packages.dependencies), '@babel/runtime', 'react/jsx-runtime', 'react', 'react-dom']
};