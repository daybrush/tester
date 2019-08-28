const karmaConfig = {
    frameworks: ["mocha", "chai", "karma-typescript"],
    mime: {
        'text/x-typescript': ['ts', 'tsx']
    },
    client: {
        mocha: {
            opts: "./mocha.opts",
        },
    },
    files: [
        "src/**/*.ts",
        "src/**/*.tsx",
        "./test/**/*.ts",
    ],
    preprocessors: {
        "src/**/*.ts": ["karma-typescript"],
        "src/**/*.tsx": ["karma-typescript"],
        "test/**/*.ts": ["karma-typescript"],
    },
    karmaTypescriptConfig: {
        tsconfig: "./tsconfig.test.json",
        reports: {
            html: {
                "directory": "coverage",
                "subdirectory": "./"
            },
            lcovonly: {
                "directory": "coverage",
                "filename": "lcov.info",
                "subdirectory": "."
            },
        },
        coverageOptions: {
            instrumentation: true,
            exclude: /test/i,
        },
    },
    browsers: [],
    customLaunchers: {
        CustomChromeHeadless: {
            base: "ChromeHeadless",
            flags: ["--window-size=400,300", "--no-sandbox", "--disable-setuid-sandbox"],
        },
    },
    reporters: ["mocha"],
};


exports.setFiles = function (list) {
    karmaConfig.files = list;
    const preprocessors = {};

    list.forEach(file => {
        preprocessors[file] = ["karma-typescript"];
    })
    karmaConfig.preprocessors = preprocessors;
}
exports.setConfig = function (callback) {
    callback(karmaConfig);
}
exports.karmaConfig = function (config) {
    karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

    if (config.coverage) {
        karmaConfig.reporters.push("karma-typescript");
        karmaConfig.singleRun = true;
    }

    config.set(karmaConfig);
};
