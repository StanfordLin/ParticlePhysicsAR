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

var tempPersonality;

var currentQuestionNumber = 0;


// Patches.outputs.getScalar('questionNumber').then(event => {
//     event.monitor({ fireOnInitialValue: true }).take(1).subscribe(function (getQuestionNumber) {
//         currentQuestionNumber = getQuestionNumber.newValue
//         Diagnostics.log("Question:  " + getQuestionNumber.newValue)
//     })
//     Diagnostics.log('lastValue ' + event.pinLastValue.length.valueOf)

// })

Patches.outputs.getPulse('LeanedLeft').then(event => {
    event.subscribe(function () {
        // No
        Diagnostics.log("Current Personality: " + currentQuestionNumber)
        // Diagnostics.log("Leaned Left New Version")
        switch(currentQuestionNumber) {
            case 0:
                // Do you read for leisure? No
                tempPersonality = 'I'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
            case 1:
                // Do you like thinking about hypotheticals?
                tempPersonality += 'N'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
            case 2:
                // Do you prefer to think with your heart?
                tempPersonality += 'T'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
            case 3:
                // Do you leave things to the last second?
                tempPersonality += 'P'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
        }

        currentQuestionNumber++;
        Diagnostics.log("Current Question: " + currentQuestionNumber)
        resetWeights()

    });
});


Patches.outputs.getPulse('LeanedRight').then(event => {
    event.subscribe(function () {
        // Yes
        // Diagnostics.log("Leaned Right New Version")
        Diagnostics.log("Current Personality: " + currentQuestionNumber)
        switch(currentQuestionNumber) {
            case 0:
                // Do you read for leisure? Yes
                tempPersonality = 'E'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
            case 1:
                // Do you like thinking about hypotheticals?
                tempPersonality += 'S'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
            case 2:
                // Do you prefer to think with your heart?
                tempPersonality += 'F'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;
            case 3:
                // Do you leave things to the last second?
                tempPersonality += 'J'
                Diagnostics.log("Current Personality: " + tempPersonality)
                break;

        }
        currentQuestionNumber++;
        Diagnostics.log("Current Question: " + currentQuestionNumber)
        resetWeights()
    });
});

function resetWeights() {
    if (currentQuestionNumber == 0) {
        Diagnostics.log("New Game")
    }
    if (tempPersonality.length == 4) {
        Diagnostics.log("End reached :")
        var finalPersonality = tempPersonality
        Patches.inputs.setString('finalPersonality', finalPersonality);
        
        Patches.inputs.setBoolean('quizOver', true)
        
        Diagnostics.log("The personality is " + tempPersonality)
        currentQuestionNumber = 0;
        tempPersonality = ''

    }


}
Diagnostics.log("Found")
