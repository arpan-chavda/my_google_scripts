//Copyright (C) 2015  Arpan D. Chavda(arpanchavdaeng@gmail.com)

//This software is free and open source.

//-   **I** am the software author. **I** might be a **we**, but that's OK.
//-   **You** are the user of this software. **You** might also be a **we**, and that's also OK!

//\> This is free software. I will never charge you to use, license, or obtain this software. Doing so would make me a jerk.

//\> I will never take down or start charging for what is available today. Doing so would make me a jerk.

//\> You may use this code (and by code I mean **anything** contained within in this project) for whatever you want. Personal use, Educational use, Corporate use, Military use, and all other uses are OK! Limiting how you can use something free would make me a jerk.

//\> I offer no warranty on anything, ever. I've tried to ensure that there are no gaping security holes where using this software might automatically send your credit card information to aliens or erase your entire hard drive, but it might happen. I'm sorry. However, I warned you, so you can't sue me. Suing people over free software would make you a jerk.

//\> If you find bugs, it would be nice if you let me know so I can fix them. You don't have to, but not doing so would make you a jerk.

//\> Speaking of bugs, I am not obligated to fix anything nor am I obligated to add a feature for you. Feeling entitled about free software would make you a jerk.

//\> If you add a new feature or fix a bug, it would be nice if you contributed it back to the project. You don't have to, but not doing so would make you a jerk. The repository/site you obtained this software from should contain a way for you to contact me. Contributing to open source makes you awesome!

//\> If you use this software, you don't have to give me any credit, but it would be nice.

//Don't be a jerk. Enjoy your free software!


function sendEmails2() {
//shitty work started
  var sheet = SpreadsheetApp.getActiveSheet(); //Activate sheet
  var startRow = 2;  // First row of data to process
  var numRows = 44 ;   // Number of rows to process
  var tno = sheet.getRange('C1').getValues(); 
  var message = sheet.getRange('B2').getValues(); //Getting message body from cell B2
  var dataRange = sheet.getRange(startRow, 1, numRows, 2); // Fetch the range of cells A2:B3
  var data = dataRange.getValues(); // Fetch values for each row in the Range.
//shitty work ended

  
//Zipping code started
var folder = DriveApp.getFolderById('0B5Sb6IOPwl52flVvMXg4dGJuVVdCYl9fNk1MNlBzazBMdk1IZ3BiWkJRR05TNXFZWUtYV3M');
var zipped = Utilities.zip(getBlobs(folder, ''), folder.getName()+'-'+tno+'.zip');
 
folder.getParents().next().createFile(zipped);

function getBlobs(rootFolder, path) {
  var blobs = [];
  var names = {};
  var files = rootFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next().getBlob();
    var n = file.getName();
    while(names[n]) { n = '_' + n }
    names[n] = true;
    blobs.push(file.setName(path+n));
  }
  names = {};
  var folders = rootFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var n = folder.getName();
    while(names[n]) { n = '_' + n }
    names[n] = true;
    var fPath = path+n+'/';
    blobs.push(Utilities.newBlob([]).setName(fPath)); //comment/uncomment this line to skip/include empty folders
    blobs = blobs.concat(getBlobs(folder, fPath));
  }
  return blobs;
}
  //Zipping code ended
  
  var file_name = 'Current Test Buffer-'+tno+'.zip';
  var file1 = DriveApp.getFilesByName(file_name).next();
  var subject = "Test-" +  tno + " including Answerkeys"; // setting subject from test serires variable   
  
  //Mailer code started
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0];  // First column
     MailApp.sendEmail(emailAddress, subject, message, {
     attachments: [file1],
        name: 'Arpan D. Chavda', 
 });
  // Sending Mail
       //Clean ad-hoc memory
  }
  SpreadsheetApp.flush();
  DriveApp.removeFile(file1);

  
  //Mailer code ended
  

 
}
