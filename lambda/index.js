/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

var STREAMS = [
    {
        "metadata" : {
            "title": "Rádio Inconfidência",
            "subtitle": "Rádio Inconfidência",
            "art": {
                "sources": [
                    {
                        "contentDescription": "Rádio Inconfidência",
                        "url": "https://upload.wikimedia.org/wikipedia/commons/3/33/R%C3%A1dio_Inconfid%C3%AAncia_logo.png",
                        "widthPixels": 512,
                        "heightPixels": 512
                    }
                ]
            },
            "backgroundImage": {
                "sources": [
                    {
                        "contentDescription": "Rádio Inconfidência",
                        "url": "https://cdn.emcplay.com/assets/images/default-programacao/2.png",
                        "widthPixels": 1200,
                        "heightPixels": 800
                    }
                ]
            }
        }
    }
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bem Vindo a Rádio Inconfidência!  Escolha se quer ouvir a rádio A. M. ou F. M.! Caso tenha alguma dúvida, diga Ajuda.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PlayFMIntentHandler = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'PlayFMIntent';
    },
    handle(handlerInput) {
        const respostaUsuario = handlerInput.requestEnvelope.request.intent.slots.respostaUsuario.value;
        let stream = STREAMS[0];
        const playBehavior = 'REPLACE_ALL';
        
        //const radioInconfidenciaURL = 'https://audio1.maxi80.com';
        
        const playbackInfoToken = handlerInput.requestEnvelope.request.token;
        const playbackInfoMilliseconds = handlerInput.requestEnvelope.request.offsetInMilliseconds;
        
        if((respostaUsuario === 'FM') || (respostaUsuario === 'F M') || (respostaUsuario === 'F.M') || (respostaUsuario === 'F.M.') || (respostaUsuario === 'f. m.') || (respostaUsuario === 'F. M.')){
            var speakOutput = 'Tocando a rádio Inconfidência F.M.';
            var radioInconfidenciaURL = 'https://8101.zoeweb.net/stream';
            
        }else if((respostaUsuario === 'AM') || (respostaUsuario === 'A M') || (respostaUsuario === 'A.M') || (respostaUsuario === 'A.M.') || (respostaUsuario === 'a. m.') || (respostaUsuario === 'A. M.')){
            speakOutput = 'Tocando a rádio Inconfidência A.M.';
            radioInconfidenciaURL = 'https://8104.zoeweb.net/stream';
        
        }
        else if((respostaUsuario === 'Logo Cedo') || (respostaUsuario === 'Logo') || (respostaUsuario === 'Cedo') || (respostaUsuario === 'Logo.Cedo')){
            speakOutput = 'Bem vindo ao Podcast da Rádio Inconfidência Logo Cedo! Nele você irá escutar as noticias Logo Cedo!';
            radioInconfidenciaURL = 'https://8104.zoeweb.net/stream';
        
        }
        else if((respostaUsuario === 'continuar') || (respostaUsuario === 'resume')){
            speakOutput = 'continuando a tocar a rádio';
            
        }else if((respostaUsuario === 'ajuda')){
            speakOutput = 'Olá! Para utilizar nossa skill basta dizer, Alexa tocar rádio Inconfidência! e escolher entre a rádio A. M. ou F. M. . Para parar diga, Alexa parar. Ou para cancelar diga, Alexa cancelar. E caso deseje voltar a ouvir diga Alexa continuar! E escolher qual rádio deseja continuar, A. M. ou F. M. . Para ouvir novamente diga Alexa ajuda! Esse skill foi desenvolvido por Nilson Senna e Bruno Diniz da Assessoria de TI da EMC';

        }else if((respostaUsuario === 'emc') || (respostaUsuario === 'Rede Minas')){
            speakOutput = 'Olá! Para saber mais informações sobre a Rede Minas e a EMC, digite www.redeminas.tv ou www.emc.mg.gov.br . Para ouvir novamente diga Alexa ajuda! Esse skill foi desenvolvido por Nilson Senna e Bruno Diniz da Assessoria de TI da EMC';

        }
        else{
            speakOutput = 'Por favor, diga qual a rádio que deseja, A.M. ou F.M.?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(playBehavior, radioInconfidenciaURL, 1, 0, null, stream.metadata)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Olá! Para utilizar nossa skill basta dizer, Alexa tocar rádio Inconfidência! e escolher entre a rádio A. M. ou F. M. . Para parar diga, Alexa parar. Ou para cancelar diga, Alexa cancelar. E caso deseje voltar a ouvir diga Alexa continuar! E escolher qual rádio deseja continuar, A. M. ou F. M. . Para ouvir novamente diga Alexa ajuda! Esse skill foi desenvolvido por Nilson Senna e Bruno Diniz da Assessoria de TI da EMC';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && ((Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent') || (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'));
    },
    handle(handlerInput) {
        const speakOutput = 'Até a próxima!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent');
    },
    handle(handlerInput){
        const speakOutput = 'Bem Vindo de volta a Rádio Inconfidência! Escolha se quer ouvir a rádio A. M. ou F. M.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Desculpe, não entendi. Por favor tente novamente.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você tem certeza disso?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Desculpe, não entendi. Por favor tente novamente.';
        console.log(`~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//helper
async function getPlaybackInfo(handlerInput) {
  const attributes = await handlerInput.attributesManager.getPersistentAttributes();
  return attributes.playbackInfo;
}

async function setPlaybackInfo(handlerInput, playbackInfoObject) {
  await handlerInput.attributesManager.setPersistentAttributes({
      playbackInfo: playbackInfoObject
      });
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayFMIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        ResumeIntentHandler,
        FallbackIntentHandler,
        IntentReflectorHandler
        )
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();