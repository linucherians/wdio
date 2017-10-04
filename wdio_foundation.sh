#!/bin/sh

# Author: Linu Cherian
# This shell script setups foundation, folder structure and dependencies needed to start automation with webdriveIO

chmod -R 777 .babelrc
mkdir my_wdio_test_suites
mv package.json my_wdio_test_suites
cd my_wdio_test_suites
npm install
mkdir test
mv ../.babelrc test
cd test
mkdir config
mkdir lib
mkdir page-objects
mkdir specs
mv ../../wdio.conf.js config
mv ../../common.js lib
mv ../../logger.js lib
mv ../../Resembler.js lib
chmod -R 777 ../../my_wdio_test_suites
