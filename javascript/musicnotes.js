let jsonText = document.getElementById("jsontext");
var temp;

var addNoteStrings = ["CCCCC", "C#C#C#C#C#", "DDDDD", "D#D#D#D#D#", 
                        "EEEEE", "FFFFFF", "F#F#F#F#F#", "GGGGG", 
                        "G#G#G#G#G#", "AAAAA", "A#A#A#A#A#", "BBBBB"];

//jsonText.addEventListener(updatePitch, updateNote);
function updateNote(note, pitch) { //Update notes in a real-time based from the sound frequency from the microphone
  if(note != "-" && note != null) {
	  jsonText += note//JSON.stringify(note)
    pitchRecord(pitch);

    for(let i = 0; i < noteStrings.length; i++) 
      if(jsonText.includes(addNoteStrings[i]+addNoteStrings[i]+addNoteStrings[i]+
                           addNoteStrings[i]+addNoteStrings[i]+addNoteStrings[i]) == true) {
        temp = note;
        jsonText = "";

      for(let j = 0; j < noteSelectorArray.length; j++)//note beat loop
        if(noteSelectorArray[j] != null) {
          addNotesBar(note, pitchNum, noteSelectorArray[j]);
          pitchOne = 0;
          pitchTwo = 0;
          pitchThree = 0;
        }
      }
  }
  //if(note == "-" && temp != "")
   // jsonText.innerText = ""
}

var pitchNum = 0;
var pitchOne = 0;
var pitchTwo = 0;
var pitchThree = 0;
function pitchRecord(pitch) { //limits the pitch of the music notes to perform within acceptable means
  if(pitch > 218 && pitch < 425) //A4 to G#4
    pitchOne++;
  if(pitch > 440 && pitch < 842) //A5 to G#5
    pitchTwo++;
  if(pitch > 885) //A6 to C6
    pitchThree++;

  if(pitchOne > pitchTwo && pitchOne > pitchThree) {
    pitchNum = 4;
  }
  else if(pitchTwo > pitchOne && pitchTwo > pitchThree) {
    pitchNum = 5;
  }
  else if(pitchThree > pitchTwo && pitchThree > pitchOne) {
    pitchNum = 6;
  }
}


var noteSelectorArray = [null,null,null,null]; //Music note beat selector button function: Whole, Half, Quarter, Eighth
function chooseWholeNote() {
  noteSelectorArray[0] = "whole-note";
  noteSelectorArray[1] = null;
  noteSelectorArray[2] = null;
  noteSelectorArray[3] = null;
}

function chooseHalfNote() {
  noteSelectorArray[0] = null;
  noteSelectorArray[1] = "half-note";
  noteSelectorArray[2] = null;
  noteSelectorArray[3] = null;
}

function chooseQuarterNote() {
  noteSelectorArray[0] = null;
  noteSelectorArray[1] = null;
  noteSelectorArray[2] = "quarter-note";
  noteSelectorArray[3] = null;
}

function chooseEighthNote() {
  noteSelectorArray[0] = null;
  noteSelectorArray[1] = null;
  noteSelectorArray[2] = null;
  noteSelectorArray[3] = "eighth-note";
}

var insertNote;
var musicNote;
var wNote = 0;
var hNote = 0;
var qNote = 0;
var eNote = 0;
var barNum = 0;
function bar(insertNote) { //limits the amount of musical notes on a bar
  if(wNote == 1) {
    wNote = 0;
    barNum++;
  }
  else if(qNote == 4) {
    qNote = 0;
    barNum++;
  }
  else if(qNote == 3 && eNote == 2) {
    qNote = 0;
    eNote = 0;
    barNum++;
  }
  else if(qNote == 2 && eNote == 4) {
    qNote = 0;
    eNote = 0;
    barNum++;
  }
  else if(qNote == 2 && hNote == 1) {
    qNote = 0;
    hNote = 0;
    barNum++;
  }
  else if(eNote == 4 && hNote == 1) {
    eNote = 0;
    hNote = 0;
    barNum;
  }
  else if(hNote == 2) {
    qNote = 0;
    hNote = 0;
    barNum++;
  }
  else if(qNote == 1 && eNote == 6) {
    qNote = 0;
    eNote = 0;
    barNum++;
  }
  else if(eNote == 8) {
    eNote = 0;
    barNum++;
  }

  insertNote[barNum].appendChild(musicNote);
  //console.log(musicNote)
  

  /*            variables for the playOnClick function
  playArrayAdd++;   
  var button = document.createElement("BUTTON");
  button.setAttribute('id',""+playArrayAdd);
  button.setAttribute('onclick','playOnClick();'); 
  musicNote.appendChild(button);
  */ 
  
  playArray.push(musicNote);
  

}

function clearNotes() {
  window.location.reload();
}

var playArrayAdd = 0;
var playArray = [];
noteStringsLowerCase = ["c", "c", "d", "d", "e", "f", "f", "g", "g", "a", "a", "b"];
function addNotesBar(note, pitchNum, noteType) { //concantenate and adds the specific music notes to the music sheet
  for(let i = 0; i < noteStrings.length; i++)
    if(note == noteStrings[i]) {
      musicNote = document.createElement("div");
      if(note == noteStrings[1] || note == noteStrings[3] || note == noteStrings[6] || 
         note == noteStrings[8] || note == noteStrings[10])
         musicNote.className = noteStringsLowerCase[i] + "" + pitchNum + " " + noteType + "sharp";
      else
        musicNote.className = noteStringsLowerCase[i] + "" + pitchNum + " " + noteType;

      insertNote = document.getElementsByClassName("bar");
      bar(insertNote);

      if (noteType == "whole-note")
        wNote++;
      else if(noteType == "half-note")
        hNote++;
      else if(noteType == "quarter-note")
        qNote++;
      else if(noteType == "eighth-note")
        eNote++;
    }
}

/*
function playOnClick() { //Attempted to provide each musical note a button to play a musical note
  for(let i = 0; i <= playArray.length; i++) {
    if(playArray[i].className == musicNote.className && musicNote.className.includes("sharp")) {
      playNote = new Audio("sounds/" + playArray[i].className.substring(0,2) + "Sharp.mp3");
      playNote.play();
      break;
    }
    else if(playArray[i].className == musicNote.className) {
      playNote = new Audio("sounds/" + playArray[i].className.substring(0,2) + ".mp3");
      playNote.play();
      break;
    }
  }
}*/


/*
function playMusic() { // I attempted to create a function that will read and concantenate music notes 
                       // that can play sounds in an orderly fashion
  for(let i = 0; i <= playArray.length; i++) {
    var playNote = new Audio("sounds/" + playArray[i].className.substring(0,2) + ".mp3");
    var playNoteSharp = new Audio("sounds/" + playArray[i].className.substring(0,2) + "Sharp.mp3");
    console.log(playNote);

     
    if(i == 0) {
      if(playArray[i].className.includes("whole-notesharp"))
        playNoteSharp.play();
      else if(playArray[i].className.includes("whole-note"))
        playNote.play();

    //if(playArray[i].className.includes("half"))
      if(playArray[i].className.includes("quarter-notesharp"))
        playNoteSharp.play();
      else if(playArray[i].className.includes("quarter"))
        playNote.play();
      if(playArray[i].className.includes("eighth"))
      console.log(i + " " + playArray[i].className);
    }

    else {
      if(playArray[i].className.includes("whole-notesharp"))
        setTimeout(playNoteSharp.play(),2000);
      else if(playArray[i].className.includes("whole-note"))
        setTimeout(playNote.play(),2000);

      //if(playArray[i].className.includes("half"))
      if(playArray[i].className.includes("quarter-notesharp"))
        setTimeout(function() {
          playNoteSharp.play();
        }, 1000);
      else if(playArray[i].className.includes("quarter-note"))
        setTimeout(function() {
          playNote.play();
        }, 2000);
      if(playArray[i].className.includes("eighth"))
      console.log(i + " " + playArray[i].className);
    }
  }
}*/