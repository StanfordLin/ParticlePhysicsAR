/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');
const Patches = require('Patches');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');

var leanedLeftEvent;
var leanedLeft = false;

var leanedRightEvent;
var leanedRight = false;

var activeEvent = false;

Patches.outputs.getPulse('LeanedRight').then( event => {
    Diagnostics.log("Leaned Right")
})

Patches.outputs.getPulse('LeanedLeft').then(event => {
    Diagnostics.log("Leaned Leijft")
})


Diagnostics.log("Found")
// Patches.outputs.getPulse('LeanedLeft').then(event => {
//     Diagnostics.log("Leaned left");
//     console.log("Yeah?")
//     leanedLeftEvent = event.subscribe(function (pulseEvent) {
//         console.log("test")
//         if (activeEvent == false) {
//             activeEvent = true;
//             leanedLeft = true;
//             Diagnostics.log("Turning left...");
//             Patches.inputs.setBoolean('LeaningLeft', leanedLeft);
//             // timeOut('LeaningLeft', leanedLeft, 'left');
//             leanedLeft = false;
//         } else (Diagnostics.log("Active Event")
//         );
//     })
// })
