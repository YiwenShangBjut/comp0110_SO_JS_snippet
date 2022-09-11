import os

num=600

snippet_folder_path=os.getcwd()+'\\snippets_'+str(num)+'k'

project_folder_path=os.getcwd()+'\\project_file_'+str(num)+'k'

def read_snippets():
    snippets=os.listdir(snippet_folder_path)
    print('We have '+ str(len(snippets))+ ' qualified snippets')

def read_project_file():
    files=os.listdir(project_folder_path)
    print('and found '+ str(len(files))+ ' project file')

print('For the '+str(num*1000)+' scale of snippet')
read_snippets()
# read_project_file()