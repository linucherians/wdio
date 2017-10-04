/* 
* Author: Linu Cherian
* Initial wdio.conf.js
*/

// var selenium = require('selenium-standalone');
// var seleniumServer;
var path = require('path');

var VisualRegressionCompare = require('wdio-visual-regression-service/compare');
 
function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
 
    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}.png`);
  };
}

exports.config = {
  //user: 'webdriverio',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
       './test/specs/test1.js'
  ],
  suites: {
    testFolder: [
      //'./test/specs/test2.js' //,
    ],
    otherFeature: [
      // ...
    ]
  },
  // Patterns to exclude.
  exclude: [
      // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instance available you can make sure that not more than
    // 5 instance gets started at a time.
    browserName: 'chrome'
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  // sync: false,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: './screenshots/errorShots/',
  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
      misMatchTolerance: 0.01,
    }),
    viewportChangePause: 300,
    widths: [320, 480, 640, 1024],
    orientations: ['landscape', 'portrait'],
  },
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: 'https://get.aol.com/',
  //
  // Default timeout for all waitFor* commands.
  // Timeout in ms where the first number represents seconds
  waitforTimeout: (30 * 1000),
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  // Timeout in ms where the first number represents seconds
  connectionRetryTimeout: (90 * 1000),
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  plugins: {
  //   webdrivercss: {
  //     screenshotRoot: 'my-shots',
  //       failedComparisonsRoot: 'diffs',
  //       misMatchTolerance: 0.05,
  //       screenWidth: [320,480,640,1024]
  //   },
  //   webdriverrtc: {},
  //   browserevent: {},
  'wdio-screenshot': {}
  },
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['visual-regression','selenium-standalone'],//
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['dot', 'allure'],
  reporterOptions: {
    allure: {}
  },
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  // Timeout value in ms where the first number represents minutes
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: (5 * 60 * 1000)
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  // Gets executed once before all workers get launched.
  // onPrepare: function() {
  //   return new Promise((resolve, reject) => {
  //     selenium.start((err, process) => {
  //       if(err) {
  //         return reject(err);
  //       }
  //       seleniumServer = process;
  //       resolve(process);
  //     })
  //   });
  // },
  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  before: function (capabilities, specs) {
    var chai = require('chai');
    global.fs = require('fs');
    global.expect = chai.expect;
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    global.common = require('../lib/common.js');
    global.username;
    global.password;

    // const Resembler = require('../lib/Resembler');
    // const resemble = new Resembler();

    // browser.addCommand("assertElementLayout", function async (rootdir, fullscreen, fileName, selector, threshold) {
    //   return browser.waitUntil(() => resemble.assertElementLayout(rootdir, fullscreen, fileName, selector, threshold), 55000, "Promise wasn't returned within 60 seconds", 65000);
    // });
  },
  //
  // Hook that gets executed before the suite starts
  // beforeSuite: function (suite) {
  // },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  // beforeHook: function () {
  //     var url;
  //    return url = browser.url('https://qa.subscribe.aol.com/free2paidweb?campaign=navbutnew00000049&regtype=new&promocode=876952');
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function () {
  // },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  beforeTest: function () {
    //
  },
  //
  // Runs before a WebdriverIO command gets executed.
  // beforeCommand: function (commandName, args) {
  // },
  //
  // Runs after a WebdriverIO command gets executed
  // afterCommand: function (commandName, args, result, error) {
  // },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // afterTest: function () {
  //     //test.done();
  // },
  //
  // Hook that gets executed after the suite has ended
  // afterSuite: function (suite) {
  // },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  // after: function (result, capabilities, specs) {
  // },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  // onComplete: function() {
  //   seleniumServer.kill();
  // }
}