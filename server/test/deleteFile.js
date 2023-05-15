
const fs = require('fs');



function deleteFile(path){
  
  fs.unlink(path, (err) => {
  if (err) throw err;
  
});
}

function deleteFolderContent(path){
  const folderPath = path;

  const fileNames = fs.readdirSync(folderPath);

  fileNames.forEach(fileName => {
    if (fileName.endsWith('.png')) {
      fs.unlinkSync(`${folderPath}/${fileName}`);
    }
  });

}


module.exports = { deleteFile,deleteFolderContent };
