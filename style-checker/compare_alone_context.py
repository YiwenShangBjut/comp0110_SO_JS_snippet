import csv
import os
import time
import ast
import json

start_time=time.time()

num=500

csv_snippet_name='output-'+str(num)+'k-snippet-new.csv'
csv_file_name='output-'+str(num)+'k-fix-new.csv'

file_list=[]
snippet_list=[]

name_list=[]
diff_list=[]

snippet_num=0

with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        errors=json.loads(line[2].replace("\'","\""))
        file_list.append(errors)
        name_list.append(line[0])

with open(csv_snippet_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        errors=json.loads(line[2].replace("\'","\""))
        snippet_list.append(errors)

diff_num=0

for i in range(0,len(file_list)):
    if file_list[i] != snippet_list[i]:
        diff_list.append(name_list[i])

not_in_snippet={}
not_in_file={}

with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        if line[0] in diff_list:
            file_errors=json.loads(line[2].replace("\'","\""))
            snippet_errors=snippet_list[name_list.index(line[0])]
            for file_error in file_errors:
                if file_error not in snippet_errors:
                    if file_error not in not_in_snippet:
                        not_in_snippet[file_error]=0
                    not_in_snippet[file_error]+=1
            for snippet_error in snippet_errors:
                if snippet_error not in file_errors:
                    if snippet_error not in not_in_file:
                        not_in_file[snippet_error]=0
                    not_in_file[snippet_error]+=1

not_in_file=sorted(not_in_file.items(), key=lambda x: x[0], reverse=False)
not_in_snippet=sorted(not_in_snippet.items(), key=lambda x: x[0], reverse=False)
print(not_in_file)
print(not_in_snippet)






            



