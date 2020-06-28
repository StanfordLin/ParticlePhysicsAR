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
        switch (currentQuestionNumber) {
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
        switch (currentQuestionNumber) {
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
        Patches.inputs.setString('personality', finalPersonality);
        Diagnostics.log("Current Personality: " + finalPersonality)

        switch (finalPersonality) {
            case 'ISTJ':
                Patches.inputs.setString('title', 'You are the ' + 'Proton');
                Patches.inputs.setString('description', 'Involved in nuclear reactions, they like strictness and order. They have a positive charge and make up the mass of the atom along with the neutrons. Doesn’t flow like an electron. Stable and accountable.');
                break;
            case 'INTP':
                Patches.inputs.setString('title', 'You are the ' + 'Gauge boson');
                Patches.inputs.setString('description', 'You seek harmony, calm emotions and comfort, and feel at peace in nature. Gauge bosons carry force, for example, a photon.');
                break;
            case 'ESFJ':
                Patches.inputs.setString('title', 'You are the ' + 'Electron');
                Patches.inputs.setString('description', 'You are easily transferable and freely flowing. Talking to people comes easy to you and you are always open to making a new friend.');
                break;
            case 'ESTJ':
                Patches.inputs.setString('title', 'You are the ' + 'Graviton');
                Patches.inputs.setString('description', 'You ignore haters, attracting people towards you and going towards people persistently.');
                break;
            case 'ENFP':
                Patches.inputs.setString('title', 'You are the ' + 'Charm quark');
                Patches.inputs.setString('description', 'The quark with the most experience with all 4 fundamental interactions. You are well-liked!');
                break;
            case 'INFP':
                Patches.inputs.setString('title', 'You are the ' + 'Photon');
                Patches.inputs.setString('description', 'Photons travel at the fastest speed possible. Despite their short rest lifespan, dilation makes them lose sense of time and reality. ');
                break;
            case 'ISTP':
                Patches.inputs.setString('title', 'You are the ' + 'Dark Matter');
                Patches.inputs.setString('description', 'Technical mindset, you always meet deadlines, you are very punctual by nature and you don’t need to get recognition for things that you do.');
                break;
            case 'ESTP':
                Patches.inputs.setString('title', 'You are the ' + 'Muon');
                Patches.inputs.setString('description', 'You are a born fighter. Your perseverance and hard work make no goal too far to reach. You are quick on your feet and ready for anything that comes your way.');
                break;
            case 'ISFP':
                Patches.inputs.setString('title', 'You are the ' + 'Neutrino');
                Patches.inputs.setString('description', 'You are really down to earth, but prefer not to do deal with conflict. You are caring and find joy in the simple things in life.');
                break;
            case 'ISFJ':
                Patches.inputs.setString('title', 'You are the ' + 'Neutron');
                Patches.inputs.setString('description', 'Neutrons have no charge, therefore they do not attract or repel electrons and protons. Nuclear forces keep neutrons and protons close. You are loyal to your close friends, and wary and shy of new relationships,. Easygoing and gets along well with everyone.');
                break;
            case 'ESFP':
                Patches.inputs.setString('title', 'You are the ' + 'Higg’s boson');
                Patches.inputs.setString('description', 'Colloquially known as the God particle, you often meditate on the many reactions and interactions you have witnessed.');
                break;
            case 'INFJ':
                Patches.inputs.setString('title', 'You are the ' + 'Strange quark');
                Patches.inputs.setString('description', 'The strange quark is the third lightest of all the quarks. You are flexible and can quickly transform mentality depending on the circumstance.');
                break;
            case 'INTJ':
                Patches.inputs.setString('title', 'You are the ' + 'General Antiparticle');
                Patches.inputs.setString('description', '');
                break;
            case 'ENTJ':
                Patches.inputs.setString('title', 'You are the ' + 'Z-boson');
                Patches.inputs.setString('description', '');
                break;
            case 'ENFJ':
                Patches.inputs.setString('title', 'You are the ' + 'Top quark');
                Patches.inputs.setString('description', '');
                break;
            case 'ENTP':
                Patches.inputs.setString('title', 'You are the ' + 'Gluon');
                Patches.inputs.setString('description', '');
                break;
        }
        Patches.inputs.setBoolean('quizOver', true)
        Patches.inputs.setVector
        Diagnostics.log("The personality is " + tempPersonality)
        currentQuestionNumber = 0;
        tempPersonality = ''



    }

    // const wow = Scene.root.findFirst('blah').then();
    // wow.visi
    Patches.inputs.setBoolean


}
Diagnostics.log("Found")
