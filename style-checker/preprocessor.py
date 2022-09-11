import csv
from math import isqrt
import os
import time
import re

start_time=time.time()

num=500

exact_match_path=os.getcwd()+'\\project-file-'+str(num)+'k\\exact_match_file_'+str(num)+'k'

# Jquery_files_path=os.getcwd()+'\\Jquery-project-file-'+str(num)+'k\\Jquery_project_file_'+str(num)+'k'
# JS_files_path=os.getcwd()+'\\JS-project-file-'+str(num)+'k\\JS_project_file_'+str(num)+'k'
Jquery_files_path=os.getcwd()+'\\Jquery_project_file_'+str(num)+'k'
JS_files_path=os.getcwd()+'\\JS_project_file_'+str(num)+'k'


exact_match_files=os.listdir(exact_match_path)

def mkdir():
    folder = os.path.exists(Jquery_files_path)
    if not folder:
        os.makedirs(Jquery_files_path)
    folder = os.path.exists(JS_files_path)
    if not folder:
        os.makedirs(JS_files_path)

mkdir()



def remove_chinese(content):
  lines= content.split('\n')
  result=''
  keyword_list=['```js','```','---']
  for line in lines:
    has_chinese=False
    for ch in line:
      if u'\u4e00' <= ch <= u'\u9fff':
        has_chinese=True
    if line not in keyword_list and has_chinese==False and line.find('![]')==-1:
      result=result+line+'\n'

  return result


for file_name in exact_match_files:
    with open(exact_match_path+'\\'+file_name, 'r', encoding='utf-8') as exact_match_file:
        file=exact_match_file.read()
        lines=file.split('\n')
        isJQuery=False
        for line in lines:
          if line.find('$(') >-1 or line.find('$.') >-1:
            isJQuery=True
            break
        if isJQuery:
          with open(Jquery_files_path+'\\'+file_name,'w',encoding='utf-8',newline='') as Jquery_file:
                  Jquery_file.write(file)
        else:
          with open(JS_files_path+'\\'+file_name,'w',encoding='utf-8',newline='') as JS_file:
                  JS_file.write(file)

end_time=time.time()
