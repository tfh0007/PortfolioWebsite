using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace BuildIconFileList
{
    class Program
    {
        
        static void Main(string[] args)
        {
            if (Directory.Exists(args[0]))
            {
                // This path is a directory
                StringBuilder fileContent = new StringBuilder();
                fileContent.Append("<!DOCTYPE html>\r\n" +
                    "<html>\r\n" +
                    "   <head>\r\n" +
                    "   </head>\r\n" +
                    "   <body style = \"background-color: white;\" >\r\n" +
                    "       <div id=\"iconFiles\">\r\n");


                (fileContent,_) = ProcessDirectory($"C:\\Users\\Thomas\\Documents\\Basic Website\\public\\ProfileIcons", fileContent,1);

                fileContent.Append("        </div>\r\n" +
                "    </body>\r\n" +
                "</html>\r\n");


                string newFileLocation = $"C:\\Users\\Thomas\\Documents\\Basic Website\\public\\ProfileIcons\\allIcons.html";
                File.WriteAllText(newFileLocation, fileContent.ToString());
                Console.WriteLine("File has been created => " + newFileLocation);
            }
            else
            {
                Console.WriteLine("{0} is not a valid file or directory.", args[0]);
            }
            
        }

        // Process all files in the directory passed in, recurse on any directories
        // that are found, and process the files they contain.
        public static (StringBuilder,int) ProcessDirectory(string targetDirectory, StringBuilder fileContent, int globalImageCount)
        {
            // Process the list of files found in the directory.
            

            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries) {
                (string str, globalImageCount) = ProcessFile(fileName,globalImageCount);
                fileContent.Append(str);
                }

            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
            {
                StringBuilder stringBuilder= new StringBuilder();
                (stringBuilder, globalImageCount) = ProcessDirectory(subdirectory,stringBuilder,globalImageCount);
                fileContent.Append(stringBuilder.ToString());
                
            }

            

            return (fileContent,globalImageCount);
        }

        

        // Insert logic for processing found files here.
        public static (string,int) ProcessFile(string path, int globalImageCount)
        {
            FileInfo fileInfo = new FileInfo(path);
            string imgTag = "";
            Regex fileRegex = new(".svg$|.png$|.jpg$");
            string startOfPath = path.Substring(path.IndexOf("ProfileIcons\\"));
            startOfPath = startOfPath.Replace("\\", "/");
            if (fileRegex.IsMatch(path) && !path.Contains("__MACOSX")) {
                Console.WriteLine(startOfPath + fileInfo.Name);
                imgTag = ("            <img class=\"iconSelectionImage\" id=\"iconSelectionImage__" + globalImageCount + "\" src=\"" + startOfPath + "\" height=\"140\">\r\n");
                globalImageCount++;
            }
            
            return (imgTag, globalImageCount);

        }

    }
}
