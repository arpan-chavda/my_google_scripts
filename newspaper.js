


function myFunction() {
  //The Hindu(2015-03-31).epub 
  //Indian Express(2015-03-31).epub
  //Current Affairs(2015-03-28).epub
  
  
  var sheet = SpreadsheetApp.getActiveSheet(); //Activate sheet

  var d = new Date();
  var year = d.getFullYear();
  var date = d.getDate();
  var day = d.getDay();
  var month = d.getMonth()+1;
  if(month<10)
  {
    month = "0"+month;
  }
  if(date<10)
  {
    date = "0"+date;
  }
  var final_date = year + "-" +month+ "-" +date;
  var thehindu = "The Hindu(" + final_date + ").epub";
  var ie = "Indian Express(" + final_date + ").epub";
  

  var startRow = 2;  // First row of data to process
  var numRows = 9;   // Number of rows to process
  var message = sheet.getRange('B2').getValues(); //Getting message body from cell B2
  var dataRange = sheet.getRange(startRow, 1, numRows, 2); // Fetch the range of cells A2:B3
  var data = dataRange.getValues(); // Fetch values for each row in the Range.
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0];  // First column
    var emailSent = row[2];     // Third column
    var subject = "Today's Daily Newspaper"; // setting subject from test serires variable
      
  
 //Logger.log("Todays ebook : " + thehindu);
  
 //Logger.log("Todays ebook : " + ie);
  
 //Logger.log("Todays ebook : " + ca);
    
    
    var file1 = DriveApp.getFilesByName(thehindu).next(); //Getting files from Google drive using file name
    var file2 = DriveApp.getFilesByName(ie).next();
    if(day==6)
    {
       var ca = "Current Affairs(" + final_date + ").epub";
      var file3 = DriveApp.getFilesByName(ca).next();
      MailApp.sendEmail(emailAddress, subject, message, {
     attachments: [file1,file2,file3],
        name: 'Arpan D. Chavda', 
 });// Sending Mail
    
    }
    else
    {
      
      MailApp.sendEmail(emailAddress, subject, message, {
        attachments: [file1,file2],
        name: 'Arpan D. Chavda', 
 });// Sending Mail
    
    }
    
 SpreadsheetApp.flush(); //Clean ad-hoc memory
  }
  
  
  
  
  
  
  
  
  
 //Logger.log("Todays ebook : " + thehindu);
  
 //Logger.log("Todays ebook : " + ie);
  
 //Logger.log("Todays ebook : " + ca);
  

}
