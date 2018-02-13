
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleoptions =    {
    describe: 'Title of note',
    demand:true,
    alias: 't'
  };

const argv = yargs
.command('add', 'Add a new note', {
  titleoptions,
  body: {
    describe: 'Body of the note',
    demand:true,
    alias:'b'
  }
})
.command('list' ,'List all notes ')
.command('read','Read a note',{
 titleoptions
})
.command('remove','Remove a note',{
 titleoptions
})
.help()
.argv ;

var command = argv._[0];

if(command === 'add'){
  var note = notes.addNote(argv.title,argv.body);
    if(note){
      console.log("Note created");
    notes.logNote(note);
    }else{
      console.log("Note title taken");
    }

}else if(command === 'list'){
  var allnotes = notes.getAll();
  console.log(`Printing ${allnotes.length} note(s).`);
      allnotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if(note){
    console.log("Note found");
    notes.logNote(note);
  }else{
    console.log("Note not found");
  }

}else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note removed" : "Note not found" ;
    console.log(message);
}
else{
  console.log('command not recognized')
}
