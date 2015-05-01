function removeFile() {
   var sheet = SpreadsheetApp.getActiveSheet(); //Activate sheet
   var tno = sheet.getRange('C1').getValues(); 
  var file_name = 'Current Test Buffer-'+tno+'.zip';
  var folder = DriveApp.getFolderById('0B5Sb6IOPwl52flVvMXg4dGJuVVdCYl9fNk1MNlBzazBMdk1IZ3BiWkJRR05TNXFZWUtYV3M');
  var file1 = DriveApp.getFilesByName(file_name).next(); 
  //File removal code start
var files = folder.getFiles();
  var name = folder.getName();
 while ( files.hasNext() ) {
   var file = files.next();
   folder.removeFile(file);
    }
//File removal code ended
  
    var tlatest = Number(tno)+1;//Counter++ for test series number //Logger.log(tlatest);  
  SpreadsheetApp.getActiveSheet().getRange('C1').setValue(tlatest);

}
