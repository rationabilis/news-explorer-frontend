const presets = [
  [
    "@babel/env",
    {
      targets: {
            edge: "17",
            ie: "11",
            firefox: "50",
            chrome: "64",
            safari: "11.1",
            /* yandex: "19" */
      },
      useBuiltIns: "usage",
      corejs: "3.4.1",
      "targets": {
        "esmodules": true,
        "ie": "11"
      }
    }
  ],
];

module.exports = { presets };
