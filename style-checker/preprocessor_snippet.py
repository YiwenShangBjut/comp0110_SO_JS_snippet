import csv
from math import isqrt
import os
import time
import re

start_time=time.time()

num=500

exact_match_file_path=os.getcwd()+'\\project-file-'+str(num)+'k\\exact_match_file_'+str(num)+'k'

exact_match_path=os.getcwd()+'\\snippet-'+str(num)+'k\\exact_match_snippet_'+str(num)+'k'

Jquery_files_path=os.getcwd()+'\\Jquery_snippet_'+str(num)+'k'
JS_files_path=os.getcwd()+'\\JS_snippet_'+str(num)+'k'

Jquery_files_file_path=os.getcwd()+'\\Jquery_project_file_'+str(num)+'k'
JS_files_file_path=os.getcwd()+'\\JS_project_file_'+str(num)+'k'


def mkdir():
    folder = os.path.exists(Jquery_files_path)
    if not folder:
        os.makedirs(Jquery_files_path)
    folder = os.path.exists(JS_files_path)
    if not folder:
        os.makedirs(JS_files_path)

mkdir()

Jquery_exact_match_files=os.listdir(Jquery_files_file_path)
JS_exact_match_files=os.listdir(JS_files_file_path)

for file_name in Jquery_exact_match_files:
  with open(exact_match_path+'\\'+file_name, 'r', encoding='utf-8') as exact_match_file:
    file=exact_match_file.read()
    with open(Jquery_files_path+'\\'+file_name,'w',encoding='utf-8',newline='') as Jquery_file:
                  Jquery_file.write(file)

for file_name in JS_exact_match_files:
  with open(exact_match_path+'\\'+file_name, 'r', encoding='utf-8') as exact_match_file:
    file=exact_match_file.read()
    with open(JS_files_path+'\\'+file_name,'w',encoding='utf-8',newline='') as JS_file:
                  JS_file.write(file)



end_time=time.time()
